import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() childForm: string;
  address: FormGroup;

  constructor() { }

  ngOnInit() {
    this.address = new FormGroup({
      'addressLine5': new FormControl(null, [Validators.required]),
    });
    this.parentForm.addControl(this.childForm, this.address);
  }

}
