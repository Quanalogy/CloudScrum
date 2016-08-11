/**
 * Created by munk on 10-08-16.
 */
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

const secret = 'L33tWallahWallah';

@Component({
    selector: 'userPanel-component',
    templateUrl: '/js/app/home/userPanel.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UserPanelComponent implements OnInit {


    emailInUse = false;
    userMail = "";
/*
    updateUserDetails(email?: string, password?: string, name?: string, phonenumber?: string){
        if(!email && !password && !name && !phonenumber){
            return;
        }
    }*/

    ngOnInit() {
        const token = localStorage.getItem("token");

        console.log("Init");
        console.log(localStorage.getItem("token"));
        //this.userMail = jwt.decode(localStorage.getItem("token"), secret);
        //console.log(this.userMail);
//        console.log(jwtHelper.getTokenExpirationDate(localStorage.getItem("token")));
    }
}