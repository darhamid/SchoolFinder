import { Injectable } from '@angular/core';


@Injectable()
export class Constants{
  
    public static registerUserURL = "user/signup";
    public static findSchoolURL = "searchSchools?";
    public static logoutURL = "user/logout";
    public static loginURL = "user/login";
    public static addToWishlistURL = "user/{0}/wishlist";
    public static getSchoolDataURL = "school/{0}/";
    public static getSchoolStatsURL = "school/{0}/statistics";
    public static profileLoginUrl = "user/{0}"
 

    public static fmtURL(url:any, param:any){
        url = url.replace(/{(\d+)}/g,param)
        return url;
    }
}