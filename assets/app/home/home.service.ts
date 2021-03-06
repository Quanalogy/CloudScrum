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
    patchDetailsURL = "/home/userDetails";
    itemsURL = "/items";

    constructor(public http: Http){

    }

    // For changing user password
    patchUserPassword(email: string, currentPassword: string, newPassword: string): Observable<IJSONOk>{
        let body = JSON.stringify({email: email, currentPassword: currentPassword, newPassword: newPassword});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.patchPWURL, body, options).map(res => res.json());

    }

    // For changing user details (not email atm)
    patchUserDetails(email: string, name: string, phoneNumber: string, picture: string){
        let body = JSON.stringify({email: email, name: name, phoneNumber: phoneNumber, picture: picture});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.patchDetailsURL, body, options).map(res => res.json());
    }

    // For adding an item to the scrumboard
    // TODO implement scrumboard id aswell
    postNewItem(item: Item): Observable<IJSONOk>{
        let body = JSON.stringify({item: item});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.itemsURL, body, options).map(res => res.json());
    }

    // Getting all items in the scrumboard
    // TODO implement scrumboard id aswell
    getItems(): Observable<Array<Item>>{
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.itemsURL, options).map(res => res.json());
    }

    // For changing a single item on the scrumboard.
    patchItem(item: Item): Observable<IJSONOk> {
        let body = JSON.stringify({item: item});
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token, 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.itemsURL, body, options).map(res => res.json());
    }

}