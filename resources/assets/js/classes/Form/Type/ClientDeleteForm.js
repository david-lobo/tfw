import {DeleteForm} from '../DeleteForm';

export class ClientDeleteForm extends DeleteForm {
    constructor(endpoints) {

        super('#deleteDialog', 'client', endpoints, 'DELETE', ClientDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}