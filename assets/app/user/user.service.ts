/**
 * Created by munk on 02-08-16.
 */
import {User} from "./user";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";    // needed for toPromise()

@Injectable()
export class UserService{

    constructor(private http: Http){

    }

    private createUserURL = "/users/create-user";
    private loginURL = "/users/login";

    getUserByEmail(email: string): Observable<User>{
        console.log("Sending GET");
        let getUserURL = "/users/" + email;

        return this.http.get(getUserURL)
            .map(res => res.json());    // we are recieving json data

    }


    postUser(email: string, password: string){
        console.log("Sending post");
        let body = JSON.stringify({email: email, password: password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(
            this.createUserURL, body, options
        ).toPromise().then(res => res.json().data);

    }

    login(email: string, password: string){
        let body = JSON.stringify({email: email, password: password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(
            this.loginURL, body, options
        ).map(res => res.json);
    }

}