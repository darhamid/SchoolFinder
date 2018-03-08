import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

import { UserChartsService } from '../../../core/services/user-charts.service';
import * as D3 from 'd3';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})

export class BarchartComponent implements AfterViewInit {
  @ViewChild('containerBarChart') element: ElementRef;

  private host: D3.Selection<any>;
  private svg: D3.Selection<any>;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private barData;
  private x;
  private y;
  private xAxis;
  private yAxis;
  private margin;
  @Input() urn: number;

  constructor(private userChartsService: UserChartsService) { }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit - element is ${this.element}`);
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.userChartsService.getStatisticsForSchool(this.urn).subscribe((response) => {
      if(response.success == true)  {
        let resData = response.data;
        const data = [{ prop: "READ", value: parseFloat(resData['READPROG'])},{ prop: "WRITE", value: parseFloat(resData['WRITPROG'])}, {prop: "MATH",value: parseFloat(resData['MATPROG'])}];

        this.buildBar(data);
      }
    }
      , (error) => { console.log(error); }
    );
  }

//--------------------------------------------------------------------------------------------------------------------------------
  private buildBar(data: any): void {
    
    const margin = 60;
    const width = 300 - margin;
    const height = 300 - margin;
    const tooltip = D3.select("body").append("div").attr("class", "toolTip");
    const allPos = data.every(function(val) {
      return val.value >= 0;
    })
    const allNeg = data.every(function(val) {
      return val.value < 0;
    })


    let svg = D3.select(".containerBarChart").append("svg").attr('viewBox', `0 0 300 300`);

    // Define xScale and yScale doman & range --------------------------------------------------------------------------------------

    let xScale = D3.scaleLinear().range([0, width]);
    let yScale = D3.scaleBand().range([0, height - 35]).padding(0.3);

    let leftMargin = 0;

    yScale.domain(data.map(function(d) { return d.prop; }));

    // Adjust xScale domain depending on values ------------------------------------------------------------------------------------
    if (allPos) {
      leftMargin = 65;
      xScale.domain([0, (D3.max(data, function(d) { 
        return d.value
        }) + 0.5)]).nice();
    }
    else if (allNeg) {
      leftMargin = 20
      xScale.domain([D3.min(data, function(d) { 
        return d.value
        }), 0]).nice();
    }
    else {
      leftMargin = 20
      xScale.domain(D3.extent(data, function(d) { 
        return d.value
        })).nice();
    }

    var g = svg.append("g").attr("transform", "translate(" + leftMargin + "," + 30 + ")");

    //Define colors for bars -------------------------------------------------------------------------------------

    var color = D3.scaleOrdinal().range(["#F9C977", "#92BED9", "#909b96"]);

    // Append svg rectangles depending on data -------------------------------------------------------------------
    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(Math.min(0, d.value)); })
    .attr("y", function(d) { return yScale(d.prop); })
    .attr("width", function(d) { return Math.abs(xScale(d.value) - xScale(0)); })
    .attr("height", yScale.bandwidth())
    .style("fill", function(d, i) {
      return color(i);
    })
    // higlight bars on mouse hover --------------------------------------------------------------------------
    .on('mouseover', function(d){
      D3.select(this)
          .style("opacity", 0.5)
          .style("stroke", "black")
    })
    .on('mouseout', function(d){
      D3.select(this)
      .style("stroke-opacity",0.5)
      .style("stroke","#a8a8a8")
      .style("opacity",1);
      tooltip.style("display", "none")
  })
  //display totltip on mouse hover  ------------------------------------------------------------------------------
  .on("mousemove", function(d){
          tooltip
            .style("position", "absolute")
            .style("left", D3.event.pageX - 50 + "px")
            .style("top", D3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .style("min-width", 80 + "px")
            .style("height", "auto")
            .style("border", "1px solid #6F257F")
            .style("border-radius", "10px")
            .style("color", "white")
            .style("padding", 14 + "px")
            .style("background","none repeat scroll 0 0 rgba(0, 0, 0, 0.9)")
            .style("text-align", "center")
            .html((d.prop) + " : " + (d.value));
    })

    // Create svg axes ------------------------------------------------------------------------------------------
    g.append("g")
    .attr("transform", "translate(0," + (height - 35) + ")")
    .call(D3.axisBottom(xScale).ticks(5))

    g.append("g")
    .attr("transform", "translate(" + xScale(0) + "," + 0 + ")")
    .call(D3.axisLeft(yScale).tickSize(0))
    .selectAll(".tick text")
    .style("display", "none");
    
    //Create svg Legends ------------------------------------------------------------------------------------------

    var legend = svg.selectAll(".legend")
    .data([data[0].prop, data[1].prop, data[2].prop])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + (-180 + i * 80) + ","+ (5) + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i) {
          return color(i);
        })
        .style("display", "inline-block");
  
  //Format legend text -------------------------------------------------------------------------------------------
    legend.append("text")
    .attr("id", "barLegText")
        .attr("x", width)
        .attr("y", 9)
        .attr("dy", ".01em")
        .style("text-anchor", "start")
        .text(function(d) { return d; });

  }

}