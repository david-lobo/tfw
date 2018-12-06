import {UpdateForm} from '../UpdateForm';
import {QuestionAddForm} from './QuestionAddForm';
import {ClientAddForm} from './ClientAddForm';
import {AccountManagerAddForm} from './AccountManagerAddForm';
//import {AdminPage} from '../../../app.js';

export class JobAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'job', endpoint, 'POST', JobAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }

    static getFields() {
        let that = this;
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
                type: 'input',
                name: 'title',
                label: 'Title'
            },
            {
                type: 'select',
                name: 'category_id',
                label: 'Category',
                options: QuestionAddForm.getCategoryOptions()
            },
            {
                type: 'select',
                name: 'client_id',
                label: 'Client',
                data_source: 'clients',
                options: function(success) {
                    console.log('JobAddForm.options', config.clients)

                    if (config.hasOwnProperty('clients')) {
                        if(config.clients.length > 0) {
                            success();
                            return false;
                        }
                    }
                    ClientAddForm.loadAllClients(success);                                      
                }
            },
            {
                type: 'select',
                name: 'account_manager_id',
                label: 'Account Manager',
                data_source: 'accountmanagers',
                options: function(success) {
                    console.log('JobAddForm.options', config.clients)

                    if (config.hasOwnProperty('accountmanagers')) {
                        if(config.accountmanagers.length > 0) {
                            success();
                            return false;
                        }
                    }
                    AccountManagerAddForm.loadAllAccountManagers(success);                                     
                }
            }

        ];
    }
}