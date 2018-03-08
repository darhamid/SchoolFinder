import { ParentPortalRoutingModule } from './parent-profile/parent-profile-routing.module';
import { AuthGuard } from './../core/guards/auth-guards';
import { RouterGuard } from './../core/guards/router-guards';
import { MyprofileComponent } from './../features/myprofile/myprofile.component';
import { WishlistComponent } from './../features/wishlist/wishlist.component';
import { MyaccountComponent } from './parent-profile/myaccount/myaccount.component';
import { MaterialModule } from './../core/material/material.module';
import { RegistrationViewComponent } from './public/registration-view/registration-view.component';
import { HomeViewComponent } from './public/home-view/home-view.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { SigninComponent } from '../features/membership/signin/signin.component';
import { FindschoolsViewComponent } from './public/findschools-view/findschools-view.component';
import { SchooldetailsViewComponent } from './public/schooldetails-view/schooldetails-view.component';
import { CompareschoolsViewComponent } from './public/compareschools-view/compareschools-view.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeViewComponent },
  { path: 'registration',canActivate:[RouterGuard],component: RegistrationViewComponent},
  { path: 'signin',canActivate:[RouterGuard], component: SigninComponent},
  { path: 'findschools', component: FindschoolsViewComponent },
  { path: 'findschools/:urn', component: FindschoolsViewComponent },
  { path: 'compareschools',canActivate:[AuthGuard],component: CompareschoolsViewComponent},
  { path: 'schooldetails/:urn', component: SchooldetailsViewComponent },
  { path: 'myaccount',canActivate:[AuthGuard], component: MyaccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes),
    ParentPortalRoutingModule,
    MaterialModule
],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }