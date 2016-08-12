/**
 * Created by munk on 10-08-16.
 */
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {JwtHelper} from "angular2-jwt";

const secret = 'L33tWallahWallah';

@Component({
    selector: 'userPanel-component',
    templateUrl: '/js/app/home/userPanel.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UserPanelComponent implements OnInit {


    emailInUse = false;
    userMail = "";

    constructor(private jwtHelper: JwtHelper){

    }
    /*
    updateUserDetails(email?: string, password?: string, name?: string, phonenumber?: string){
        if(!email && !password && !name && !phonenumber){
            return;
        }
    }*/

    ngOnInit() {
        const token = localStorage.getItem("token");

        console.log(this.jwtHelper.decodeToken(token).email);
    }
}