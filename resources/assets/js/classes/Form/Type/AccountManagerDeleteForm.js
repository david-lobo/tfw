import {DeleteForm} from '../DeleteForm';

export class AccountManagerDeleteForm extends DeleteForm {
    constructor(endpoints) {

        super('#deleteDialog', 'accountManager', endpoints, 'DELETE', AccountManagerDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}