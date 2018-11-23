/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "jquery";
require('bootstrap/dist/js/bootstrap.min');
import Mustache from 'mustache';
import 'gijgo/js/gijgo';
//import gj from 'gijgo/js/gijgo';
//import bootbox from 'bootbox';
import toastr from 'toastr';
require('bootstrap-select');
//require('jquery-steps/build/jquery.steps.js');
require('smartwizard/dist/js/jquery.smartWizard.js');

import {QuestionTree} from './classes/Tree/QuestionTree';
//import {QuestionPage} from './classes/Page/QuestionPage';
//import {SubQuestionPage} from './classes/Page/SubQuestionPage';
import {DynamicForm} from './classes/Form/DynamicForm';

import {CheckUpdateForm} from './classes/Form/Type/CheckUpdateForm';

let app;

class App {
    constructor() {
        /*this.data = {
            question: {id: 4}
        },*/
        //this.trees = [];
        this.endpoints = {
            question: "/d5-api/questions",
            question_all: "/d5-api/questions/all",
            category: "/d5-api/categories",
            category_all: "/d5-api/categories/all",
            item: "/d5-api/items"
        },
        this.page    
    }

    init() {
        let page;
        if (config.route === 'questions') {
            page = new QuestionPage(config.routes);
        } else if (config.route === 'checks' || config.route === 'checks_id') {
            page = new CheckPage(config.routes);  
        } else if (config.route === 'subquestions') {
            page = new SubQuestionPage(config.routes);  
        } else if (config.route === 'departments') {
            page = new DepartmentPage(config.routes);  
        } else if (config.route === 'categories') {
            page = new CategoryPage(config.routes);  
        } else if (config.route === 'checklist') {
            page = new ChecklistPage(config.routes);  
        } else if (config.route === 'jobs') {
            page = new JobPage(config.routes);  
        }

        config.page = page;

        if (undefined !== page) {
            config.page.init();
        }
        
        console.log('App Config', config);
    }
}

class AdminPage {
    constructor(entity, endpoints) {
        this.trees = [];
        this.grids = [];
        //Form.editDialog = null;
        this.deleteDialog = null;
        /*this.endpoints = {
            question: "/d5-api/questions",
            question_all: "/d5-api/questions/all",
            check: "/d5-api/checks",
            check_all: "/d5-api/checks/all",
            category: "/d5-api/categories",
            category_all: "/d5-api/categories/all",
            item: "/d5-api/items"
        },*/
        this.endpoints = endpoints;
        this.modal,
        this.forms = [],
        this.etags = {},
        this.entity = entity
    }

    getTrees() {
        return this.trees;
    }

    getDialog() {
        return this.dialog;
    }

    getGrids() {
        return this.grids;
    }


    getEndpoints() {
        return this.endpoints;
    }

    getForms() {
        return this.forms;
    }

    getModal() {
        return this.modal;
    }

    setModal(modal) {
        this.modal = modal;
    }

    /*loadAllCategories() {
        $.get(this.endpoints.category_all, function (data) {
            config.page.setCategoriesAll(data);
        });
    }

    getCategoriesAll() {
        return this.categoriesAll;
    }

    setCategoriesAll(categories) {
        this.categoriesAll = categories;
    }*/

    init() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        let that = this;
        //console.log('THAT1', that);
        this.loadAllCategories(function() {
            //that.initAjaxForms();
            //that.initUIList();

            that.loadAllDepartments(function() {
           // console.log('THAT2', that);
            that.initAjaxForms();
            that.initUIList();
        });
        });


        //this.loadAllCategories();
        
        //this.loadAllQuestions();
        ///this.syncData();
        //this.initModalForms(this.questionsAll);
        //this.initModalForms();
    }

    loadAllCategories(callback) {

        $.get(config.endpoints.category_all, function (data) {
            config.categories = data;
            callback();
        });
        
    }

    loadAllDepartments(callback) {

        $.get(config.routes.department, function (data) {
            config.departments = data;
            callback();
        });
        
    }

    initAjaxForms() {
        let deleteName = capitalize(this.entity) + 'DeleteForm';
        let updateName = capitalize(this.entity) + 'UpdateForm';
        let addName = capitalize(this.entity) + 'AddForm';
        //let deleteForm = new classes[x];
        let deleteForm = new DynamicForm(deleteName, [this.endpoints[this.entity]]);
        let updateForm = new DynamicForm(updateName, [this.endpoints[this.entity]]);
        let addForm = new DynamicForm(addName, [this.endpoints[this.entity]]);
        //let updateForm = new CheckUpdateForm();
        //let addForm = new CheckAddForm();
        //
        //updateForm.constructor.apply(updateForm, [this.endpoints[this.entity]]);

        this.forms['delete'] = deleteForm;
        this.forms['update'] = updateForm;
        this.forms['add'] = addForm;

        this.testButtons();
    }

    testButtons() {

        let selector, entity, endpoint, method, testData, callback;

        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];
        let addForm = config.page.forms['add'];


        $('#testDelete').on('click', function() {
            console.log('Test Delete');

            deleteForm.showModal({data: {record: {id: '7'}}});

        })

        $('#testEdit').on('click', function() {
            console.log('Test Update');
            testData = {data: {record: {id: '7', content: 'bla bla', answer: '1', question_id: 4}}};
            callback = updateForm.showModal(testData);
            callback(testData);
        })

        $('#testAdd').on('click', function() {
            console.log('Test Add');
            testData = {data: {record: {question_id: 4}}};
            callback = addForm.showModal();
            callback(testData);
        })

        $('#testBuild').on('click', function() {
            console.log('Test Build');
            //type="hidden" data-validation-name="question_id" id="question_id" name="question_id" value="" 
            let fields = [
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
            }
            ];
            let builder = new FormBuilder('#formBuilder', fields);
            builder.build();
        });
    }

    initModalForms(questionsAll) {
        let forms = new ModalForms();
        forms.init();
        this.forms = forms;
    }

    initButtons() {
        $('.crud .btn').prop('disabled', true);
        $('.btn.add').prop('disabled', false);
    }

    reloadAllData() {
        //app.reloadItemTree();
        //app.reloadCategoryTree();
        app.page.reloadQuestionTree();
    }

    syncData() {
        setInterval(function () {
            app.page.reloadCategoryTree();
            app.page.reloadItemTree();
            app.page.loadAllCategories();
        }, 15000)
    }

    startButtonLoader(btn) {
        let loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Saving...';
        if ($(btn).html() !== loadingText) {
            $(btn).attr('data-original-text', $(btn).html());
            $(btn).html(loadingText);
        }
    }

    stopButtonLoader(btn) {
        $(btn).html($(btn).data('original-text'));
    }
}

class ListPage extends AdminPage {
    constructor(entity, endpoints) {
        super(entity, endpoints);
    }
    init () {


        super.init();

        //this.testButtons();
    }

    initGrids() {

       let gridName = capitalize(this.entity) + 'Grid';
        //let deleteForm = new classes[x];
        let grid = new DynamicGrid(gridName);
        
        //console.log('initGrids', gridName, this.endpoints[this.entity], this.entity);
        grid.constructor.apply(grid, [$('#' + this.entity + 'Grid'), this.entity, this.endpoints[this.entity]])
    
        
        //grid = new CheckGrid($('#' + this.entity + 'Grid'), this.entity, this.endpoints[this.entity]);
        grid.init();



        this.grids[grid.getEntity()] = grid;
    }

    /*testButtons() {
        console.log('Test Buttons');
        let selector, entity, endpoint, method, testData, callback;

        let deleteForm = app.page.forms['delete'];
        let updateForm = app.page.forms['update'];
        let addForm = app.page.forms['add'];


        $('#testDelete').on('click', function() {
            console.log('Test Delete');

            deleteForm.showModal({data: {record: {id: '7'}}});

        })

        $('#testEdit').on('click', function() {
            console.log('Test Update');
            testData = {data: {record: {id: '7', content: 'bla bla', answer: '1', question_id: 4}}};
            callback = updateForm.showModal(testData);
            callback(testData);
        })

        $('#testAdd').on('click', function() {
            console.log('Test Add');
            testData = {data: {record: {question_id: 4}}};
            callback = addForm.showModal();
            callback(testData);
        })
    }*/

}


class CheckPage extends ListPage {
    constructor(endpoints) {
        super('check', endpoints);
    }

    init() {
        super.init();
    }

    initUIList() {
        this.initGrids();
    }


}

class DepartmentPage extends ListPage {
    constructor(endpoints) {
        super('department', endpoints);
    }

    init() {
        super.init();
    }

    initUIList() {
        this.initGrids();
    }
}

class CategoryPage extends ListPage {
    constructor(endpoints) {
        super('category', endpoints);
    }

    init() {
        super.init();
    }

    initUIList() {
        this.initGrids();
    }
}

class JobPage extends ListPage {
    constructor(endpoints) {
        super('job', endpoints);
    }

    init() {
        super.init();
    }

    initUIList() {
        this.initGrids();
    }
}

class QuestionPage extends ListPage {
    constructor(endpoints) {
        
        super('question', endpoints);
    }

    init() {
        super.init();

        //this.loadAllCategories(function(){console.log('categories callback')});
    }

    initUIList() {
        this.initGrids();
    }

    static viewSubQuestions(event) {

        let that = this;
        return function (event) {
            //console.log('viewSubQuestions', event);
            let entity = event.data.record;
            let newURL = config.routes.subquestions + '/' + entity.id;
            window.location = newURL;
        }
    }

    /*loadAllCategories(callback) {
        let that = this;
        $.get(config.endpoints.category_all, function (data) {
            config.categories = data;
            callback();
        });
    }*/
}

class SubQuestionPage extends AdminPage {

    constructor(endpoints) {
        super('question', endpoints);
    }

    getQuestionsAll() {
        return this.questionsAll;
    }

    setQuestionsAll(questions) {
        this.questionsAll = questions;
    }

    initUIList() {
        this.initTrees();
    }

    initTrees() {
        let tree, questionId;

        questionId = config.question.id;
        tree = new QuestionTree($('#questions'), 'question', config.routes.subquestions + '/' + questionId);
        tree.init();

        this.trees[tree.getEntity()] = tree;
    }

    reloadQuestionTree() {
        this.trees['question'].reload();
    }

    loadAllQuestions() {
        $.get(this.endpoints.question_all, function (data) {
            app.page.setQuestionsAll(data);
        });
    }
}

class GridUI {
    constructor(el, entity, url) {
        this.el = el;
        this.entity = entity;
        this.url = url;
        this.grid;
        this.selectedId = 0;
        this.selectedEntity = null;
        this.ETag = null;
        this.lastQueryUrl = null;
        this.expanded = {};
        this.dialog = null;
        this.records;
    }

    greet() {
        return `${this.name} says hello.`;
    }

    getGrid() {
        return this.grid;
    }

    getEntity() {
        return this.entity;
    }

    getSelectedId() {
        return this.selectedId;
    }

    getETag() {
        return this.ETag;
    }

    getSelectedEntity() {
        return this.selectedEntity;
    }

    getAJAXConfig() {
        return {
            type: 'GET',
            url: this.url,
            complete: this.reloadCallback(this.entity),
            error: this.errorCallback(this.entity),
        };
    }

    getLastQueryUrl(url) {
        return this.lastQueryUrl;
    }

    setSelectedId(selectedId) {
        this.selectedId = selectedId;
    }

    setSelectedEntity(selectedEntity) {
        this.selectedEntity = selectedEntity;
    }

    setETag(etag) {
        this.ETag = etag;
    }

    setLastQueryUrl(url) {
        this.lastQueryUrl = url;
    }

    init() {

        //console.log('GridUI.init', this.el);
        let gridConfig = this.getGridConfig();
        
        this.grid = this.el.grid(gridConfig);

        if (undefined !== config.page.forms && undefined !== config.page.forms['add']) {
            let addForm = config.page.forms['add'];
            let fn = addForm.showModal();
            let data = {};

            if (undefined !== config.question) {
                data.record = {question_id: config.question.id};
            }
            $('.toolbar .add').on('click', data, fn);
        }

        //this.bindSelect();
        //this.bindUnselect();
        //this.bindExpand();
        //this.initDialog();
    }

    reloadQuery() {
        return {};
    }

    reload() {
        let query = this.reloadQuery();
        this.grid.reload(query);
    }

    reloadCallback(entity) {
        return function (jqXHR, textStatus) {
        }
    }

    errorCallback(entity) {
        var $widget = this;
        return function (response) {
            if (response && response.statusText && response.statusText !== 'abort') {
                toastr.error(response.statusText);
            }
        };
    }



    selectCallback(entity) {
        return function (e, $row, id, record) {
            let gridUI, grid;
            gridUI = config.page.getGrids()[entity];
            grid = gridUI.getGrid();
            gridUI.setSelectedId(id);

        }
    }

    bindSelect() {
        this.grid.on('rowSelect', this.selectCallback(this.entity));
        //

    }
}

class CheckGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getAJAXConfig() {
        let config = super.getAJAXConfig();
        if (undefined !== config.question) {
            config.url += '/' + config.question.id;
        }
        return config;
    }

    getGridConfig() {
        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];

        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'content', title: 'Content' },
                    { field: 'answer', title: 'Answer', renderer: function (value, record) { return record.answer === 1 ? 'Yes' : 'No'; }},
                    { field: 'department', title: 'Department', renderer: function (value, record) { return record.department.title; }},
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }
}

class QuestionGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getGridConfig() {

        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];

        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'content', title: 'Content' },
                    { field: 'category', title: 'Category', renderer: function (value, record) { return record.category.title; }},
                    { title: '', field: 'Detail', width: 42, type: 'icon', icon: 'fa fa-tasks', tooltip: 'Detail', events: { 'click': QuestionPage.viewSubQuestions() } },
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }
}

class DepartmentGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getGridConfig() {

        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];

        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'title', title: 'Title' },
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }
}

class CategoryGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getGridConfig() {

        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];

        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'title', title: 'Title' },
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }
}

class JobGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getGridConfig() {

        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];

        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'code', title: 'Job No' },
                    { field: 'title', title: 'Title' },
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }
}

class DynamicGrid {
    constructor (className) {
        const classes = {
            QuestionGrid,
            CheckGrid,
            DepartmentGrid,
            CategoryGrid,
            JobGrid
        };

        return new classes[className];
    }
}  

class QuestionSelectGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
        config['questions'] = [];
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getGridConfig() {

        //let deleteForm = config.page.forms['delete'];
        //let updateForm = config.page.forms['update'];

        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'content', title: 'Content' },
                    { field: 'category', title: 'Category', renderer: function (value, record) { return record.category.title; }},
                    { title: '', field: 'Yes', width: 100, tmpl: '<button class="btn btn-primary">Select</button>', tooltip: 'Detail', events: { 'click': this.questionSelected() } },
                    //{ title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    //{ title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }

    questionSelected(event) {
        let that = this;
        return function (event) {

            //console.log('ChecklistPage.questionSelected', that.entity);
            $.get(that.url + '/' + event.data.record.id, function (data) {
                //config.categories = data;
                //callback();
                config.questions[event.data.record.id] = data.data;
                config.page.checklist = new CheckList(data.data, config.routes);
                config.page.checklist.init();

            });
        }
    }

} 

class ChecklistPage {
    constructor(endpoints) {
        this.endpoints = endpoints;
        this.checklist;
        this.grids = [];
        this.questions = [];
    }

    init() {
        //console.log('init ChecklistPage', '#questionGrid', 'question', config.routes.question);
        let grid = new QuestionSelectGrid($('#questionGrid'), 'question', config.routes.question);
        grid.init();

        this.grids['checklist'] = grid;
    }
} 

class CheckList {
    constructor(question, endpoints) {
        this.question = question;
        this.endpoints = endpoints;
    }

    init() {
        //console.log('Checklist.init', this.question, this.endpoints);
        //this.getSubQuestions();
        this.initSteps();
    }

    initSteps() {
        //$('#smartwizard').smartWizard();
        this.buildTemplate();
        let config = this.getConfig();
        $('#smartwizard').smartWizard(config);

              // Initialize the leaveStep event
      $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
         //console.log('leaveStep', e, anchorObject, stepNumber, stepDirection);
                var elmFormId = "#step-" + (stepNumber + 1);
                // stepDirection === 'forward' :- this condition allows to do the form validation
                // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
                if(stepDirection === 'forward' && elmFormId){
                    var radioValue = $(elmFormId).find('input[type="radio"]:checked').val();
                    //console.log(elmFormId, radioValue);

                    if (undefined === radioValue) {
                        $(elmFormId).find('.invalid-feedback').show();
                        return false;
                    }

                    $(elmFormId).find('.invalid-feedback').hide();
                    /*elmForm.validator('validate');
                    var elmErr = elmForm.children('.has-error');
                    if(elmErr && elmErr.length > 0){
                        // Form validation failed
                        return false;
                    }*/
                }

                return true;
      });
    }

    clearTemplates() {
        //$('#smartwizardWrapper').
    }

    buildTemplate() {
        $('.wizard').empty();
        let q = Object.assign({}, this.question);
        
        let subquestions = flatten(q);
        let list =  document.createElement("ul");
        let html, newEl, content;
        //form = document.createElement('form');
        content = document.createElement('div');
        $(content).attr('class', 'checklist-steps');
        //$(form).attr('class', 'checklist').attr('method', 'POST');

        $(subquestions).each(function(i, v) {
            let stepId = 'step-' + (i + 1);
            let stepTitle = 'Step ' + (i + 1);
            let stepDescription = 'Step Description goes here';
            
            let template = $('#mustacheTemplate_wizard_item').html();
            html = Mustache.to_html(template, {
                step_id: stepId,
                step_title: stepTitle,
                step_description: stepDescription
            });
            newEl = $(html);
            $(list).append(newEl);

            template = $('#mustacheTemplate_wizard_content').html();
            stepDescription = v.content;
            html = Mustache.to_html(template, {
                step_id: stepId,
                step_content: stepDescription,
                question_id: v.id
            });
            newEl = $(html);
            $(content).append(newEl);
            //$(form).append(newEl);

        });
        //$(content).append(form);
        //console.log('flatten', list);
        let wrapper =  document.createElement("div");
        $(wrapper).attr('id', 'smartwizard');
        $(wrapper).append(list, content);
        $('.wizard').append(wrapper);
        //$('#smartwizard').html($('#smartwizardWrapper').children().clone());
    }

    getSubQuestions() {
        //console.log('CheckList.getSubQuestions');
        $.get(this.endpoints.question + '/' + this.question.id, function (data) {
            config.categories = data;
            //callback();
        });

    }

    checklistCompleted(data) {
        let that = this;
        return function (data) {
            //console.log('Checklist.checklistCompleted', data);
            let checklist = data.data.checklist;
            let fields = $( ".wizard :input" ).serializeArray();
            //let fields = [];
            //fields['question_id'] = checklist.question.id;
            let question = {name: 'question_id', value: checklist.question.id};
            let job = {name: 'job_id', value: config.job.id};
            fields.push(question);
            fields.push(job);

            console.log('fields', fields, that.endpoints);

            $.ajax({
              url: that.endpoints['jobs.answers.update'],
              type: 'PUT',
              data: fields,
              success: function(data) {
                console.log( "Data Loaded: " + data );
              }
            });
        }
    }

    getConfig() {
        let that = this;
        return {
            selected: 0,  // Initial selected step, 0 = first step 
            keyNavigation:true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
            autoAdjustHeight:true, // Automatically adjust content height
            cycleSteps: false, // Allows to cycle the navigation of steps
            backButtonSupport: true, // Enable the back button support
            useURLhash: false, // Enable selection of the step based on url hash
            showStepURLhash: false,
            lang: {  // Language variables
                next: 'Next', 
                previous: 'Previous'
            },
            toolbarSettings: {
                toolbarPosition: 'bottom', // none, top, bottom, both
                toolbarButtonPosition: 'right', // left, right
                showNextButton: true, // show/hide a Next button
                showPreviousButton: true, // show/hide a Previous button
                toolbarExtraButtons: [
            $('<button></button>').text('Finish')
                          .addClass('btn btn-info')
                          .on('click', {test: '123', checklist: that}, this.checklistCompleted()),
            $('<button></button>').text('Cancel')
                          .addClass('btn btn-danger')
                          .on('click', function(){ 
                        alert('Cancel button click');                            
                          })
                      ]
            }, 
            anchorSettings: {
                anchorClickable: true, // Enable/Disable anchor navigation
                enableAllAnchors: false, // Activates all anchors clickable all times
                markDoneStep: true, // add done css
                enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
            },            
            contentURL: null, // content url, Enables Ajax content loading. can set as data data-content-url on anchor
            disabledSteps: [],    // Array Steps disabled
            errorSteps: [],    // Highlight step with errors
            theme: 'dots',
            transitionEffect: 'fade', // Effect on navigation, none/slide/fade
            transitionSpeed: '400'
      };
    }
}


$(document).ready(function () {

    app = new App();
    app.init();

    //$('#dropdown').dropdown({ uiLibrary: 'bootstrap4', width: 300 });
    //$('.selectpicker').selectpicker();
});

const flatten = function(obj) {
  const array = Array.isArray(obj) ? obj : [obj];
  return array.reduce(function(acc, value) {
    acc.push(value);
    if (value.childs) {
      acc = acc.concat(flatten(value.childs));
      delete value.childs;
    }
    return acc;
  }, []);
}


    //new DynamicClass('ClassOne');
    //new DynamicClass('ClassTwo');