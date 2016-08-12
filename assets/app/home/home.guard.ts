/**
 * Created by munk on 11-08-16.
 */


import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {UserService} from "../user/user.service";
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class HomeGuard implements CanActivate {
    constructor(private userService: UserService){

    }

    canActivate(){
        return (this.userService.isLoggedIn() && tokenNotExpired('token'));
    }
}
