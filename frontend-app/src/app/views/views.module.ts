
import { CoreModule } from './../core/core.module';
import { FeatureModule } from './../features/feature.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './public/home-view/home-view.component';
import { RegistrationViewComponent } from './public/registration-view/registration-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LandingViewComponent } from './landing-view.component';
import { ViewsRoutingModule } from './views-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FindschoolsViewComponent } from './public/findschools-view/findschools-view.component';
import { SearchService } from '../core/services/search.service';
import { MarkerService } from '../core/services/marker.service';
import { CardService } from '../core/services/cardView.service';
import { MyaccountComponent } from './parent-profile/myaccount/myaccount.component';
import { SchooldetailsViewComponent } from './public/schooldetails-view/schooldetails-view.component';
import { MaterialModule } from '../core/material/material.module';
import { CompareschoolsViewComponent } from './public/compareschools-view/compareschools-view.component';
import { KeysPipe } from "../core/pipes/keys";
import { CamelCasePipe } from "../core/pipes/camelCase";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    FeatureModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ViewsRoutingModule,
    HttpClientModule
  ],
  declarations: [HomeViewComponent, RegistrationViewComponent, LandingViewComponent, FindschoolsViewComponent, CompareschoolsViewComponent,
    MyaccountComponent, SchooldetailsViewComponent, KeysPipe, CamelCasePipe],
  exports: [LandingViewComponent]
})
export class ViewsModule { }
