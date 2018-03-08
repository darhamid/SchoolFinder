import { MyaccountComponent } from './myaccount/myaccount.component';
import { WishlistComponent } from './../../features/wishlist/wishlist.component';
import { MyprofileComponent } from './../../features/myprofile/myprofile.component';
import { AuthGuard } from './../../core/guards/auth-guards';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const profileRoutes: Routes = [

  { path: 'myaccount',canActivate:[AuthGuard], component: MyaccountComponent,
    children : [
      { path: '',redirectTo:'myprofile', pathMatch:'full' },
      { path: 'myprofile', component: MyprofileComponent },
      { path: 'wishlist', component: WishlistComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)
],
  exports: [RouterModule]
})
export class ParentPortalRoutingModule { }