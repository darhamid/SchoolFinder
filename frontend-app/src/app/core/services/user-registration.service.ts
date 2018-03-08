import { Constants } from './../appsettings/constants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  registerUser(user: any[]) {
      return this.http.post(Constants.registerUserURL, user).map((res: SeverResponse) => res);
  }
}

interface SeverResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: number;
}
