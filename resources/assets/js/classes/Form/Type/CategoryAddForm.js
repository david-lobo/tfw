import {UpdateForm} from '../UpdateForm';

export class CategoryAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'category', endpoint, 'POST', CategoryAddForm.getFields());
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