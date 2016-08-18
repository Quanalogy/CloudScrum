import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES, CanActivate, Router} from "@angular/router";
import {Item} from "./item";

@Component({
    selector: 'item-component',
    template: require("./item.component.html"),
    directives: [ROUTER_DIRECTIVES]
})

export class ItemComponent {
    @Input() item: Item;
}
