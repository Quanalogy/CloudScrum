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

    getUserByEmail(email: string): Observable<User>{
        console.log("Sending GET");
        let getUserURL = "/users/" + email;


        //return
        return this.http.get(getUserURL)
            .map(res => res.json());    // we are recieving json data

    }

    private extractData(res: Response){
        let body = res.json();
        console.log("This is the body:", body);
        return body.data || {};
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

    private handleError(error: any){
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}