import {UpdateForm} from '../UpdateForm';

export class DepartmentAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'department', endpoint, 'POST', DepartmentAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }

    static getFields() {
        return [
            {
                type: 'hidden',
                name: 'id'
            },
            {
                type: 'textarea',
                name: 'title',
                label: 'Title'
            }
        ];
    }
}