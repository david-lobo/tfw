import {DeleteForm} from '../DeleteForm';

export class CategoryDeleteForm extends DeleteForm {
    constructor(endpoints) {

        super('#deleteDialog', 'category', endpoints, 'DELETE', CategoryDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}