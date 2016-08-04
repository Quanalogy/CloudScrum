/**
 * Created by munk on 03-08-16.
 */

import {Injectable} from "@angular/core";
import {CanActivate} from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private user: UserService){

    }

    /*For each route definition we can restrict access by
     * creating a guard and adding it to the canActivate property.
     */
    canActivate(){
        return this.user.isLoggedIn();
    }
}