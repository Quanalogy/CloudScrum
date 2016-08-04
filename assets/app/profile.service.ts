/**
 * Created by munk on 03-08-16.
 */

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class ProfileService{
    constructor(private http: Http)

    getProfile(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage
    }
}