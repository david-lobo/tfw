import {UpdateForm} from '../UpdateForm';
import {CategoryAddForm} from './CategoryAddForm';

export class CategoryUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'category', endpoint, 'PUT', CategoryAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }
}