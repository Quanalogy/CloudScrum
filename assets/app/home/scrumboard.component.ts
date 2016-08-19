/**
 * Created by munk on 12-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Item} from "./scrumboard/item/item";
import {DragulaService, Dragula} from 'ng2-dragula/ng2-dragula';
import {fromStringToEnum, EItemCategory} from "../../../backend/models/item/EItemCategory";

@Component({
    selector: 'scrumboard-component',
    template: require("./scrumboard.component.html"),
    directives: [ROUTER_DIRECTIVES,Dragula],
    providers: [
        DragulaService
    ],
    viewProviders: [DragulaService],
})

export class ScrumboardComponent implements OnInit{

    itemArraySize = 0;
    inprogressArraySize = 0;
    reviewArraySize = 0;
    doneArraySize = 0;

    itemArray: Array<Item> = [];
    inprogressArray: Array<Item> = [];
    reviewArray: Array<Item> = [];
    doneArray: Array<Item> = [];
    arraySize = this.itemArray.length;
    id = 0;
    inputName = "";


    constructor(private dragulaService: DragulaService){
        dragulaService.setOptions("bag-one", {
            accepts: (el, target, source, sibling) => { // Makes sure that the direction of the elements is correct
                if(source.id === "backlog" && target.id === "inProgress"){
                    return true;
                } else if(source.id === "inProgress" && target.id === "review"){
                    return true;
                } else if(source.id === "review" && target.id === "done"){
                    return true;
                } else if(source.id === "review" && target.id === "inProgress"){
                    return true;
                } else {
                    return false;
                }
            }
        });

        dragulaService.drop.subscribe(value => {
            const el = value.slice(0);
            const target = value.slice(2).id;
            el.itemCategory = fromStringToEnum(target);
        });
    }


    ngOnInit() {

    }

    updateSize(){
        this.itemArraySize = this.itemArray.length;
        this.inprogressArraySize = this.inprogressArray.length;
        this.reviewArraySize = this.reviewArray.length;
        this.doneArraySize = this.doneArray.length;
    }

    addItem(itemName: string){
        if(!itemName){
            return;
        }
        this.itemArray.push(new Item(itemName, this.id, EItemCategory.backlog, 0, 0));
        this.id = this.id +1;
        this.inputName = "";
        this.updateSize();
    }

}
