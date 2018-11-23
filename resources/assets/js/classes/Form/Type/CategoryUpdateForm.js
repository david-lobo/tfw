import {UpdateForm} from '../UpdateForm';
import {CategoryAddForm} from './CategoryAddForm';

export class CategoryUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'category', endpoint, 'PUT', CategoryAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
        //let dropdown = $(this.selector).find('.answer-select').selectpicker({width: '100%'});
    }
}