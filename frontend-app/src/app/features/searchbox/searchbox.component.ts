import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import 'rxjs/Rx';
import { Router } from '@angular/router';

import {SearchService} from '../../core/services/search.service';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
  selectedSchool = {
    selected : false,
    uniqueReferenceNumber: ''
  };
  findSchoolFilter: FormControl;
  filter: any = {};
  options: any;
  constructor(private http: HttpClient, private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.findSchoolFilter = new FormControl();

    this.findSchoolFilter.valueChanges 
     .debounceTime(400)
     .distinctUntilChanged()
     .subscribe(term => {
       if (term && term !== "" && term !== null && term !== undefined)
        this.filter.searchTerm = term;
        this.filter.searchBy = this.searchService.searchBy;
        this.searchService.findSchool(this.filter).subscribe((response: any) => { this.options = response; }, (error) => { console.log(error); })
        this.options = []
     });
  }

  getSchool(uniqueReferenceNumber : string){
    this.router.navigate(['/findschools',uniqueReferenceNumber] );
  }

  onEnter(event : KeyboardEvent){
    if (event.keyCode == 13 && this.selectedSchool.selected) {
      this.router.navigate(['/findschools'], {queryParams: {urn : this.selectedSchool} } );
    }
  }

}