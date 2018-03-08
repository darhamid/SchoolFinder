import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationService } from './../services/user-authentication.service';

import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";


@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private userAuth :UserAuthenticationService, private toasterServie: ToastrService){};
    canActivate(){
       
        if(this.userAuth.isLoggedIn()){
            return true;
        }
        else{
            this.toasterServie.error("You don't have permission to view this page. Please log in first");
            return false
        }
       
            
    }

}