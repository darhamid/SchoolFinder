import { Constants } from './../appsettings/constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

export interface IData {
  // label: string;
  value: number;
}


@Injectable()
export class UserChartsService {

  constructor(private http: HttpClient) {
  }
  // private mockData: IData[] = [
  //   {

  //     value: 1,
  //   },
  //   {

  //     value: 2,
  //   }
  // ];
  // private dataSubject = new BehaviorSubject<IData[]>(this.mockData);
  // $data = this.dataSubject.asObservable();

  getStatisticsForSchool(urn: number) {
    //const reqUrl = `school/` +  urn + '/statistics';
    const reqUrl = Constants.fmtURL(Constants.getSchoolStatsURL,urn);
    return this.http.get(reqUrl).map((res: SeverResponse) => res);
  }


  // addData(newData: IData) {
  //   this.mockData.push(newData);
  //   this.dataSubject.next(this.mockData);
  // }
}

interface SeverResponse {
  success: boolean,
  statusCode: number
  message: string,
  data: any,
  timestamp: number
}
