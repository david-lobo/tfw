import {UpdateForm} from '../UpdateForm';

export class AccountManagerAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'accountManager', endpoint, 'POST', AccountManagerAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }

    static loadAllAccountManagers(callback) {
        $.get(config.routes.accountmanager + '?limit=1000', function (data) {
            config.accountmanagers = data.data;
            callback();
        });
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