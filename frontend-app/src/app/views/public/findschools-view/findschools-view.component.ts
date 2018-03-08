import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FilterschoolComponent } from '../../../features/filterschool/filterschool.component';
import { CardService } from '../../../core/services/cardView.service';
@Component({
  selector: 'app-findschools-view',
  templateUrl: './findschools-view.component.html',
  styleUrls: ['./findschools-view.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        marginLeft: '0'
        //transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        marginLeft: '-330px'
        //transform: 'translate3d(-300px, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class FindschoolsViewComponent implements OnInit {

  @ViewChild(FilterschoolComponent)
  private viewComponent: FilterschoolComponent;

  menuState:string = 'in';
  slideVisible = false;

  urn: any;
  constructor(private route: ActivatedRoute, private dataService: CardService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['urn']) {
        this.urn = params['urn'];
      }
    })
  }

  onMarkerClicked(markerData: any) {
    this.updateCardView(markerData);
  }

  updateCardView(markerData: any) {
    this.dataService.setCardData(markerData)
  }

  sideNavToggle(){
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';  
    this.slideVisible = !this.slideVisible;
  }  
}
