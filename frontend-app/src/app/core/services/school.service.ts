import { Constants } from './../appsettings/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

const ofstedRatings = {
    '1': 'Outstanding',
    '2': 'Good',
    '3': 'Satisfactory',
    '4': 'Inadequate',
    '5': 'Not Available'
};

@Injectable()
export class SchoolService {




    constructor(private http: HttpClient) {

    }

    addToWishlist(urn: any) {
        let loggedInUser: any;
        try {
            loggedInUser = localStorage.getItem('user');
            loggedInUser = JSON.parse(loggedInUser);
            loggedInUser.wishlist.push(urn);
            const reqUrl = Constants.fmtURL(Constants.addToWishlistURL, loggedInUser._id);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            return this.http.put(reqUrl, { urn }).toPromise();
        } catch (error) {
            return error;
        }
    }

    removeFromWishList(urn: any) {
        try {
            const loggedInUser = JSON.parse((localStorage.getItem('user')));
            const reqUrl = Constants.fmtURL(Constants.addToWishlistURL, loggedInUser._id);
            var index = loggedInUser.wishlist.indexOf(5);
            if (index > -1) {
                loggedInUser.wishlist.splice(index, 1);
            }
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            return this.http.delete(reqUrl, { params: { urn: urn } }).toPromise();
        } catch (error) {
            console.log(error);
        }
    }

    getSchoolDetails(urn: string) {
        const reqUrl = Constants.fmtURL(Constants.getSchoolDataURL, urn);
        return this.http.get(reqUrl).map(this.extractData).catch(this.handleErrorObservable);
    }

    getWishList(schoolsIds: Array<any>) {
        const _that = this;
        const reqUrl = Constants.fmtURL(Constants.getSchoolDataURL, schoolsIds);
        const promisesArray = schoolsIds.map((schoolsId, index) => {
            return _that.http.get(`school/${schoolsId}`).toPromise();
        });
        return Promise.all(promisesArray);
    }



    handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    extractData(response) {
        // return schoolData
        if (response.success) {
            const schoolData = response.data;
            return {
                localAuthority: schoolData.localAuthority ? schoolData.localAuthority.label : "",
                prefEmail: schoolData.prefEmail ? schoolData.prefEmail : "",
                postCode: schoolData.postcode ? schoolData.postcode : "",
                pupilStrength: schoolData.pupilStrength ? schoolData.pupilStrength : "",
                image: schoolData.images && schoolData.images[0] ? '/assets/images/' + schoolData.uniqueReferenceNumber + '/' + schoolData.images[0] : '/assets/images/profile-image.png',
                weblink: schoolData.SchoolWebsite ? schoolData.SchoolWebsite : '',
                ofstedLastInsp: schoolData.ofstedLastInsp ? schoolData.ofstedLastInsp : '',
                rating: schoolData.rating ? ofstedRatings[schoolData.rating] : '',
                uniqueReferenceNumber: schoolData.uniqueReferenceNumber ? schoolData.uniqueReferenceNumber : '',
                establishmentName: schoolData.establishmentName ? schoolData.establishmentName : '',
                typeOfEstablishment: (schoolData.typeOfEstablishment && schoolData.typeOfEstablishment.label) ? schoolData.typeOfEstablishment.label : '',
                address: schoolData.LLSC.label +" "+ schoolData.LSOA.label +" "+ schoolData.postcode,
                statutoryLowAge: schoolData.statutoryLowAge ? schoolData.statutoryLowAge : '',
                statutoryHighAge: schoolData.statutoryHighAge ? schoolData.statutoryHighAge : '',
                gender: schoolData.gender && schoolData.gender.label ? schoolData.gender.label : '',
                religiousCharacter: schoolData.religiousCharacter && schoolData.religiousCharacter.label ? schoolData.religiousCharacter.label : '',
                location: schoolData.location.coordinates,
                telephoneNo: schoolData.TelephoneNum ? schoolData.TelephoneNum : "",
                head: schoolData.HeadTitle + " " + schoolData.HeadFirstName + " " + schoolData.HeadLastName,
            }
        } else {
            return this.handleErrorObservable(response)
        }

    }




}

interface SeverResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
    timestamp: number;
}
