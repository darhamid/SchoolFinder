import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './../core/material/material.module';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AddressComponent } from './form/address/address.component';
import { FieldErrorComponent } from './form/field-error/field-error.component';
import { SigninComponent } from './membership/signin/signin.component';
import { FilterschoolComponent } from './filterschool/filterschool.component';
import { CardviewComponent } from './cardview/cardview.component';
import { SchoollistComponent } from './schoollist/schoollist.component';
import { PiechartComponent } from './charts/piechart/piechart.component';
import { NameComponent } from './form/name/name.component';
import { DonutchartComponent } from './charts/donutchart/donutchart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { SearchbyComponent } from './searchby/searchby.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { LayoutsComponent } from './form/layouts/layouts.component';
import { ContentComponent } from './form/layouts/content/content.component';
import { HeaderComponent } from './form/layouts/header/header.component';
import { FooterComponent } from './form/layouts/footer/footer.component';
import { SidenavComponent } from './form/layouts/sidenav/sidenav.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  slidesPerView: 4,
  observer: true,
  keyboard: true,
  mousewheel: true,
  scrollbar: false,
  navigation: true,
  pagination: false,
  centeredSlides: true,
  autoplay: true,
  roundLengths: true,
  watchOverflow: true,
  initialSlide: 3,
  speed:3000,
  breakpoints: {
    // when window width is <= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is <= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 30
    }
  }
};

const components = [
  GooglemapsComponent,
  WishlistComponent,
  MyprofileComponent,
  AddressComponent,
  FieldErrorComponent,
  SigninComponent,
  FilterschoolComponent,
  CardviewComponent,
  SchoollistComponent,
  PiechartComponent,
  NameComponent,
  DonutchartComponent,
  BarchartComponent,
  SearchbyComponent,
  SearchboxComponent,
  LayoutsComponent,
  ContentComponent,
  HeaderComponent,
  FooterComponent,
  SidenavComponent
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSI2-3EAMQB9UAxFBs768jP-F5KlkY7l8'
    })
  ],
  declarations: [
    ...components
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [...components]
})
export class FeatureModule { }
