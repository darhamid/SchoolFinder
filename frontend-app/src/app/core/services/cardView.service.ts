import { UserAuthenticationService } from './user-authentication.service';
import { Constants } from './../appsettings/constants';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { SchoolCard } from "../models/schoolCard.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CardService {
    private cardData = new BehaviorSubject<any>({}); // default data
    constructor(private http: HttpClient, private userAuthService: UserAuthenticationService) { }

    getCardData = this.cardData.asObservable();

    setCardData(message: any) {
        let reqUrl = Constants.fmtURL(Constants.getSchoolDataURL, message.urn);
        this.http.get(reqUrl)
            .subscribe((response: any) => {
                if (response.success)
                    this.cardData.next(this.mapSchoolData(response.data));
                else
                    return Observable.throw(response.message)
            },
            (error) => {
                return Observable.throw(error)
            });
    }

    resetCardData() {
        this.cardData.next({});
    }

    mapSchoolData(schoolData): SchoolCard {
        return {
            visible : this.checkIfAddedToWishList(schoolData),
            image: schoolData.images && schoolData.images[0] ? "/assets/images/" + schoolData.uniqueReferenceNumber + "/" + schoolData.images[0] : "/assets/images/profile-image.png",
            weblink: schoolData.weblink ? schoolData.weblink : "",
            ofstedLastInsp: schoolData.ofstedLastInsp ? schoolData.ofstedLastInsp : "",
            rating: schoolData.rating ? this.ofstedRatings[schoolData.rating] : "",
            uniqueReferenceNumber: schoolData.uniqueReferenceNumber ? schoolData.uniqueReferenceNumber : "",
            establishmentName: schoolData.establishmentName ? schoolData.establishmentName : "",
            typeOfEstablishment: (schoolData.typeOfEstablishment && schoolData.typeOfEstablishment.label) ? schoolData.typeOfEstablishment.label : "",
            address: schoolData.LLSC.label +" "+ schoolData.LSOA.label +" "+ schoolData.postcode,
            statutoryLowAge: schoolData.statutoryLowAge ? schoolData.statutoryLowAge : "",
            statutoryHighAge: schoolData.statutoryHighAge ? schoolData.statutoryHighAge : "",
            gender: schoolData.gender && schoolData.gender.label ? schoolData.gender.label : "",
            religiousCharacter: schoolData.religiousCharacter && schoolData.religiousCharacter.label ? schoolData.religiousCharacter.label : "",
            location: schoolData.location.coordinates,
            telephoneNum: schoolData.TelephoneNum ? schoolData.TelephoneNum : "",
            isAddedToCompare: false
        }
    }

    private checkIfAddedToWishList(item){
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
    
    ofstedRatings = {
        "1": "Outstanding",
        "2": "Good",
        "3": "Satisfactory",
        "4": "Inadequate",
        "5": "Not Available"
    }
}