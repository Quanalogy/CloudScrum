/**
 * Created by munk on 02-08-16.
 */
import {Component} from "@angular/core";
import {User} from "./user";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'user-form',
    templateUrl: '/js/app/user/create-user-form.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class CreateUserComponent{
    model = new User('', '');
    submitted = false;
    onSubmit(){
        this.submitted = true;
    }

}