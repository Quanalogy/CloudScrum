/**
 * Created by munk on 02-08-16.
 */
import {User} from "./user";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ILoginOk} from "../../../interfaces/ILoginOk";

@Injectable()
export class UserService{

    private loggedIn = false;

    constructor(private http: Http){
        this.loggedIn = !!localStorage.getItem('token');
    }

    private baseURL = "/users";
    private createUserURL = "/users/";
    private loginURL = "/users/login";

    isEmailAvailable(email: string): Observable<boolean>{
        const url = this.baseURL + "/available/" + email;

        return this.http.get(url).map((res) => {
            const body = res.json();

            // Check the flag.
            return body.ok;
        });
    }

    getUserByEmail(email: string): Observable<User>{
        console.log("Sending GET");
        let getUserURL = "/users/" + email;

        return this.http.get(getUserURL)
            .map(res => res.json());
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

    login(email: string, password: string): Observable<ILoginOk>{
        let body = JSON.stringify({email: email, password: password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(
            this.loginURL, body, options
        ).map(res => res.json()).map((res) => {
            if (res.ok) {       // Handling request, in order for saving the token
                localStorage.setItem('token', res.data.token);   // The right place :)
                this.loggedIn = true;
            }
            return res.ok;
        });
    }

    logout(){
        localStorage.removeItem("token");
        this.loggedIn = false;
    }

    isLoggedIn(): boolean{
        return this.loggedIn;
    }

}
