
import { ToastrService } from 'ngx-toastr';
import { SchoolService } from './../../core/services/school.service';
import { UserAuthenticationService } from './../../core/services/user-authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishListArray ;
  ofstedRatings = {
    '1': 'Outstanding',
    '2': 'Good',
    '3': 'Satisfactory',
    '4': 'Inadequate',
    '5': 'Not Available'
  };
  constructor(private http: HttpClient, private userAuthService: UserAuthenticationService, private schoolService: SchoolService, private router: Router, private toasterService: ToastrService) { }
  

  ngOnInit() {
       const loggedInUser = JSON.parse(localStorage.getItem('user'));
       const reqUrl = `user/${loggedInUser._id}/wishList`;
       this.http.get(reqUrl).subscribe((response: any) => {
         if (response.data && response.data.wishlist && response.data.wishlist.length) {
            this.schoolService.getWishList(response.data.wishlist).then((result) => {
               result = result.map(function(item: any) {
                    return item.data;
               });
               if (result && result.length) {
                this.wishListArray = result.map( (item, index) => {
                   return this.convertWishListObject(item);
                });
               }
            }).catch((error) => {
               console.error(error);
            });
         } else {
            console.log('%c No wish List or Empty wishlisttt! ', 'background: red; color: #bada55; font-weight:bold; font-size:20px');
         }
       }, (error) => { console.log(error); });
    
  }

  viewSchoolDetails(urn: string) {
    this.router.navigate(['schooldetails', urn]);
  }

  removeFromWishList(event: Event, urn: any, index: any) {
    event.stopPropagation();
    this.schoolService.removeFromWishList(urn).then(() =>{
      this.toasterService.info("Removed From Wishlist");
    }).catch((error) =>{
      console.error(error);
    });
    this.wishListArray.splice(index, 1);
  }

  setClasses(rating:string) {
    return "rating-"+ rating.toLocaleLowerCase().split(" ").join("-");
  }
  convertWishListObject(item) : wishListObject {
    return {
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
      gender: item.gender && item.gender.label ? item.gender.label : '',
      religiousCharacter: item.religiousCharacter && item.religiousCharacter.label ? item.religiousCharacter.label : '',
      location: item.location.coordinates,
      prefEmail: item.prefEmail ? item.prefEmail : "",
      telephoneNo: item.TelephoneNum ? item.TelephoneNum : "",
      head: item.HeadTitle +" "+ item.HeadFirstName +" "+ item.HeadLastName,
    };
  }
}

interface wishListObject {
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
  prefEmail: string;
  telephoneNo: number;
  head: string;
}