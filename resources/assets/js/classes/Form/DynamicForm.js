import {CheckUpdateForm} from './Type/CheckUpdateForm';
import {CheckDeleteForm} from './Type/CheckDeleteForm';
import {CheckAddForm} from './Type/CheckAddForm';
import {QuestionAddForm} from './Type/QuestionAddForm';
import {QuestionDeleteForm} from './Type/QuestionDeleteForm';
import {QuestionUpdateForm} from './Type/QuestionUpdateForm';
import {DepartmentAddForm} from './Type/DepartmentAddForm';
import {DepartmentDeleteForm} from './Type/DepartmentDeleteForm';
import {DepartmentUpdateForm} from './Type/DepartmentUpdateForm';

import {ClientAddForm} from './Type/ClientAddForm';
import {ClientDeleteForm} from './Type/ClientDeleteForm';
import {ClientUpdateForm} from './Type/ClientUpdateForm';

import {AccountManagerAddForm} from './Type/AccountManagerAddForm';
import {AccountManagerDeleteForm} from './Type/AccountManagerDeleteForm';
import {AccountManagerUpdateForm} from './Type/AccountManagerUpdateForm';

import {CategoryAddForm} from './Type/CategoryAddForm';
import {CategoryUpdateForm} from './Type/CategoryUpdateForm';
import {CategoryDeleteForm} from './Type/CategoryDeleteForm';

import {JobAddForm} from './Type/JobAddForm';
import {JobUpdateForm} from './Type/JobUpdateForm';
import {JobDeleteForm} from './Type/JobDeleteForm';

export class DynamicForm {
    constructor (className, params) {

        const classes = {
            CheckUpdateForm,
            CheckDeleteForm,
            CheckAddForm,
            QuestionUpdateForm,
            QuestionDeleteForm,
            QuestionAddForm,
            DepartmentAddForm,
            DepartmentDeleteForm,
            DepartmentUpdateForm,
            CategoryAddForm,
            CategoryDeleteForm,
            CategoryUpdateForm,
            JobAddForm,
            JobDeleteForm,
            JobUpdateForm,
            ClientAddForm,
            ClientDeleteForm,
            ClientUpdateForm,
            AccountManagerAddForm,
            AccountManagerDeleteForm,
            AccountManagerUpdateForm,
        };
        
        return new classes[className](params)
    }
}    