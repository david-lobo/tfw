import {UpdateForm} from '../UpdateForm';
import {AccountManagerAddForm} from './AccountManagerAddForm';

export class AccountManagerUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'accountManager', endpoint, 'PUT', AccountManagerAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
        //let dropdown = $(this.selector).find('.answer-select').selectpicker({width: '100%'});
    }
}