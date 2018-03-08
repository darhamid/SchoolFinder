import { AuthGuard } from './guards/auth-guards';
import { RouterGuard } from './guards/router-guards';

import { SchoolService } from './services/school.service';
import { CompareSchoolService } from './services/compare-school.service';
import { CardService } from './services/cardView.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationService } from './services/user-registration.service';
import { UserAuthenticationService } from './services/user-authentication.service';
import { SearchService } from './services/search.service';
import { MarkerService } from './services/marker.service';
import { UserChartsService } from './services/user-charts.service';
import { MyProfileService } from './services/my-profile.service';
import {UserProfileUpdateService} from './services/user-profile-update.service';

const modules = [
  CommonModule
];

const services = [
  UserRegistrationService,
  UserAuthenticationService,
  UserProfileUpdateService,
  AuthGuard,
  RouterGuard,
  SearchService,
  MarkerService,
  CardService,
  UserChartsService,
  SchoolService,
  MyProfileService,
  CompareSchoolService
];

@NgModule({
  imports: [
    ...modules 
  ],
  providers: [
    ...services
  ],
  declarations: []
})
export class CoreModule { }