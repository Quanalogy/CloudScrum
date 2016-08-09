/**
 * Created by munk on 29-07-16.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router"
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
    selector: 'login-component',
    templateUrl: '/js/app/user/login.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

export class LoginComponent {
    title = "Login";
    model = new User('', '');

    constructor(private userService: UserService){

    }

    login(email: string, password: string){
        if(!email || !password){
            return;
        }

        this.userService.login(email, password).subscribe(success => {

        }, failure => {

        })
    }
}