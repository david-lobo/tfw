import {UpdateForm} from '../UpdateForm';
import {JobAddForm} from './JobAddForm';

export class JobUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'job', endpoint, 'PUT', JobAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }
}