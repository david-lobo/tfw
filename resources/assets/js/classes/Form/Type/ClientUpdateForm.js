import {UpdateForm} from '../UpdateForm';
import {ClientAddForm} from './ClientAddForm';

export class ClientUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'client', endpoint, 'PUT', ClientAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
        //let dropdown = $(this.selector).find('.answer-select').selectpicker({width: '100%'});
    }
}