/**
 * Created by munk on 29-07-16.
 */

import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {UserService} from './user.service';

@Component({
    selector: 'login-component',
    templateUrl: '/js/app/login.component.html'
})

export class LoginComponent {
    title = "Hello login";

    constructor(private userService: UserService, private router: Router){

    }

    onSubmit(email, password){
        this.userService.login(email, password).subscribe((result) => {
            if(result){
                this.router.navigate(['']);
            }
        });
    }
}