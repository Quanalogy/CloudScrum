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

    constructor(private userService: UserService){

    }

    createUser(email: string, password: string){
        if (!email || !password){
            return;
        }


        this.userService.getUserByEmail(email).subscribe(
            (data) => {
                if(data.email.length < 5){
                    this.userService.postUser(email, password);
                } else {
                    //TODO handle that the user exists
                }
            },
            err => this.handleError(err)
        );
    }

    private handleError(error: any){
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}