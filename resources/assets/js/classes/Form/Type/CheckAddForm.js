import {UpdateForm} from '../UpdateForm';

export class CheckAddForm extends UpdateForm {
    constructor(endpoint) {
        super('#addDialog', 'check', endpoint, 'POST', CheckAddForm.getFields());
    }

    initDialog() {
        super.initDialog();

        let dropdown = $(this.selector).find('.answer-select').selectpicker({width: '100%'});
    }

    static getDepartmentOptions() {
        console.log('getDepartmentOptions', config.departments);
        let options = [];
        $(config.departments).each(function(i, v) {
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
                name: 'question_id'
            },
            {
                type: 'hidden',
                name: 'id'
            },
            {
                type: 'textarea',
                name: 'content',
                label: 'Content'
            },
            {
                type: 'select',
                name: 'answer',
                label: 'Answer',
                options: [
                    {
                        label: 'Yes',
                        value: 1
                    },
                    {
                        label: 'No',
                        value: 0
                    }
                ]
            },
            {
                type: 'select',
                name: 'department_id',
                label: 'Department',
                options: CheckAddForm.getDepartmentOptions()
            }
        ];
    }
}