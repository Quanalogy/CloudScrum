/**
 * Created by munk on 10-08-16.
 */


import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {IJSONOk} from "../../../interfaces/IJSONOk";


@Injectable()
export class HomeService{
    patchPWURL = "/users/";

    constructor(public http: Http){

    }


    patchUserPassword(email: string, currentPassword: string, newPassword: string): Observable<IJSONOk>{
        let body = JSON.stringify({email: email, currentPassword: currentPassword, newPassword: newPassword});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.patchPWURL, body, options).map(res => res.json());

    }

}