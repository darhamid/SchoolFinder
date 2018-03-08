import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';

import { UserChartsService } from '../../../core/services/user-charts.service';
import * as D3 from 'd3';

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})

export class DonutchartComponent implements AfterViewInit {
  @ViewChild('containerDonutChart') element: ElementRef;

  private host: D3.Selection<any>;
  private svg: D3.Selection<any>;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private donutData;
  private tooltip;
  @Input() urn: number;
  

  constructor(private userChartsService: UserChartsService) { }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit - element is ${this.element}`);
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.userChartsService.getStatisticsForSchool(this.urn).subscribe((response) => {

      if(response.success == true)  {
        this.donutData = response.data;
        const values = [parseFloat(this.donutData['PTRWM_EXP']), parseFloat(this.donutData['PTRWM_HIGH']), (100 - parseFloat(this.donutData['PTRWM_EXP']) - parseFloat(this.donutData['PTRWM_HIGH']))];
        this.setup();
        this.buildSVG();
        this.buildDonut(values);
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

  private buildDonut(values): void {
    const pie = D3.pie().value(function (d) { return d; });
    const arcSelection = this.svg.selectAll('.arc')
      .data(pie(values))
      .enter()
      .append('g')
      .attr('class', 'arc');

    this.populateDonut(arcSelection, values);
  }

  private populateDonut(arcSelection, values): void {
    const tooltip = D3.select("body").append("div");
    const blank_space = " ";

    // Define inner and outer arc radii -------------------------------------------------------------------------

    const innerRadius = this.radius  - 87;
    const outerRadius = this.radius - 68;

    //Define colors for arcs -------------------------------------------------------------------------------------
    const donutColor = D3.scaleOrdinal(["#F9C977", "#92BED9", "#909b96"]);

    //Append arcs to svg depending on values ---------------------------------------------------------------------
  
    const arc = D3.arc<D3.pie.Arc<number>>()
      .outerRadius(outerRadius).innerRadius(innerRadius);
    arcSelection.append('path')
      .attr('d', arc)
      .attr('fill', (datum, index) => {
        return donutColor(index);
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
              .style("padding", 14 + "px")
              .style("color", "white")
              .style("background","none repeat scroll 0 0 rgba(0, 0, 0, 0.9)")
              .style("text-align", "center")
              .html("Percentage : " + (d.value));
      });

    arcSelection.append('text')
      .attr('transform', (datum: any) => {
        datum.innerRadius = 0;
        datum.outerRadius = outerRadius;
        return 'translate(' + arc.centroid(datum) + ')';
      })
      .text((datum, index) => {
       if (values[index] == 0) {
          return blank_space
       }
       else {
          return values[index]
       }
      })
      .style('text-anchor', 'middle')
      .style('font-size',"10px");
  }

  private buildLegend(): void {

    const donutColor = D3.scaleOrdinal(["#F9C977", "#92BED9","#909b96"]);
    let legend = this.svg.selectAll(".legend")
    .data(["% pupils meeting expected standards","% pupils higher than expected standards","% pupils not meeting expected standards"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(-125," + ((i * 20) - 145) + ")"; });

    legend.append("rect")
        .attr("x", this.width - 300)
        .attr("width", 9)
        .attr("height", 9)
        .style("fill", function(d, i) {
          return donutColor(i);
        })
    
  //Format legend text --------------------------------------------------------------------------------------------------
    legend.append("text")
        .attr("id", "donutLegText")
        .attr("x", this.width - 285)
        .attr("y", 9)
        .attr("dy", ".01em")
        .style("text-anchor", "start")
        .text(function(d) { return d; });
  }

}

