import { CompareSchoolService } from './../../core/services/compare-school.service';

import { UserAuthenticationService } from './../../core/services/user-authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { SchoolService } from './../../core/services/school.service';
import { SearchService } from '../../core/services/search.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";

@Component({
  selector: 'app-schoollist',
  templateUrl: './schoollist.component.html',
  styleUrls: ['./schoollist.component.css']
})
export class SchoollistComponent implements OnInit {
  @Input() urn: any;
  schools: any[];
  selectedSchool: object;
  message: object;
  ofstedRatings = {
    '1': 'Outstanding',
    '2': 'Good',
    '3': 'Satisfactory',
    '4': 'Inadequate',
    '5': 'Not Available'
  };
  constructor(private searchService: SearchService, 
  private schoolService: SchoolService, 
  private router: Router, 
  private userAuthService: UserAuthenticationService, 
  private toasterService: ToastrService, 
  private compareSchoolService: CompareSchoolService) {}

  filter: any = {};
  panelOpenState: boolean = false;
  ngOnInit() {
    this.schools = [];
    this.searchService.currentMessage.subscribe((message) =>
    this.handleResponse(message)), this.error(Error);
  }

  handleResponse(message) {
    if (message){
      this.dataChanged(message)
    }
  }
  dataChanged(obj: object) {
    this.fetchData(obj);
  }
  error(error) {
    console.log(error);
  }
  onSelect(obj): void {
    this.selectedSchool = obj;
  }
  fetchData(obj: object) {
    this.searchService.findSchool(obj).subscribe(
      (response: any) => {
        if (response && response.length) {
          this.schools = response.map((item, index) =>{
            return this.convertWishListObject(item);
          });
        }
      },
      (error) => { console.error('searchService.findSchool', error); }
    );
  }

  addToWishList(event: Event, school: any, flag: boolean) {
    event.stopPropagation();
    if(this.userAuthService.isLoggedIn()){
      school.visible = !school.visible;
      if (school.visible) {
        this.schoolService.addToWishlist(school.uniqueReferenceNumber).then((result) =>{
          console.error(result);
          this.toasterService.info('Successfully Added In WishList!');
        }).catch((error) =>{
          console.error(error);
        });
      } else {
        this.schoolService.removeFromWishList(school.uniqueReferenceNumber).then((result) =>{
          this.toasterService.info("Removed From Wishlist");
        }).catch((error) =>{
           console.error(error);
        });
      }
    }else {
       this.toasterService.error('Please login using your account details to mark any school in your wishlist');
    }
    
  }

  viewSchoolDetails(urn: string) {
    this.router.navigate(['schooldetails', urn]);
  }

  convertWishListObject(item) : schoolObject {
    return {
      visible : this.checkAddedToWishList(item),
      weblink : 'http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider/ELS/' + item.uniqueReferenceNumber,
      image: (item.images && item.images.length && item.images[0]) ? '/assets/images/' + item.uniqueReferenceNumber + '/' + 
      item.images[0] : '/assets/images/profile-image.png',
      ofstedLastInsp: item.ofstedLastInsp ? item.ofstedLastInsp : '',
      rating: item.rating ? this.ofstedRatings[item.rating] : '',
      uniqueReferenceNumber : item.uniqueReferenceNumber ? item.uniqueReferenceNumber : '',
      establishmentName: item.establishmentName ? item.establishmentName : '',
      typeOfEstablishment: (item.typeOfEstablishment && item.typeOfEstablishment.label) ? 
      item.typeOfEstablishment.label : '',
      address: item.LSOA && item.LSOA.label ? item.LSOA.label : '',
      ageRange: (item.statutoryLowAge && item.statutoryHighAge) ? item.statutoryLowAge + '-' + item.statutoryHighAge : '',
      gender: item.gender ? item.gender : '',
      religiousCharacter: item.religiousCharacter ? item.religiousCharacter : '',
      location: item.location.coordinates,
      isAddedToCompare: this.checkIfAddedToCompare(item.uniqueReferenceNumber),
      prefEmail: item.prefEmail ? item.prefEmail : "",
      telephoneNo: item.TelephoneNum ? item.TelephoneNum : "",
      head: item.HeadTitle +" "+ item.HeadFirstName +" "+ item.HeadLastName,
    };
  }

  addToCompare(event: Event, school: any, flag: boolean) {
    event.stopPropagation();
    if (this.userAuthService.isLoggedIn()) {
      school.isAddedToCompare = !school.isAddedToCompare;
      if (school.isAddedToCompare) {
        this.compareSchoolService.addToCompare(school.uniqueReferenceNumber)
      } else {
        this.compareSchoolService.removeFromCompare(school.uniqueReferenceNumber)
        this.toasterService.info('Removed from Compare List');
      }
    } else {
      this.toasterService.error('Please login using your account details to mark any school in your wishlist');
    }
  }
  
  checkIfAddedToCompare(urn: any) {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        let index = _.indexOf(compareList, urn);
        return index >= 0 ? true : false;
  }

  private checkAddedToWishList(item){
    if(this.userAuthService.isLoggedIn()){
      let loggedInUser = JSON.parse(localStorage.getItem('user'));
      let wishlist = loggedInUser.wishlist;
      if(wishlist.length){
        let index = wishlist.indexOf(item.uniqueReferenceNumber);
        if (index > -1)
          return true;
        else
          return false;
      }else{
        return false;
      }
    }else {
      return false;
    }
  }

  setClasses(rating:string) {
    return "rating-"+ rating.toLocaleLowerCase().split(" ").join("-");
  }
}

interface schoolObject {
  visible: boolean,
  weblink : string,
  ofstedLastInsp: string;
  rating: string;
  uniqueReferenceNumber: string;
  establishmentName: string;
  typeOfEstablishment: string;
  address: string;
  ageRange : string;
  gender: string;
  religiousCharacter: string;
  location: object;
  image: string;
  isAddedToCompare : boolean,
  prefEmail: string,
  telephoneNo: number,
  head: string,
}