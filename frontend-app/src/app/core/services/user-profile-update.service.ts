import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProfileUpdateService {

  constructor(private http: HttpClient) { }

  updateUserProfile(user) {

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const reqUrl = `user/${loggedInUser._id}/updateProfile`;
    return this.http.put(reqUrl, user).toPromise();
  }

}

interface SeverResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: number;
}
