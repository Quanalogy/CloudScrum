import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router"

@Component({
    selector: 'my-app',
    templateUrl: '/js/app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {

    title = "Welcome to scrum online";
    constructor(){

    }

}