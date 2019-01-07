import {UpdateForm} from '../UpdateForm';

export class QuestionAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'question', endpoint, 'POST', QuestionAddForm.getFields());
    }

    initDialog() {
        super.initDialog();
    }

    static getCategoryOptions() {
    	let options = [];
    	$(config.categories).each(function(i, v) {
    		let option = {
    			label: v.title,
    			value: v.id
    		}
    		options.push(option);
    	});
    	return options;
    }

    static getFields() {
        return [
            {
                type: 'hidden',
                name: 'id'
            },
            {
                type: 'hidden',
                name: 'parent_id'
            },
            {
                type: 'textarea',
                name: 'content',
                label: 'Content'
            },
            {
                type: 'select',
                name: 'category_id',
                label: 'Category',
                options: QuestionAddForm.getCategoryOptions()
            }
        ];
    }
}