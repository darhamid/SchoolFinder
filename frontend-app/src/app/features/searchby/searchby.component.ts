import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

import { SearchService } from '../../core/services/search.service'
@Component({
  selector: 'app-searchby',
  templateUrl: './searchby.component.html',
  styleUrls: ['./searchby.component.css']
})
export class SearchbyComponent implements OnInit {

  searchBy : FormControl;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchBy =  new FormControl(this.searchService.searchBy);
    this.searchBy.valueChanges.subscribe((value) => this.searchService.changeSearchBy(value))
  }

}
