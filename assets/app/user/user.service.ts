/**
 * Created by munk on 02-08-16.
 */
import {User} from "./user";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class UserService{

    constructor(private http: Http){

    }

    private createUserURL = "create-user";

    getUser(){

    }

    postUser(email: string, password: string){
        console.log("Got into the postuser");
        console.log(email);
        console.log(password);
        let body = JSON.stringify({email: email, password: password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(
            this.createUserURL, body, options
        ).toPromise().then(res => res.json().data);

    }

    handleError(err){

    }
}