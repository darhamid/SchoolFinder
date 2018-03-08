import { Constants } from './../appsettings/constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { SchoolCard } from "../models/schoolCard.model";
import { Observable, Subject } from "rxjs/Rx";
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CompareSchoolService {

    private compareList: any[] = [];

    constructor(
        private http: HttpClient,
        private toasterService: ToastrService
    ) { }

    getCompareList = this.compareList;

    checkIfExist(urn) {
        return _.findIndex(this.compareList, ["uniqueReferenceNumber", urn])
    }

    // getFromLocalStorage() {
    //     let compareList = JSON.parse(localStorage.getItem("compareList"));
    //     if (compareList && compareList.length)
    //         compareList.forEach(element => {
    //             this.addToCompare(element)
    //         });
    // }

    addToCompare(urn: string) {
        if (this.compareList.length < 3) {
            if (this.checkIfExist(urn) == -1) {
                this.getSchoolDetails(urn);
                this.addRemoveFromLocalStorage(urn, true)
                this.toasterService.info('Successfully Added In Compare List!');
            } else
                this.toasterService.info("Already Added To Compare List");
        }
        else
            this.toasterService.info("Only 3 Schools can be Compared");
    }

    removeFromCompare(urn: string) {
        let index = _.findIndex(this.compareList, ["uniqueReferenceNumber", urn]);
        this.addRemoveFromLocalStorage(urn, false)
        if (index >= 0) {
            this.compareList.splice(index, 1)
        }
    }

    getSchoolDetails(urn: string) {
        let reqUrl = Constants.fmtURL(Constants.getSchoolDataURL, urn);
        this.http.get(reqUrl)
            .subscribe((response: any) => {
                if (response.success && this.checkIfExist(response.data.uniqueReferenceNumber) == -1)
                    this.compareList.push(this.mapSchoolData(response.data));
                // else
                //     return Observable.throw(response.message)
            },
            (error) => {
                return Observable.throw(error)
            });
    }

    setClasses(rating: string) {
        return "rating-" + rating.toLocaleLowerCase().split(" ").join("-");
    }

    getRatingTag(rating) {
        return `<span class='${"table-rating-chip rating-" + rating.toLocaleLowerCase().split(" ").join("-")}'">${rating}</span>`
    }

    getAddress(address, image) {
        return `<img  class="header-image mat-card-avatar" src="${image}">
        <p>${address}</p>`
    }

    mapSchoolData(schoolData): any {
        return {
            establishmentName: schoolData.establishmentName ? schoolData.establishmentName : "",
            address: this.getAddress(schoolData.LLSC.label + schoolData.LSOA.label + schoolData.postcode, schoolData.images && schoolData.images[0] ? "/assets/images/" + schoolData.uniqueReferenceNumber + "/" + schoolData.images[0] : "/assets/images/profile-image.png"),
            typeOfEstablishment: (schoolData.typeOfEstablishment && schoolData.typeOfEstablishment.label) ? schoolData.typeOfEstablishment.label : "",
            rating: this.getRatingTag(this.ofstedRatings[+schoolData.rating]),
            age: schoolData.statutoryLowAge + "-" + schoolData.statutoryHighAge + " years",
            gender: schoolData.gender && schoolData.gender.label ? schoolData.gender.label : "",
            religiousCharacter: schoolData.religiousCharacter && schoolData.religiousCharacter.label ? schoolData.religiousCharacter.label : "",
            contactNo: schoolData.TelephoneNum,
            head: schoolData.HeadTitle + " " + schoolData.HeadFirstName + " " + schoolData.HeadLastName,
            boarding: schoolData.boarders.label,
            localAuthority: schoolData.localAuthority.label,
            phaseOfEducation: schoolData.phaseOfEducation.label,
            transportation: "",
            image: schoolData.images && schoolData.images[0] ? "/assets/images/" + schoolData.uniqueReferenceNumber + "/" + schoolData.images[0] : "/assets/images/profile-image.png",
            uniqueReferenceNumber: schoolData.uniqueReferenceNumber,
            schoolWebsite: schoolData.SchoolWebsite
        }
    }

    ofstedRatings = {
        "1": "Outstanding",
        "2": "Good",
        "3": "Satisfactory",
        "4": "Inadequate",
        "5": "Not Available"
    }

    addRemoveFromLocalStorage(urn: string, flag: boolean) {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        let index = _.indexOf(compareList, urn);
        if (flag && index == -1) {
            compareList.push(urn);
        } else if (index >= 0) {
            compareList.splice(index, 1)
        }
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }

    checkIfAddedToCompare(urn: string) {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        let index = _.indexOf(compareList, urn);
        return index >= 0 ? true : false;
    }

}