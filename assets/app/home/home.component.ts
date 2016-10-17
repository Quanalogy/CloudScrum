/**
 * Created by munk on 10-08-16.
 */

import {Component} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";


@Component({
    selector: 'home-component',
    template: require("./home.component.html")
})

export class HomeComponent {
    constructor(public router: Router){

    }


    logout(){
        localStorage.removeItem('token');
        this.router.navigateByUrl('');
    }
}
