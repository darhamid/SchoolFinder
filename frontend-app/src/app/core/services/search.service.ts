import { Constants } from './../appsettings/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {

  private messageSource = new BehaviorSubject<object>({});
  private locationSource = new BehaviorSubject<object>({});
  private catchmentSource = new BehaviorSubject<object>({});

  currentMessage = this.messageSource.asObservable();
  currentLocation = this.locationSource.asObservable();
  catchmentState = this.catchmentSource.asObservable();
  searchBy : string = "schoolName";
  constructor(private http: HttpClient) { }

  findSchool(parameters: any) {
    let reqUrl = Constants.findSchoolURL;
    for (let param in parameters) {
      if (parameters[param] !== null && parameters[param] !== undefined && param != "view")
        reqUrl = reqUrl.concat(param + "=" + parameters[param] + "&");
    }

    // TODO: error Catching....
    return this.http.get(reqUrl).map((res: SeverResponse) => res.data);
  }

  changeMessage(message: object) {
    this.messageSource.next(message);
  }

  changeLocation(location: object) {
    this.locationSource.next(location);
  }

  changeCatchmentState(status: object) {
    this.catchmentSource.next(status);
  }

  changeSearchBy(state: string) {
    this.searchBy = state;
  }
}

interface SeverResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: number;
}
