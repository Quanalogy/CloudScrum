/**
 * Created by munk on 12-08-16.
 */

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Item} from "./scrumboard/item/item";

@Component({
    selector: 'scrumboard-component',
    templateUrl: '/js/app/home/scrumboard.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [

    ]
})

export class ScrumboardComponent{

    itemArray: Array<Item> = [];
    id = 0;
    inputName = "";

    addItem(itemName: string){
        this.itemArray.push(new Item(itemName, this.id));
        this.id = this.id +1;
        this.inputName = "";
    }
}