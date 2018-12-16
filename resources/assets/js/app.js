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
import {CheckAddForm} from './classes/Form/Type/CheckAddForm';

let app;

class App {
    constructor() {
        /*this.data = {
            question: {id: 4}
        },*/
        //this.trees = [];
        /*this.endpoints = {
            question: "/d5-api/questions",
            question_all: "/d5-api/questions/all",
            category: "/d5-api/categories",
            category_all: "/d5-api/categories/all",
            item: "/d5-api/items"
        },*/
        this.page    
    }

    init() {
        let page;
        if (config.hasOwnProperty('route')) {
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
                page = new ChecklistPage(config.routes, config.job);  
            } else if (config.route === 'jobs') {
                page = new JobPage(config.routes);  
            } else if (config.route === 'clients') {
                page = new ClientPage(config.routes);  
            } else if (config.route === 'accountmanagers') {
                page = new AccountManagerPage(config.routes);  
            }

            config.page = page;

            if (undefined !== page) {
                config.page.init();
            }

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
            that.initFilters();
            that.initAjaxForms();
            that.initUIList();

            that.initUI();
            
        });
        });


        //this.loadAllCategories();
        
        //this.loadAllQuestions();
        ///this.syncData();
        //this.initModalForms(this.questionsAll);
        //this.initModalForms();
    }

    initUI() {

    }

    initFilters() {

    }

    loadAllCategories(callback) {
        $.get(config.routes['categories.all'], function (data) {
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

    loadAllAccountManagers(callback) {
        $.get(config.routes.accountmanagers, function (data) {
            config.accountmanagers = data;
            callback();
        });
    }

    initAjaxForms() {
        let deleteName = capitalize(this.entity) + 'DeleteForm';
        let updateName = capitalize(this.entity) + 'UpdateForm';
        let addName = capitalize(this.entity) + 'AddForm';
        //let deleteForm = new classes[x];
        
        // Form endpoits assigned here
        let url = [this.endpoints[this.entity]];
        let addUrl = url;
        let deleteUrl = url;
        let updateUrl = url;
        if (this.endpoints.hasOwnProperty(this.entity + '.add')) {
            addUrl = this.endpoints[this.entity + '.add'];
        }
        if (this.endpoints.hasOwnProperty(this.entity + '.delete')) {
            deleteUrl = this.endpoints[this.entity + '.delete'];
        }
        if (this.endpoints.hasOwnProperty(this.entity + '.update')) {
            updateUrl = this.endpoints[this.entity + '.update'];
        }
        let deleteForm = new DynamicForm(deleteName, deleteUrl);
        let updateForm = new DynamicForm(updateName, updateUrl);
        let addForm = new DynamicForm(addName, addUrl);
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
        
        console.log('initGrids', gridName, this.endpoints[this.entity], this.entity);
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

    initFilters() {
        let departments = CheckAddForm.getDepartmentOptions();
        let dropdownId = '#departmentDropdown';
        console.log('initFilters', departments, config.departments);

        $(departments).each(function(i, v) {
            console.log(v);
            let option = document.createElement('option');
            $(option).val(v.value).html(v.label);
            $(dropdownId).append(option);
        });

        $(dropdownId).selectpicker();

        config.selectedDepartment = $(dropdownId).val();

        $(dropdownId).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
          // do something...
          //console.log('department changed',e, clickedIndex, isSelected, previousValue);
          config.selectedDepartment = $(dropdownId).val();
          console.log('department changed', config.selectedDepartment);
          config.page.grids['check'].reload();
        });
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

class ClientPage extends ListPage {
    constructor(endpoints) {
        super('client', endpoints);
    }

    init() {
        super.init();
    }

    initUIList() {
        this.initGrids();
    }
}

class AccountManagerPage extends ListPage {
    constructor(endpoints) {
        super('accountManager', endpoints);
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

    static viewChecklist(event) {

        let that = this;
        return function (event) {
            //console.log('viewSubQuestions', event);
            let entity = event.data.record;
            var newURL = config.routes.checklist.replace("ID", entity.id);
            //let newURL = config.routes.checklist + '/' + entity.id;
            window.location = newURL;
        }
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
            console.log('viewSubQuestions', event.data.record);
            let entity = event.data.record;
            let newURL = config.routes['subquestions'] + '/' + entity.id;
            //let newURL = config.routes['web.subquestions'].replace('ID', entity.id);
            //newURL = config.routes.subquestions.replace('PARENT_ID', entity.parent.id)
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
        //config.routes.subquestions.replace('ID', questionId)
        questionId = config.question.id;
        tree = new QuestionTree($('#questions'), 'question', config.routes.subquestions.replace('ID', questionId));
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

        console.log('grid', this.el);

        //console.log('gridConfig', gridConfig);

        if (undefined !== config.page.forms && undefined !== config.page.forms['add']) {
            let addForm = config.page.forms['add'];
            let fn = addForm.showModal()
            let data = {};

            if (undefined !== config.question) {
                data.record = {question_id: config.question.id};
            }
            $('.toolbar .add').on('click', data, fn);
        }
        this.bindRowDataChanged();
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

    rowDataChangedCallback(entity) {
        return function (e, $row, id, record) {
            console.log('rowDataChangedCallback');
            //let gridUI, grid;
            //gridUI = config.page.getGrids()[entity];
            //grid = gridUI.getGrid();
            //gridUI.setSelectedId(id);

        }
    }

    bindSelect() {
        this.grid.on('rowSelect', this.selectCallback(this.entity));
        //

    }

    bindRowDataChanged() {
        //this.grid.on('initialized', function(){console.log('test123');});;


    }
}

class CheckGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        let query = super.reloadQuery();
        //let selected = $('departmentDropdown').selectpicker('val');
        if (config.hasOwnProperty('selectedDepartment')) {
           query.department = config.selectedDepartment; 
        }
        console.log('CheckGrid.reloadQuery', query);
        return query;
        
        
    }

    getAJAXConfig() {
        let conf = super.getAJAXConfig();
        console.log('CheckGrid', config, conf);
        if (undefined !== config.question) {
            //config.url += '/' + config.question.id;
            conf.url = conf.url.replace('ID', config.question.id);
        }

        if (config.hasOwnProperty('selectedDepartment')) {
            if (!conf.hasOwnProperty('data')) {
                conf.data = {department: config.selectedDepartment};
            }
            //conf.data.department = config.selectedDepartment;
            //conf.data.department = 1;
           //query.department = config.selectedDepartment; 
        }
        return conf;
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
            rowReorder: true,
            rowReorderColumn: 'id',
            orderNumberField: 'priority',
            //grouping: { groupBy: 'department' },

            initialized: function(e) {
                console.log('grid is initialize');

            },

            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false,               
                events: {
                 'mousedown': function (e) {
                     e.stopPropagation();
                     //$(e.currentTarget).css('background-color', 'red');
                     console.log('mousedown', e);
                     $(e.currentTarget).parent().attr('data-drag-status', 'mousedown');
                 },
                'mouseup': function (e) {
                     e.stopPropagation();
                     //$(e.currentTarget).css('background-color', 'red');
                     console.log('mouseup', e)
                 },
                 'mouseleave': function (e) {
                     e.stopPropagation();
                     //$(e.currentTarget).css('background-color', '');
                     

                     let currentStatus = $(e.currentTarget).parent().attr('data-drag-status');

                     console.log('mouseleave-currentStatus', currentStatus);

                    if (currentStatus === 'mousedown') {
                        //let currentPosition = $( "tr" ).index($(e.currentTarget).parent());
                        //let prevPosition = $(e.currentTarget).parent().attr('data-position');
                        
                         $(e.currentTarget).parent().attr('data-drag-status', 'mouseleave');
                         //$(e.currentTarget).parent().attr('data-prev-position', prevPosition);
                        //console.log('prevPosition', prevPosition);
                        //console.log('currentPosition', currentPosition);

                         //let data = config.page.grids['check'].grid.get(prevPosition);

                    } else if (currentStatus === 'mouseleave') {
                        //$(e.currentTarget).parent().attr('data-drag-status', 'mouseleft');
                        $(e.currentTarget).parent().removeAttr('data-drag-status');
                        let data = config.page.grids['check'].grid.getAll();
                        let post = [];
                        $(data).each(function(i, v) {
                            let record = {};
                            record.name = 'checks[' + v.id + ']';
                            record.value = v.priority;
                            post.push(record);
                        });
                        CheckGrid.postCheckReorders(post);
                    }
                 }
               }
                },
                    { field: 'content', title: 'Content' },
                    { field: 'priority', title: 'Priority' },
                    { field: 'answer', title: 'Answer', renderer: function (value, record) { return record.answer === 1 ? 'Yes' : 'No'; }},
                    { field: 'department', title: 'Department', renderer: function (value, record) { return record.department.title; }},
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            //pager: { limit: 5 }
        }
    }

    static postCheckReorders(data) {
        console.log('checkReorders', data, config.routes['check.reorder']);

        $.ajax({
          url: config.routes['check.reorder'],
          type: 'PUT',
          data: data,
          success: function(data) {
            //config.page.getJob();
            //config.page.getChecklist();
            toastr.success('Checks order saved');
          },
          error: function(response) {
            let json = response.responseJSON;
            let msg = 'There was an error';
            if (json.hasOwnProperty('data') && json.data.hasOwnProperty('questions')) {
                msg = json['data']['questions'][0];
            } else if (response && response.statusText && response.statusText !== 'abort') {
                msg = response.statusText;
            }
            toastr.error(msg);
          }
        });


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
            headerFilter: true,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: true, filterable: true },
                    { field: 'content', title: 'Content', filterable: true },
                    { field: 'category', title: 'Category', filterable: true, renderer: function (value, record) { return record.category.title; }},
                    { title: '', field: 'Detail', filterable: false, width: 42, type: 'icon', icon: 'fa fa-tasks', tooltip: 'Detail', events: { 'click': QuestionPage.viewSubQuestions() } },
                    { title: '', field: 'Edit', filterable: false, width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', filterable: false, width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            pager: { limit: 10, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
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
            pager: { limit: 10, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
        }
    }
}

class ClientGrid extends GridUI {
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
            pager: { limit: 10, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
        }
    }
}

class AccountManagerGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    getGridConfig() {

        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];
        let dataSource = this.getAJAXConfig();
        
        console.log('dataSource', dataSource);
        return {
            //width: 900,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: dataSource,
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: false },
                    { field: 'title', title: 'Title' },
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            pager: { limit: 10, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
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
            pager: { limit: 10, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
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
                    { field: 'category', title: 'Category', filterable: true, renderer: function (value, record) { return record.category.title; }},
                    { field: 'client', title: 'Client', filterable: false, renderer: function (value, record) { return record.client.title; }},
                    { field: 'account_manager', title: 'Account Manager', filterable: false, renderer: function (value, record) { return record.account_manager.title; }},
                    { title: '', field: 'Detail', width: 42, type: 'icon', icon: 'fa fa-tasks', tooltip: 'Detail', events: { 'click': JobPage.viewChecklist() } },
                    { title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    { title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            pager: { limit: 10, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
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
            JobGrid,
            ClientGrid,
            AccountManagerGrid
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


    reloadCallback(entity) {
        return function (jqXHR, textStatus) {

            console.log('QuestionSelectGrid reloaded', config.job);

            
        if (config.job.question !== null) {
        let rows = $('table#questionGrid tr');

        let x = rows.filter(function () {
            return $(this).children(':eq(0)').text() == config.job.question.id;
        })

        $(x).find('button').removeClass('btn-primary').addClass('btn-success').prop( "disabled", true );;

            console.log('filterCols', x, "" + config.job.question.id);
            }
        }
    }

    getGridConfig() {
        let ajaxConfig = this.getAJAXConfig();
        let url = ajaxConfig.url;
        let categoryUrl = url += '?category_id=' + config.job.category.id;
        ajaxConfig.url = categoryUrl;

        console.log('QuestionSelectGrid.getGridConfig',categoryUrl , ajaxConfig, config.job);
        return {
            headerFilter: true,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: ajaxConfig,
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: true, filterable: true },
                    { field: 'content', title: 'Content', sortable: true, filterable: true },
                    //{ field: 'category', title: 'Category', filterable: true, renderer: function (value, record) { return record.category.title; }},
                    { title: '', field: 'Yes', filterable: false, width: 100, tmpl: '<button class="btn btn-primary">Select</button>', tooltip: 'Select', events: { 'click': this.questionSelected() } },
                    //{ title: '', field: 'Edit', width: 42, type: 'icon', icon: 'fa fa-pencil', tooltip: 'Edit', events: { 'click': updateForm.showModal() } },
                    //{ title: '', field: 'Delete', width: 42, type: 'icon', icon: 'fa fa-remove', tooltip: 'Delete', events: { 'click': deleteForm.showModal() } }
                ],
            pager: { limit: 3, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
        }
    }

    questionSelected(event) {
        let that = this;
        return function (event) {
            console.log('questionSelected', event.target);
            if ($(event.target).hasClass('btn-success')) {
                return false;
            }
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
    constructor(endpoints, job) {
        this.endpoints = endpoints;
        this.checklist;
        this.grids = [];
        this.questions = [];
        this.job = job;
    }

    init() {



        /*$('#testButton').on('click', function(){
            console.log('testButtons');
            $('#collapseOneCLA').collapse('hide');
            //$('#viewTab li:nth-child(1) a').tab('show'); 
        });*/

        this.bindEvents()

        //console.log('init ChecklistPage', '#questionGrid', 'question', config.routes.question);
        let grid = new QuestionSelectGrid($('#questionGrid'), 'question', config.routes.question);
        grid.init();

        this.grids['checklist'] = grid;

        let that = this;
        that.loadAllDepartments(function() {
            that.getJob();
            that.getChecklist(true);
        });
    }

    loadAllDepartments(callback) {
        /*$.get(config.routes.department, function (data) {
            config.departments = data;
            callback();
        });*/

        let success = function (data) {
            config.departments = data.data;
            callback !== undefined ? callback() : false;
            $( document ).trigger( "departments_updated", [ "bim", "baz" ] );
        };

        $.ajax({
            url: config.routes.department, 
            success: success, 
            cache: false
        });

    }

    bindEvents() {
        let that = this;
        $( document ).on( "departments_updated", {
            foo: "bar"
        }, function( event, arg1, arg2 ) {
            console.log("departments_updated called");
            console.log( event.data.foo ); // "bar"
            console.log( arg1 );           // "bim"
            console.log( arg2 );           // "baz"

            that.updateJobSummaryView();
            that.updateNotesView(that);
        });


        $( document ).on( "job_updated", {
            foo: "bar"
        }, function( event, arg1, arg2 ) {
            console.log("job_updated called");
            console.log( event.data.foo ); // "bar"
            console.log( arg1 );           // "bim"
            console.log( arg2 );           // "baz"

            that.updateJobDetailsView();
            that.updateJobSummaryView();
            that.updateNotesView(that);
            
        });

        $( document ).on( "checklist_updated", {
            foo: "bar"
        }, function( event, arg1, arg2 ) {
            console.log("checklist_updated called");
            console.log( event.data.foo ); // "bar"
            console.log( arg1 );           // "bim"
            console.log( arg2 );           // "baz"

            that.updateChecklistButtonsView(that);
            that.grids['checklist'].grid.reload();


            //that.getJob();
        });
    }

    updateNotesView(that) {
        
        let indexed = {};

        $(config.job.notes).each(function(i, v) {
            indexed[v.department.id] = v;
        });
        console.log('updateNotesView', config.departments, indexed);
        $('#accordion').empty();

        $(config.departments).each(function(i, v) {
            let formMethod = '';
            let saveFormMethod = 'POST';
            let note = {content: '', id: ''};
            if (indexed.hasOwnProperty(v.id)) {
                //console.log('indexed', indexed[v.id])
                note = indexed[v.id];
                saveFormMethod = 'PUT';
            }
            let noteId = note.id;
            let template = $('#mustacheTemplate_notes_card').html();
            let html = Mustache.to_html(template, {
                department: v,
                note: note,
                job: config.job,
                save_form_method: saveFormMethod
                //step_title: stepTitle,
                //step_description: stepDescription
            });
            let newEl = $(html);

            $('#accordion').append(newEl); 

            if (note.id !== '') {
                $('#collapse' + v.id).find('button.delete').removeClass('d-none');
            } 

            $('#collapse' + v.id).find('button.save').removeClass('d-none');
        });
        that.bindNotesButtons(that);
    }

    bindNotesButtons(that) {
        $('#accordion')

        $( "#accordion form" ).submit(function( event ) {
         
          // Stop form from submitting normally
          event.preventDefault();

          console.log('form submit', event);
          // Get some values from elements on the page:
          let form = $(this),
            noteId = form.find( 'input[name="note_id"]' ).val(),
            method = form.attr("method"),
            fields = form.serialize(),
            url = that.endpoints['notes.update'].replace('ID', noteId);

            if (method === 'POST') {
                url = that.endpoints['notes.index'];
            }

            $.ajax({
              url: url,
              type: method,
              data: fields,
              success: function(data) {
                console.log( "Data Loaded: " + data );
                //config.page.getJob();
                //config.page.getChecklist();
                toastr.success(data.message);
                config.page.getJob();
              },
              error: function(response) {
                let json = response.responseJSON;
                let msg = 'There was an error';
                if (json.hasOwnProperty('data') /*&& json.data.hasOwnProperty('questions')*/) {
                    var idx = 1; // key2

                    var key = Object.keys(json.data)[0];
                    msg = json.data[key]
                    //msg = json['data']['questions'][0];
                } else if (response && response.statusText && response.statusText !== 'abort') {
                    msg = response.statusText;
                }
                toastr.error(msg);
              }
            });

            

        });


    }

    updateChecklistButtonsView(that) {
        console.log('updateChecklistButtonsViewZZ');
        $('.checklist-actions').empty();
        //console.log('updateChecklistButtonsView', config.checklist, isEmpty(config.checklist));
        let elem;
        if (isEmpty(config.checklist)) {
        //<div class="alert alert-info" role="alert">
            elem = document.createElement('div');
            let msg = 'No checks to print';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.checklist-actions').append(elem);
        } else {
            let preview = document.createElement('a');
            let print = document.createElement('a');
            let previewIcon = document.createElement('i');
            let printIcon = document.createElement('i');

            console.log(that.endpoints);

            $(previewIcon).attr('class', 'fa fa-desktop pr-2');
            $(printIcon).attr('class', 'fa fa-print pr-2');
            $(print).append(printIcon);
            $(preview).append(previewIcon);
            $(preview).attr('class', 'btn btn-info mr-1').attr('href', that.endpoints['checklist.view']).attr('target', '_blank').append('Preview');
            $(print).attr('class', 'btn btn-info').attr('href', that.endpoints['checklist.export']).attr('target', '_blank').append('Print PDF');


            $('.checklist-actions').append(preview, print);
        }
    }


    updateJobDetailsView() {
        let list = document.createElement('dl');
        let itemClass = 'list-group-item d-flex justify-content-between align-items-center';
        //let answerYesClass = 'badge badge-success badge-pill';
        //let answerNoClass = 'badge badge-danger badge-pill';
        let elem;
        $(list).attr('class', 'row');

        console.log('updateJobDetailsView', config.job);


        if (isEmpty(config.job)) {
        //<div class="alert alert-info" role="alert">
            elem = document.createElement('div');
            let msg = 'No job found';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.summary').html(elem);
        } else {
            let fields = [];

            /*let jobno = config.job.code;
            let client = config.job.client.title;
            let title = config.job.title;
            let accountManager = config.job.account_manager.title;
            let createdAt = config.job.created_at;*/

            fields.push({title: 'Job No', value: config.job.code});
            fields.push({title: 'Client', value: config.job.client.title});
            fields.push({title: 'Title', value: config.job.title});
            fields.push({title: 'Account Manager', value: config.job.account_manager.title});
            fields.push({title: 'Date', value: config.job.created_at});

            console.log(fields);

            $(fields).each(function(i, v) {
                let itemTitle = document.createElement('dt');
                let itemValue = document.createElement('dd');
                let titleClass = "col-4";
                let valueClass = "col-8";

                $(itemTitle).html(v.title).attr('class', titleClass);
                $(itemValue).html(v.value).attr('class', valueClass);

                $(list).append(itemTitle);
                $(list).append(itemValue);
                /*let item = document.createElement('li');
                let answer = document.createElement('span');
                $(answer).html(v.answer === 0 ? 'No' : 'Yes');
                $(answer).attr('class', v.answer === 0 ? answerNoClass : answerYesClass);
                $(item).attr('class', itemClass);
                $(item).attr('title', 'ttest');
                $(item).html(v.question.content);
                $(item).append(answer);
                $(list).append(item);*/                
            });

            
            $(".details").empty();
            $(".details").append(list);

        }

    }

    updateJobSummaryView() {
        let list = document.createElement('dl');
        let itemClass = 'list-group-item d-flex justify-content-between align-items-center';
        let answerYesClass = 'badge badge-success badge-pill';
        let answerNoClass = 'badge badge-danger badge-pill';
        let elem;
        $(list).attr('class', 'row');

        console.log('updateJobSummaryView', config.job);

        if (isEmpty(config.job.answers)) {
        //<div class="alert alert-info" role="alert">
            elem = document.createElement('div');
            let msg = 'No answers found';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.summary').html(elem);
        } else {
            $(config.job.answers).each(function(i, v) {
                let itemTitle = document.createElement('dt');
                let itemValue = document.createElement('dd');

                let titleClass = "col-4";
                let valueClass = "col-8";

                $(itemTitle).html(v.question.content).attr('class', titleClass);
                $(itemValue).html(v.answer === 0 ? 'No' : 'Yes').attr('class', valueClass);

                $(list).append(itemTitle);
                $(list).append(itemValue);
            });
            $(".summary").empty();
            $(".summary").append(list);
        }
    }


    updateJobSummaryView2() {
        let list = document.createElement('ul');
        let itemClass = 'list-group-item d-flex justify-content-between align-items-center';
        let answerYesClass = 'badge badge-success badge-pill';
        let answerNoClass = 'badge badge-danger badge-pill';
        let elem;
        $(list).attr('class', 'list-group my-3');

        console.log('updateJobSummaryView', config.job);


        if (isEmpty(config.job.answers)) {
        //<div class="alert alert-info" role="alert">
            elem = document.createElement('div');
            let msg = 'No answers found';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.summary').html(elem);
        } else {
            $(config.job.answers).each(function(i, v) {
                let item = document.createElement('li');
                let answer = document.createElement('span');
                $(answer).html(v.answer === 0 ? 'No' : 'Yes');
                $(answer).attr('class', v.answer === 0 ? answerNoClass : answerYesClass);
                $(item).attr('class', itemClass);
                $(item).attr('title', 'ttest');
                $(item).html(v.question.content);
                $(item).append(answer);
                $(list).append(item);
            });
            $(".summary").empty();
            $(".summary").append(list);

        }

    }

    getJob() {
        //console.log('CheckList.getSubQuestions');
        let endpoint = this.endpoints['jobs.show'].replace('ID', this.job.id);
        $.get(endpoint, function (data) {
            config.job = data;
            //callback();
            console.log('getJob', config.job);
            $( document ).trigger( "job_updated", [ "bim", "baz" ] );
        });
    }

    getChecklist(triggerUpdate = true) {
        //console.log('CheckList.getSubQuestions');
        let endpoint = this.endpoints['jobs.checklist'].replace('ID', this.job.id);
        $.get(endpoint, function (data) {
            config.checklist = data;
            //callback();
            console.log('getChecklist', config.checklist);
            if (triggerUpdate) {
                $( document ).trigger( "checklist_updated", [ "bim", "baz" ] );
            }
        });
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
        $('#editTab li:nth-child(2) a').tab('show'); // Select third tab

        //$('#nav-tab a[href="#nav-profile"]').tab('show') // Select tab by name
        ////$('#exampleModal').modal({});

              // Initialize the leaveStep event
      $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
         //console.log('leaveStep', e, anchorObject, stepNumber, stepDirection);
                var elmFormId = "#step-" + (stepNumber + 1);
                // stepDirection === 'forward' :- this condition allows to do the form validation
                // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
                if(stepDirection === 'forward' && elmFormId){

                    /*elmForm.validator('validate');
                    var elmErr = elmForm.children('.has-error');
                    if(elmErr && elmErr.length > 0){
                        // Form validation failed
                        return false;
                    }*/

                    return CheckList.validateChecklistRadio(elmFormId);
                }

                return true;
      });
    }

    clearTemplates() {
        //$('#smartwizardWrapper').
    }

    static validateChecklistRadio(elmFormId) {
        var radioValue = $(elmFormId).find('input[type="radio"]:checked').val();
        //console.log(elmFormId, radioValue);

        if (undefined === radioValue) {
            $(elmFormId).find('.invalid-feedback').show();
            return false;
        } else {
            $(elmFormId).find('.invalid-feedback').hide();
            return true;
        }
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
            let stepDescription = 'Answer yes or no';
            
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

            let activeStep = $('#smartwizard .step-anchor .nav-item.active a');
            let activeStepId = activeStep.attr('href');
            console.log(activeStep, activeStepId);
            let valid = CheckList.validateChecklistRadio(activeStepId);
            if (!valid) {
                console.log('checklistCompleted.validateChecklistRadio not valid');
                return false;
            }
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
                config.page.getJob();
                config.page.getChecklist(true);

                toastr.success(data.message);

                $('#collapseTwoCLA').collapse('hide');
                $('#collapseOneCLA').collapse('show');
                $('#viewTab li:nth-child(1) a').tab('show');

                ////$('#exampleModal').modal('hide')
              },
              error: function(response) {
                let json = response.responseJSON;
                let msg = 'There was an error';
                if (json.hasOwnProperty('data') && json.data.hasOwnProperty('questions')) {
                    msg = json['data']['questions'][0];
                } else if (response && response.statusText && response.statusText !== 'abort') {
                    msg = response.statusText;
                }
                toastr.error(msg);
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
                enableAnchorOnDoneStep: false // Enable/Disable the done steps navigation
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

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


    //new DynamicClass('ClassOne');
    //new DynamicClass('ClassTwo');