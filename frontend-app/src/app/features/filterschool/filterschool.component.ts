import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as $ from 'jquery';

import { SearchService } from '../../core/services/search.service';
import { MarkerService } from '../../core/services/marker.service';

@Component({
  selector: 'app-filterschool',
  templateUrl: './filterschool.component.html',
  styleUrls: ['./filterschool.component.css']
})
export class FilterschoolComponent implements OnInit {
  @Input() urn: any;
  @Output() view = new EventEmitter<boolean>();

  location: any ={};
  filterForm: FormGroup;
  message: object;


  
  constructor(private searchService: SearchService, private markerService: MarkerService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      'view': new FormControl(true),
      'distance': new FormControl(20),
      'ageRange': new FormControl(null),
      'rating': new FormControl(null),
      'gender': new FormControl(null),
      'type': new FormControl(null),
      'religiousCharacter': new FormControl(null)
    });
    this.searchService.currentMessage.subscribe(message => this.message = this.filterForm.value);

    this.filterForm.valueChanges.subscribe(values => {
      this.searchService.currentLocation.subscribe((location)=> {this.location = location;})
      values.lat = this.location.lat;
      values.lng = this.location.lng;
      this.searchService.changeMessage(values);

      this.searchService.findSchool(values).subscribe(
        (response) => {
          this.markerService.setMarkers(response, "clear");
        },
        (error) => { console.log(error); }
      );
    });
  }

}




