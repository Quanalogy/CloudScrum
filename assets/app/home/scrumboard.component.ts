/**
 * Created by munk on 12-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Item} from "./scrumboard/item/item";
import {DragulaService, Dragula} from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'scrumboard-component',
    templateUrl: '/js/app/home/scrumboard.component.html',
    directives: [ROUTER_DIRECTIVES,Dragula],
    providers: [
        DragulaService
    ],
    viewProviders: [DragulaService],
})

export class ScrumboardComponent implements OnInit{

    public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
    public many2: Array<string> = ['Explore', 'them'];
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
        /*dragulaService.setOptions("bag-two", {
            accepts: (el, target, source, sibling) => {
                console.log("This is el:", el, "This is target", target, "this is source",
                source.className, "This is sibling", sibling);
                if(source.className === "menubar" || source.className === "menubar"){
                    return true;
                } else {
                    console.log("False");
                    return false;
                }
            }
        });*/
        /*dragulaService.setOptions("bag-one", {
            accepts: (el, target, source, sibling) => {
                console.log("This is el:", el, "This is target", target, "this is source",
                    source.className, "This is sibling", sibling);
                if(source.className === "menubar bag2" || source.className === "menubar bag3"){
                    return true;
                } else {
                    console.log("False");
                    return false;
                }
            }
        });*/
    }


    ngOnInit() {

/*        this.dragulaService.setOptions('first-bag', {
            accepts: function (el, target, source, sibling) {
                return (target.id)
            }
        })*/
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
        this.itemArray.push(new Item(itemName, this.id));
        this.id = this.id +1;
        this.inputName = "";
        this.updateSize();
    }

}