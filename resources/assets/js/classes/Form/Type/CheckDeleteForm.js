import {DeleteForm} from '../DeleteForm';

export class CheckDeleteForm extends DeleteForm {
    constructor(endpoint) {
        super('#deleteDialog', 'check', endpoint, 'DELETE', CheckDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}