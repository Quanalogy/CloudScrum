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

    response = 0;

    constructor(private userService: UserService){

    }

    onSubmit(){
        this.submitted = true;
    }

    createUser(email: string, password: string){
        if (!email || !password){
            return;
        }


        this.userService.getUserByEmail(email).subscribe(
            (data) => {
                if(data.email.length < 5){
                    this.response = 1;
                    console.log("Empty body returned");
                    this.userService.postUser(email, password);
                } else {
                    console.log("This is the email: ", data.email);
                    this.response = 2;
                }
            }, // save revieved data
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