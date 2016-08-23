/**
 * Created by munk on 10-08-16.
 */


import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {IJSONOk} from "../../../interfaces/IJSONOk";
import {Item} from "./project/scrumboard/item/item";
import {Project} from "./project/project";

// A service for CRUD authenticated tasks
@Injectable()
export class HomeService{
    patchPWURL = "/home/";
    projectURL = "/projects/";
    patchDetailsURL = "/home/userDetails";
    itemsURL = "/items";
    token = 'bearer ' + localStorage.getItem("token");
    headers = new Headers({'Authorization': this.token, 'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});

    constructor(public http: Http){

    }

    // For getting all projects the user is enlisted on
    getProjects(){
        let token = 'bearer ' + localStorage.getItem("token");
        let headers = new Headers({'Authorization': token});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.projectURL, options).map(res => res.json());
    }

    // For creating a new project
    postProject(name: string): Observable<IJSONOk>{
        let body = JSON.stringify({name: name});
        return this.http.post(this.projectURL, body, this.options).map(res => res.json());
    }


    // For changing user password
    patchUserPassword(email: string, currentPassword: string, newPassword: string): Observable<IJSONOk>{
        let body = JSON.stringify({email: email, currentPassword: currentPassword, newPassword: newPassword});


        return this.http.patch(this.patchPWURL, body, this.options).map(res => res.json());

    }

    // For changing user details (not email atm)
    patchUserDetails(email: string, name: string, phoneNumber: string, picture: string){
        let body = JSON.stringify({email: email, name: name, phoneNumber: phoneNumber, picture: picture});

        return this.http.patch(this.patchDetailsURL, body, this.options).map(res => res.json());
    }

    // For adding an item to the scrumboard
    // TODO implement scrumboard id aswell
    postNewItem(item: Item): Observable<IJSONOk>{
        let body = JSON.stringify({item: item});

        return this.http.post(this.itemsURL, body, this.options).map(res => res.json());
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

        return this.http.patch(this.itemsURL, body, this.options).map(res => res.json());
    }

}