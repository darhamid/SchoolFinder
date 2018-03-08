import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CompareSchoolService } from "../../../core/services/compare-school.service";
import * as _ from "lodash";
@Component({
  selector: 'app-compareschools-view',
  templateUrl: './compareschools-view.component.html',
  styleUrls: ['./compareschools-view.component.css']
})
export class CompareschoolsViewComponent implements OnInit {
  dataSource;
  private attributeList: any[] = [
    { attr: "establishmentName", displayName: "School" },
    { attr: "address", displayName: "Address" },
    { attr: "typeOfEstablishment", displayName: "Type" },
    { attr: "rating", displayName: "Ofsted Rating" },
    { attr: "age", displayName: "Age range" },
    { attr: "gender", displayName: "Gender" },
    { attr: "religiousCharacter", displayName: "Religious character" },
    { attr: "contactNo", displayName: "Contact no." },
    { attr: "head", displayName: "Head" },
    { attr: "boarding", displayName: "Boarding" },
    { attr: "localAuthority", displayName: "Local authority" },
    { attr: "phaseOfEducation", displayName: "Phase of education" },
    { attr: "transportation", displayName: "Transportation" }
  ];


  constructor(private compareSchoolService: CompareSchoolService) { }

  ngOnInit() {
    this.dataSource = this.mapData(this.compareSchoolService.getCompareList);
  }

  mapData(data) {
    if (data && data.length) {
      let result = [];
      this.attributeList.forEach((element) => {
        let temp = { "attr": element.displayName };
        data.forEach((school, index) => {
          let key = element.attr + index;
          temp[key] = school[element.attr]
        })
        result.push(temp)
      });
      return result;
    }
  }
}