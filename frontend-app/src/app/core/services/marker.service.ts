import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MarkerService {
  public schoolMarkers: any = [];
  callToGoogleMap: any;

  constructor(private http: HttpClient) { }

  setMarkers(result: any, status: string) {
    this.schoolMarkers = []; //status == "clear" ? [] : this.schoolMarkers;

    result.map((item) => ({
      lat: item.location.coordinates[1],
      lng: item.location.coordinates[0],
      title: item.establishmentName,
      icon: this.getRateIcon(item.rating),
      urn: item.uniqueReferenceNumber
    }
    )).forEach(item => this.schoolMarkers.push(item));


    if (typeof this.callToGoogleMap == 'function') {
      this.callToGoogleMap(this.schoolMarkers)
      return;
    }

    return this.schoolMarkers;
  }

  getRateIcon(rating: any) {
    let icon;

    switch (rating) {
      case "1":
        icon = '../../assets/images/outstanding.png'
        break;

      case "2":
        icon = '../../assets/images/good.png'
        break;

      case "3":
        icon = '../../assets/images/requiresimprovement.png'
        break;

      case "4":
        icon = '../../assets/images/inadequate.png'
        break;

      default:
        icon = '../../assets/images/na.png'
        break;

    }

    return (icon);
  }

  getMarkers() {
    return this.schoolMarkers;
  }
}
