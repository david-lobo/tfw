import {DeleteForm} from '../DeleteForm';

export class QuestionDeleteForm extends DeleteForm {
    constructor(endpoint) {

        super('#deleteDialog', 'question', endpoint, 'DELETE', QuestionDeleteForm.getFields());
    }

    static getFields() {
        return [{
                type: 'hidden',
                name: 'id'
        }];
    }
}