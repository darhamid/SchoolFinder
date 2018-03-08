import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.parentForm.addControl("firstName",  new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]+"), Validators.maxLength(50)]));
    this.parentForm.addControl("lastName",  new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]+"), Validators.maxLength(50)]));
  }
  
  isFieldValid(field: string) {
    return this.parentForm.get(field).touched && this.parentForm.get(field).invalid;
  }
}
