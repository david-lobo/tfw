import {UpdateForm} from '../UpdateForm';

export class JobAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'job', endpoint, 'POST', JobAddForm.getFields());
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
                type: 'input',
                name: 'code',
                label: 'Job No'
            },
            {
                type: 'textarea',
                name: 'title',
                label: 'Title'
            }
        ];
    }
}