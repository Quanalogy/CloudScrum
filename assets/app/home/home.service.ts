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
    items = "/items";

    constructor(public http: Http){

    }

    //TODO move the path of this - right now it doesnt need AUTH TOKEN to patch username!!!!
    patchUserPassword(email: string, currentPassword: string, newPassword: string): Observable<IJSONOk>{
        let body = JSON.stringify({email: email, currentPassword: currentPassword, newPassword: newPassword});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.patchPWURL, body, options).map(res => res.json());

    }

    postItem(name: string, id: number, category: string, estimate: number, progress: number,
             assignee: string, priority: number): Observable<IJSONOk>{

        let body = JSON.stringify({name: name, id: id, category: category, estimate: estimate,
            progress: progress, assignee: assignee, priority: priority});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.items, body, options).map(res => res.json());
    }

}