import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';

import { SearchService } from '../../core/services/search.service';
import { MarkerService } from '../../core/services/marker.service';
import { CardService } from '../../core/services/cardView.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Marker } from '@agm/core/services/google-maps-types';
import { createDirectiveInstance } from '@angular/core/src/view/provider';
import * as _ from "lodash";
declare const google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit, OnChanges {

  constructor(private searchService: SearchService, private markerService: MarkerService, private dataService: CardService) { }
  @Input() urn: any;
  @Input() distance: any;
  @Output() onMarkerClicked = new EventEmitter<any>();  

  filter: any = {};

  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 51.509865;
  lng: number = -0.118092;

  catchmentLat: number = 51.509865;
  catchmentLng: number = -0.118092;
  catchmentState: boolean = false;

  // Map Functions

  mapClicked($event: MouseEvent) { }

  centerChange($event: any) {
    if (this.distance !== 0) {
      let status = "";
      this.searchService.currentMessage
        .subscribe((message) => { this.filter = message });

      this.filter.urn = null;
      this.filter.lng = $event.lng;
      this.filter.lat = $event.lat;

      if (!this.filter.distance)
        this.filter.distance = 20;

      this.searchService.findSchool(this.filter)
        .subscribe(
        (response) => {
          this.searchService.changeLocation({ lat: $event.lat, lng: $event.lng });
          this.markerService.setMarkers(response, status);
        },
        (error) => { console.error(error); }
        )
    }
  }

  getZoomLevel(distance: number) {
    let zoomLevel = 15;
    if (distance < 10)
      zoomLevel = 17;
    else if (distance >= 10 && distance < 20)
      zoomLevel = 16;
    else if (distance >= 20 && distance < 30)
      zoomLevel = 15;
    else if (distance >= 30 && distance < 45)
      zoomLevel = 14;
    else if (distance >= 45 && distance < 60)
      zoomLevel = 13;
    else if (distance >= 60 && distance < 80)
      zoomLevel = 12;
    else if (distance >= 80)
      zoomLevel = 11;

    this.zoom = zoomLevel;
  }

  // Marker Functions
  markerClick(markerData) {
    this.onMarkerClicked.emit(markerData);
    this.catchmentLat = markerData.lat;
    this.catchmentLng = markerData.lng;
  }

  catchmentData(data: any) {
    this.catchmentState = data.state;
    this.catchmentLat = data.lat;
    this.catchmentLng = data.lng;
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[];

  setmarkOnMap(geovalues): void {
    if (geovalues && geovalues.length) {
      this.markers = geovalues;
      let searchedSchool = _.find(geovalues, ["urn", +this.urn])
      if (searchedSchool && searchedSchool.lat && searchedSchool.lng) {
        this.onMarkerClicked.emit(searchedSchool); // display card on map load
        this.lat = searchedSchool.lat;
        this.lng = searchedSchool.lng;
      }
    }
    else {
      this.markers = [];
    }
  }

  ngOnInit() { }

  ngOnChanges() {
    this.filter.distance = this.filter.distance || this.distance;
    if (!!this.urn)
      this.filter.urn = this.urn;
    else {
      let devicelLocation = this.checkDeviceLocation();
      this.filter.lng = devicelLocation && devicelLocation.longitude ? devicelLocation.longitude : -0.118092;
      this.filter.lat = devicelLocation && devicelLocation.latitude ? devicelLocation.latitude : 51.509865;
    }
    this.markerService.callToGoogleMap = this.setmarkOnMap.bind(this);
    this.searchService.findSchool(this.filter).subscribe(
      (response) => {
        this.markerService.setMarkers(response, "clear")

      },
      (error) => { console.error("searchService.findSchool", error); }
    )

    this.searchService.currentMessage
      .subscribe((message) => {
        this.filter = message;
        this.getZoomLevel(this.filter.distance);
      });

    this.searchService.catchmentState
      .subscribe((status) => this.catchmentData(status));
  }


  checkDeviceLocation(): any {
    let country;
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': new google.maps.LatLng(position.coords.latitude, position.coords.longitude) }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              for (var i = 0; i < results.length; i++) {
                if (results[i].types[0] === "country") {
                  country = results[i].address_components[0].short_name;
                }
              }
              if (country === "GB")
                return position.coords;
              else
                return false;
            }
          }
        })
      });
    }
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  title: string;
  icon: string;
  urn: string;
}
