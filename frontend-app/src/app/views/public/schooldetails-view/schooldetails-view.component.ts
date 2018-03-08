import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SchoolService } from "../../../core/services/school.service";
import { SearchService } from "../../../core/services/search.service";

@Component({
  selector: 'app-schooldetails-view',
  templateUrl: './schooldetails-view.component.html',
  styleUrls: ['./schooldetails-view.component.css']
})
export class SchooldetailsViewComponent implements OnInit {

  private donutDesc: string;
  private pieDesc: string;
  private barDesc: string;
  private showDonutToolTip = false;
  private showBarToolTip = false;
  private showPieToolTip = false;

  schoolDetails: any = {};
  urn: number;
  catchmentArea: boolean = false;



  constructor(
    private schoolService: SchoolService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      if (params['urn']) {
        this.urn = params['urn'];
        this.getSchoolDetails(params['urn']);
      }
    });
  }

  ngOnInit() {
    this.donutDesc = "This graph depicts how much progress pupils at this school made in reading, writing and maths between the end of KS1 and the end of KS 2, compared to pupils across England who got similar results at the end of KS 1.A score above zero means pupils made more progress, than similar pupils across England.A negative progress score does not mean pupils have made no progress, rather it means pupils in the school made less progress compared to other similar pupils across England.";
    this.pieDesc = "";
    this.barDesc = "";

  }

  goBack() {
    this.router.navigate(['findschools', this.urn]);
  }


  getSchoolDetails(urn: string) {
    this.schoolService.getSchoolDetails(urn)
      .subscribe((response: any) => {
        this.schoolDetails = response;
      })
  }

  setClasses(rating: string) {
    if (rating)
      return "rating-" + rating.toLocaleLowerCase().split(" ").join("-");
  }

  catchment(catchmentState: boolean) {
    this.catchmentArea = catchmentState;
    this.searchService.changeCatchmentState({ state: catchmentState, lat: this.schoolDetails.location[1], lng: this.schoolDetails.location[0] });
  }

  mouseOver(chartType: string) {

    switch (chartType) {
      case "donut":
        this.showDonutToolTip = true;
        break;
      case "bar":
        this.showBarToolTip = true;
        break;
      case "pie":
        this.showPieToolTip = true;
    }
  }
  mouseLeave(chartType: string) {
    switch (chartType) {
      case "donut":
        this.showDonutToolTip = false;
        break;
      case "bar":
        this.showBarToolTip = false;
        break;
      case "pie":
        this.showPieToolTip = false;
    }

  }

  goToMap() {
    let x = document.querySelector("#mapSection");
    if (x) {
      x.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

}
