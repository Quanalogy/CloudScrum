import {Component} from "@angular/core";
/**
 * Created by munk on 29-07-16.
 */

@Component({
    selector: 'login-component',
    templateUrl: '/js/app/login.component.html'
    //template: '<h1>hi this is {{unitID}}</h1>'
})

export class LoginComponent {
    unitID = 2;
}