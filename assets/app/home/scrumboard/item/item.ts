/**
 * Created by munk on 12-08-16.
 */

export class Item{
    constructor(
        public itemName: string,
        public itemId: number,
        public priority: number,
        public assignee: string,
        public progress: number,
        public catagory: string
    ) {
        //
    }
}
