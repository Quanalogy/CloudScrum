/**
 * Created by munk on 10-08-16.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";


@Injectable()
export class HomeService{
    private loggedIn = false;

    constructor(private http: Http){
        this.loggedIn = !!localStorage.getItem("token");
    }

}