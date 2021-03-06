import { UserChartsService } from './../../../core/services/user-charts.service';

import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

import * as D3 from 'd3';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class PiechartComponent implements AfterViewInit {
  @ViewChild('containerPieChart') element: ElementRef;

  private host: D3.Selection<any>;
  private svg: D3.Selection<any>;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private pieData;
  @Input() urn: number;

  constructor(private userChartsService: UserChartsService) { 
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.userChartsService.getStatisticsForSchool(this.urn).subscribe((response) => {
    
      if(response.success == true)  {
        this.pieData = response.data;
        const values = [this.pieData['BELIG'], this.pieData['GELIG']];
        this.setup();
        this.buildSVG();
        this.buildPie(values);
        this.buildLegend();
      }
    }
      , (error) => { console.log(error); }
    );
  }

  private setup(): void {
    this.width = 300;
    this.height = 300;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
  }

  private buildPie(values): void {
    const pie = D3.pie().value(function (d) { return d; });

    const arcSelection = this.svg.selectAll('.arc')
      .data(pie(values))
      .enter()
      .append('g')
      .attr('class', 'arc');

    this.populatePie(arcSelection, values);
  }

  private populatePie(arcSelection, values): void {

    const tooltip = D3.select("body").append("div");
    let total = parseInt(values[0]) + parseInt(values[1]);

    // Calcuklate percentage for data -------------------------------------------------------------------------
    let percGirls = parseInt(values[1])/total * 100;
    let percBoys = parseInt(values[0])/total * 100;
    const percentage = [Math.round(percBoys), Math.round(percGirls)];

    // Define inner and outer arc radii -------------------------------------------------------------------------
    const innerRadius = 0;
    const outerRadius = this.radius - 35;

    //Define colors for arcs -------------------------------------------------------------------------------------
    const pieColor = D3.scaleOrdinal(["#828D93", "#68C1A3"]);

    //Append svg arcs depending on values ------------------------------------------------------------------------
    const arc = D3.arc<D3.pie.Arc<number>>()
      .outerRadius(outerRadius).innerRadius(innerRadius);
    arcSelection.append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return pieColor(i);
      })

    // higlight bars on mouse hover ------------------------------------------------------------------------------
      .on('mouseover', function(d){
        D3.select(this)
            .style("opacity", 0.5)
            .style("stroke", "black")
      })

    //remove highlight and tooltip on mouseout---------------------------------------------------------------------
      .on('mouseout', function(d){
        D3.select(this)
        .style("stroke-opacity",0.5)
        .style("stroke","#a8a8a8")
        .style("opacity",1);
        tooltip.style("display", "none")
    })

    //display totltip on mouse hover  ------------------------------------------------------------------------------
    .on("mousemove", function(d, i){
            tooltip
              .style("position", "absolute")
              .style("left", D3.event.pageX - 50 + "px")
              .style("top", D3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .style("min-width", 80 + "px")
              .style("height", "auto")
              .style("border", "1px solid #6F257F")
              .style("border-radius", "10px")
              .style("padding", 14 + "px")
              .style("color", "white")
              .style("background","none repeat scroll 0 0 rgba(0, 0, 0, 0.9)")
              .style("text-align", "center")
              .html("Percentage : " + percentage[i]);
      });
;



    arcSelection.append('text')
      .attr('transform', (datum: any) => {
        datum.innerRadius = 0;
        datum.outerRadius = outerRadius;
        return 'translate(' + arc.centroid(datum) + ')';
      })
       .text((datum, index) => percentage[index])
      .style('text-anchor', 'middle');
  }

  private buildLegend(): void {
    //Define color for legend rectangles ---------------------------------------------------------------------------
        const pieColor = D3.scaleOrdinal(["#828D93", "#68C1A3"]);
        let legend = this.svg.selectAll(".legend")
        .data([" % BOYS"," % GIRLS"])
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + (-70 +  i * 80) + "," + (-145) + ")"; });
    
        legend.append("rect")
            .attr("x", this.width - 300)
            .attr("width", 13)
            .attr("height", 13)
            .style("fill", function(d, i) {
              return pieColor(i);
            })
            .style("display", "inline");

    //Format legend text -------------------------------------------------------------------------------------------
        legend.append("text")
        .attr("id", "pieLegText")
            .attr("x", this.width - 285)
            .attr("y", 9)
            .attr("dy", ".01em")
            .style("text-anchor", "start")
            .text(function(d) { return d; });
      }

}

