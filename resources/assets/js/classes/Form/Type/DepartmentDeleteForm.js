import {DeleteForm} from '../DeleteForm';

export class DepartmentDeleteForm extends DeleteForm {
    constructor(endpoints) {
        super('#deleteDialog', 'department', endpoints, 'DELETE', DepartmentDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}