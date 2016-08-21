/**
 * Created by munk on 10-08-16.
 */


import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {IJSONOk} from "../../../interfaces/IJSONOk";
import {Item} from "./scrumboard/item/item";


@Injectable()
export class HomeService{
    patchPWURL = "/home/";
    itemsURL = "/items";

    constructor(public http: Http){

    }

    patchUserPassword(email: string, currentPassword: string, newPassword: string): Observable<IJSONOk>{
        let body = JSON.stringify({email: email, currentPassword: currentPassword, newPassword: newPassword});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
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

        return this.http.post(this.itemsURL, body, options).map(res => res.json());
    }

    postNewItem(item: Item): Observable<IJSONOk>{
        let body = JSON.stringify({item: item});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.itemsURL, body, options).map(res => res.json());
    }

    getItems(): Observable<Array<Item>>{
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.itemsURL, options).map(res => res.json());
    }

    patchItems(name: string, id: number, category: string, estimate: number, progress: number,
               assignee: string, priority: number): Observable<IJSONOk> {
        let body = JSON.stringify({name: name, id: id, category: category, estimate: estimate,
            progress: progress, assignee: assignee, priority: priority});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.itemsURL, body, options).map(res => res.json());
    }

}