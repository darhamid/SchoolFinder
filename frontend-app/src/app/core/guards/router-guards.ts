import { UserAuthenticationService } from './../services/user-authentication.service';

import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";


@Injectable()

export class RouterGuard implements CanActivate{
    constructor(private userAuth :UserAuthenticationService){};
    canActivate(){
        return !this.userAuth.isLoggedIn();      
    }

}