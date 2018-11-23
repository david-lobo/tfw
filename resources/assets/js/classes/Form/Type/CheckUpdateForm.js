import {UpdateForm} from '../UpdateForm';
import {CheckAddForm} from './CheckAddForm';

export class CheckUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'check', endpoint, 'PUT', CheckAddForm.getFields());
    }

    initDialog() {
        super.initDialog();

        let dropdown = $(this.selector).find('.answer-select').selectpicker({width: '100%'});
    }
}