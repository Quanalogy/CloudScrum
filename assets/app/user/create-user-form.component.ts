/**
 * Created by munk on 02-08-16.
 */
import {Component} from "@angular/core";
import {User} from "./user";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {UserService} from "./user.service";

@Component({
    selector: 'user-form',
    templateUrl: '/js/app/user/create-user-form.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

export class CreateUserComponent{
    model = new User('', '');
    submitted = false;

    constructor(private userService: UserService){

    }

    onSubmit(){
        this.submitted = true;
    }

    createUser(email: string, password: string){
        if (!email || !password){
            return;
        }
        this.userService.postUser(email, password);
    }

}