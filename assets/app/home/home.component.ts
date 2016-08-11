/**
 * Created by munk on 10-08-16.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, CanActivate} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";


@Component({
    selector: 'home-component',
    templateUrl: '/js/app/home/home.component.html',
    directives: [ROUTER_DIRECTIVES]
})


export class HomeComponent {

}