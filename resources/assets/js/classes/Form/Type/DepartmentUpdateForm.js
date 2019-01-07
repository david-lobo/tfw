import {UpdateForm} from '../UpdateForm';
import {DepartmentAddForm} from './DepartmentAddForm';

export class DepartmentUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'department', endpoint, 'PUT', DepartmentAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }
}