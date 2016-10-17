/**
 * Created by munk on 02-08-16.
 */
import {Component} from "@angular/core";
import {User} from "./user";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Component({
    selector: 'user-form',
    template: require("./create-user-form.component.html"),
    providers: [UserService]
})

export class CreateUserComponent{
    model = new User('', '');
    retypedPassword = '';
    passwordMatching = true;
    userInUse = false;

    constructor(private userService: UserService,
                private router: Router){

    }

    createUser(email: string, password: string){
        if (!email || !password){
            return;
        }
        if(this.model.password !== this.retypedPassword){
            return this.passwordMatching = false;
        }

        this.passwordMatching = true;


        this.userService.getUserByEmail(email.toLowerCase()).subscribe(
            (data) => {
                if(data.email.length < 5){
                    this.userService.postUser(email.toLowerCase(), password).then(
                        (success) => {
                            this.userInUse = false;
                            this.router.navigateByUrl('');
                    }, (failure) => {
                            this.userInUse = true;
                        });
                } else {
                    this.userInUse = true;
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
