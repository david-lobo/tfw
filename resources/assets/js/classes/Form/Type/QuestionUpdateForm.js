import {UpdateForm} from '../UpdateForm';
import {QuestionAddForm} from './QuestionAddForm';

export class QuestionUpdateForm extends UpdateForm {
    constructor(endpoint) {
        super('#updateDialog', 'question', endpoint, 'PUT', QuestionAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }
}