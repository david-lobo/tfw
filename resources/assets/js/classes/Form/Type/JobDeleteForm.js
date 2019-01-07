import {DeleteForm} from '../DeleteForm';

export class JobDeleteForm extends DeleteForm {
    constructor(endpoints) {
        super('#deleteDialog', 'job', endpoints, 'DELETE', JobDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}