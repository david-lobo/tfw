import {TreeUI} from './TreeUI';

export class CategoryTree extends TreeUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }
}