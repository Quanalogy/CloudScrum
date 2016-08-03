/**
 * Created by munk on 29-07-16.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router"

@Component({
    selector: 'login-component',
    templateUrl: '/js/app/login.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {
    title = "Hello login";

}