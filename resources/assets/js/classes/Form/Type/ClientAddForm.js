import {UpdateForm} from '../UpdateForm';

export class ClientAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'client', endpoint, 'POST', ClientAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }

    static loadAllClients(callback) {
        $.get(config.routes.client + '?limit=1000', function (data) {
            config.clients = data.data;
            callback();
        });
    }

    static categoriesToOptions(categories) {
        let options = [];
        $(categories).each(function(i, v) {
            let option = {
                label: v.title,
                value: v.id
            }
            options.push(option);
        });
        return options;
    }

    static getCategoryOptions() {
        return ClientAddForm.categoriesToOptions(config.categories);
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