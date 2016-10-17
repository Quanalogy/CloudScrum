/**
 * Created by munk on 29-07-16.
 */

import {Component} from "@angular/core";
import {Router} from "@angular/router"
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
    selector: 'login-component',
    template: require("./login.component.html"),
    providers: [UserService]
})

export class LoginComponent {
    title = "Login";
    rejected = false;
    model = new User('', '');

    constructor(private userService: UserService,
                private router: Router){

    }

    login(email: string, password: string){
        if(!email || !password){
            return;
        }

        this.userService.login(email.toLowerCase(), password).subscribe(
            (result) => {
                if(result){
                    this.rejected = false;
                    this.router.navigateByUrl("/home");
                } else {
                    this.rejected = true;
                }
            }
        );
    }
}
