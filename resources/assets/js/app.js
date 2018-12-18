/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "jquery";
require('bootstrap/dist/js/bootstrap.min');
import Mustache from 'mustache';
import 'gijgo/js/gijgo';
import toastr from 'toastr';
require('bootstrap-select');
require('smartwizard/dist/js/jquery.smartWizard.js');
import {QuestionTree} from './classes/Tree/QuestionTree';
import {DynamicForm} from './classes/Form/DynamicForm';
import {CheckUpdateForm} from './classes/Form/Type/CheckUpdateForm';
import {CheckAddForm} from './classes/Form/Type/CheckAddForm';

let app;

class App {
    constructor() {
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
    }
}

class AdminPage {
    constructor(entity, endpoints) {
        this.trees = [];
        this.grids = [];
        this.deleteDialog = null;
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

    init() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        let that = this;
        this.loadAllCategories(function() {
            that.loadAllDepartments(function() {
            that.initFilters();
            that.initAjaxForms();
            that.initUIList();
            that.initUI();
            });
        });
    }

    initUI() {
        //
    }

    initFilters() {
        //
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
        let deleteName, updateName, addName, url, addUrl, deleteUrl, updateUrl, 
        deleteForm, updateForm, addForm;
        
        deleteName = capitalize(this.entity) + 'DeleteForm';
        updateName = capitalize(this.entity) + 'UpdateForm';
        addName = capitalize(this.entity) + 'AddForm';
        
        // Form endpoits assigned here
        url = [this.endpoints[this.entity]];
        addUrl = url;
        deleteUrl = url;
        updateUrl = url;

        if (this.endpoints.hasOwnProperty(this.entity + '.add')) {
            addUrl = this.endpoints[this.entity + '.add'];
        }
        if (this.endpoints.hasOwnProperty(this.entity + '.delete')) {
            deleteUrl = this.endpoints[this.entity + '.delete'];
        }
        if (this.endpoints.hasOwnProperty(this.entity + '.update')) {
            updateUrl = this.endpoints[this.entity + '.update'];
        }

        deleteForm = new DynamicForm(deleteName, deleteUrl);
        updateForm = new DynamicForm(updateName, updateUrl);
        addForm = new DynamicForm(addName, addUrl);

        this.forms['delete'] = deleteForm;
        this.forms['update'] = updateForm;
        this.forms['add'] = addForm;
        //this.testButtons();
    }

    testButtons() {
        let selector, entity, endpoint, method, testData, callback
        , deleteForm, updateForm, addForm;
        deleteForm = config.page.forms['delete'];
        updateForm = config.page.forms['update'];
        addForm = config.page.forms['add'];

        $('#testDelete').on('click', function() {
            deleteForm.showModal({data: {record: {id: '7'}}});
        })

        $('#testEdit').on('click', function() {
            testData = {data: {record: {id: '7', content: 'bla bla', answer: '1', question_id: 4}}};
            callback = updateForm.showModal(testData);
            callback(testData);
        })

        $('#testAdd').on('click', function() {
            testData = {data: {record: {question_id: 4}}};
            callback = addForm.showModal();
            callback(testData);
        })

        $('#testBuild').on('click', function() {
            let fields, builder;

            fields = [
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

            builder = new FormBuilder('#formBuilder', fields);
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
    }

    initGrids() {
        let grid, gridName;
        gridName = capitalize(this.entity) + 'Grid';
        grid = new DynamicGrid(gridName);
        grid.constructor.apply(grid, [$('#' + this.entity + 'Grid'), this.entity, this.endpoints[this.entity]])
        grid.init();
        this.grids[grid.getEntity()] = grid;
    }
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
        let departments, dropdownId;
        
        departments = CheckAddForm.getDepartmentOptions();
        dropdownId = '#departmentDropdown';

        $(departments).each(function(i, v) {
            let option = document.createElement('option');
            $(option).val(v.value).html(v.label);
            $(dropdownId).append(option);
        });

        $(dropdownId).selectpicker();

        config.selectedDepartment = $(dropdownId).val();

        $(dropdownId).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
          config.selectedDepartment = $(dropdownId).val();
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
            let entity, newURL;
            entity = event.data.record;
            newURL = config.routes.checklist.replace("ID", entity.id);
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
    }

    initUIList() {
        this.initGrids();
    }

    static viewSubQuestions(event) {
        let that = this;
        return function (event) {
            let entity, newURL;
            entity = event.data.record;
            newURL = config.routes['subquestions'] + '/' + entity.id;
            window.location = newURL;
        }
    }
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
        let gridConfig, addForm, fn, data;
        gridConfig = this.getGridConfig();
        this.grid = this.el.grid(gridConfig);

        if (undefined !== config.page.forms && undefined !== config.page.forms['add']) {
            addForm = config.page.forms['add'];
            fn = addForm.showModal()
            data = {};

            if (undefined !== config.question) {
                data.record = {question_id: config.question.id};
            }

            $('.toolbar .add').on('click', data, fn);
        }
        this.bindRowDataChanged();
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
        let $widget = this;
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
            //
        }
    }

    bindSelect() {
        this.grid.on('rowSelect', this.selectCallback(this.entity));
    }

    bindRowDataChanged() {
        //
    }
}

class CheckGrid extends GridUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        let query = super.reloadQuery();
        if (config.hasOwnProperty('selectedDepartment')) {
           query.department = config.selectedDepartment; 
        }

        return query;        
    }

    getAJAXConfig() {
        let conf = super.getAJAXConfig();
        if (undefined !== config.question) {
            conf.url = conf.url.replace('ID', config.question.id);
        }

        if (config.hasOwnProperty('selectedDepartment')) {
            if (!conf.hasOwnProperty('data')) {
                conf.data = {department: config.selectedDepartment};
            }
        }
        return conf;
    }

    getGridConfig() {
        let deleteForm = config.page.forms['delete'];
        let updateForm = config.page.forms['update'];

        return {
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: this.getAJAXConfig(),
            selectionMethod: 'basic',
            rowReorder: true,
            rowReorderColumn: 'id',
            orderNumberField: 'priority',
            initialized: function(e) {
                //
            },
            columns: [
            {
                field: 'id', 
                title: 'Id', 
                width: 56, 
                sortable: false,               
                events: {
                    'mousedown': function (e) {
                        e.stopPropagation();
                        $(e.currentTarget).parent().attr('data-drag-status', 'mousedown');
                     },
                    'mouseup': function (e) {
                        e.stopPropagation();
                     },
                    'mouseleave': function (e) {
                        e.stopPropagation();
                        let currentStatus, data, post, record;
                        currentStatus = $(e.currentTarget).parent().attr('data-drag-status');
                        if (currentStatus === 'mousedown') {                        
                            $(e.currentTarget).parent().attr('data-drag-status', 'mouseleave');
                        } else if (currentStatus === 'mouseleave') {
                            $(e.currentTarget).parent().removeAttr('data-drag-status');
                            data = config.page.grids['check'].grid.getAll();
                            post = [];
                            $(data).each(function(i, v) {
                                record = {};
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
            ]
        }
    }

    static postCheckReorders(data) {
        $.ajax({
            url: config.routes['check.reorder'],
            type: 'PUT',
            data: data,
            success: function(data) {
                toastr.success('Checks order saved');
            },
            error: function(response) {
                let json, msg;
                json = response.responseJSON;
                msg = 'There was an error';
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
        let deleteForm, updateForm;

        deleteForm = config.page.forms['delete'];
        updateForm = config.page.forms['update'];

        return {
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
        let deleteForm, updateForm, dataSource;

        deleteForm = config.page.forms['delete'];
        updateForm = config.page.forms['update'];
        dataSource = this.getAJAXConfig();
        
        return {
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
        let deleteForm, updateForm;

        deleteForm = config.page.forms['delete'];
        updateForm = config.page.forms['update'];

        return {
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
        let deleteForm, updateForm;
        deleteForm = config.page.forms['delete'];
        updateForm = config.page.forms['update'];

        return {
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
            let rows, qRow;
            if (config.job.question !== null) {
                rows = $('table#questionGrid tr');

                qRow = rows.filter(function () {
                    return $(this).children(':eq(0)').text() == config.job.question.id;
                })

                $(qRow).find('button').removeClass('btn-primary').addClass('btn-success').prop( "disabled", true );
            }
        }
    }

    getGridConfig() {
        let ajaxConfig, url, categoryUrl; 
        ajaxConfig = this.getAJAXConfig();
        url = ajaxConfig.url;
        categoryUrl = url += '?category_id=' + config.job.category.id;
        ajaxConfig.url = categoryUrl;

        return {
            headerFilter: true,
            primaryKey: 'id',
            uiLibrary: 'bootstrap4',
            dataSource: ajaxConfig,
            selectionMethod: 'basic',
            columns: [
                    { field: 'id', title: 'Id', width: 56, sortable: true, filterable: true },
                    { field: 'content', title: 'Content', sortable: true, filterable: true },
                    { title: '', field: 'Yes', filterable: false, width: 100, tmpl: '<button class="btn btn-primary">Select</button>', tooltip: 'Select', events: { 'click': this.questionSelected() } },
                ],
            pager: { limit: 3, sizes: [2, 5, 10, 20] },
            paramNames: {limit: 'limit', page: 'page'},
            mapping: {totalRecordsField: 'total', dataField: 'data'}
        }
    }

    questionSelected(event) {
        let that = this;
        return function (event) {
            if ($(event.target).hasClass('btn-success')) {
                return false;
            }

            $.get(that.url + '/' + event.data.record.id, function (data) {
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
        this.bindEvents()
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
        let success = function (data) {
            config.departments = data.data;
            callback !== undefined ? callback() : false;
            $(document).trigger( "departments_updated", [] );
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
            //
        }, function( event, arg1, arg2 ) {
            that.updateJobSummaryView();
            that.updateNotesView(that);
        });

        $( document ).on( "job_updated", {
            //
        }, function( event, arg1, arg2 ) {
            that.updateJobDetailsView();
            that.updateJobSummaryView();
            that.updateNotesView(that);
        });

        $( document ).on( "checklist_updated", {
            //
        }, function( event, arg1, arg2 ) {
            that.updateChecklistButtonsView(that);
            that.grids['checklist'].grid.reload();
        });
    }

    updateNotesView(that) {
        let indexed = {};
        $(config.job.notes).each(function(i, v) {
            indexed[v.department.id] = v;
        });
        $('#accordion').empty();

        $(config.departments).each(function(i, v) {
            let formMethod, saveFormMethod, note, noteId, template, html, newEl;
            formMethod = '';
            saveFormMethod = 'POST';
            note = {content: '', id: ''};

            if (indexed.hasOwnProperty(v.id)) {
                note = indexed[v.id];
                saveFormMethod = 'PUT';
            }
            noteId = note.id;
            template = $('#mustacheTemplate_notes_card').html();
            html = Mustache.to_html(template, {
                department: v,
                note: note,
                job: config.job,
                save_form_method: saveFormMethod
            });
            newEl = $(html);

            $('#accordion').append(newEl); 

            if (note.id !== '') {
                $('#collapse' + v.id).find('button.delete').removeClass('d-none');
            } 

            $('#collapse' + v.id).find('button.save').removeClass('d-none');
        });
        that.bindNotesButtons(that);
    }

    bindNotesButtons(that) {
        $("#accordion form").submit(function(event) {
            let form;

            event.preventDefault();
            form = $(this),
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
                    toastr.success(data.message);
                    config.page.getJob();
                },
                error: function(response) {
                    let json, msg, key;
                    json = response.responseJSON;
                    msg = 'There was an error';
                    
                    if (json.hasOwnProperty('data')) {
                        key = Object.keys(json.data)[0];
                        msg = json.data[key]
                    } else if (response && response.statusText && response.statusText !== 'abort') {
                        msg = response.statusText;
                    }
                    toastr.error(msg);
                }
            });
        });
    }

    updateChecklistButtonsView(that) {
        $('.checklist-actions').empty();
        let elem, msg, preview, print, previewIcon, printIcon;

        if (isEmpty(config.checklist)) {
            elem = document.createElement('div');
            msg = 'No checks to print';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.checklist-actions').append(elem);
        } else {
            preview = document.createElement('a');
            print = document.createElement('a');
            previewIcon = document.createElement('i');
            printIcon = document.createElement('i');

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
        let list, itemClass, elem, msg, fields, itemTitle, itemValue, titleClass, valueClass;

        list = document.createElement('dl');
        itemClass = 'list-group-item d-flex justify-content-between align-items-center';
        $(list).attr('class', 'row');

        if (isEmpty(config.job)) {
            elem = document.createElement('div');
            msg = 'No job found';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.summary').html(elem);
        } else {
            fields = [];
            fields.push({title: 'Job No', value: config.job.code});
            fields.push({title: 'Client', value: config.job.client.title});
            fields.push({title: 'Title', value: config.job.title});
            fields.push({title: 'Account Manager', value: config.job.account_manager.title});
            fields.push({title: 'Date', value: config.job.created_at});

            $(fields).each(function(i, v) {
                itemTitle = document.createElement('dt');
                itemValue = document.createElement('dd');
                titleClass = "col-4";
                valueClass = "col-8";

                $(itemTitle).html(v.title).attr('class', titleClass);
                $(itemValue).html(v.value).attr('class', valueClass);

                $(list).append(itemTitle);
                $(list).append(itemValue);             
            });
            
            $(".details").empty();
            $(".details").append(list);
        }
    }

    updateJobSummaryView() {
        let list, itemClass, answerYesClass, answerNoClass, elem, msg, itemTitle, itemValue, titleClass, valueClass;

        list = document.createElement('dl');
        itemClass = 'list-group-item d-flex justify-content-between align-items-center';
        answerYesClass = 'badge badge-success badge-pill';
        answerNoClass = 'badge badge-danger badge-pill';

        $(list).attr('class', 'row');

        if (isEmpty(config.job.answers)) {
            elem = document.createElement('div');
            msg = 'No answers found';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.summary').html(elem);
        } else {
            $(config.job.answers).each(function(i, v) {
                itemTitle = document.createElement('dt');
                itemValue = document.createElement('dd');
                titleClass = "col-4";
                valueClass = "col-8";

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
        let list, itemClass, answerNoClass, answerYesClass, elem, msg, item, answer;
        
        list = document.createElement('ul');
        itemClass = 'list-group-item d-flex justify-content-between align-items-center';
        answerYesClass = 'badge badge-success badge-pill';
        answerNoClass = 'badge badge-danger badge-pill';
        elem;

        $(list).attr('class', 'list-group my-3');

        if (isEmpty(config.job.answers)) {
            elem = document.createElement('div');
            msg = 'No answers found';
            $(elem).attr('class', 'alert alert-info').attr('role', 'alert').html(msg);
            $('.summary').html(elem);
        } else {
            $(config.job.answers).each(function(i, v) {
                item = document.createElement('li');
                answer = document.createElement('span');
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
        let endpoint;
        endpoint = this.endpoints['jobs.show'].replace('ID', this.job.id);
        $.get(endpoint, function (data) {
            config.job = data;
            $( document ).trigger("job_updated", []);
        });
    }

    getChecklist(triggerUpdate = true) {
        let endpoint;
        
        endpoint = this.endpoints['jobs.checklist'].replace('ID', this.job.id);
        $.get(endpoint, function (data) {
            config.checklist = data;
            if (triggerUpdate) {
                $( document ).trigger("checklist_updated", []);
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
        this.initSteps();
    }

    initSteps() {
        let config;
        this.buildTemplate();
        config = this.getConfig();
        $('#smartwizard').smartWizard(config);
        $('#editTab li:nth-child(2) a').tab('show');

        $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
            let elmFormId;
            elmFormId = "#step-" + (stepNumber + 1);
            if(stepDirection === 'forward' && elmFormId) {
                return CheckList.validateChecklistRadio(elmFormId);
            }

            return true;
        });
    }

    clearTemplates() {
        //
    }

    static validateChecklistRadio(elmFormId) {
        let radioValue;

        radioValue = $(elmFormId).find('input[type="radio"]:checked').val();

        if (undefined === radioValue) {
            $(elmFormId).find('.invalid-feedback').show();
            return false;
        } else {
            $(elmFormId).find('.invalid-feedback').hide();
            return true;
        }
    }

    buildTemplate() {
        let wrapper, q, subquestions, list, html, newEl, content, stepId, stepTitle, stepDescription, template;

        $('.wizard').empty();
        q = Object.assign({}, this.question);
        subquestions = flatten(q);
        list =  document.createElement("ul");
        content = document.createElement('div');
        $(content).attr('class', 'checklist-steps');

        $(subquestions).each(function(i, v) {
            stepId = 'step-' + (i + 1);
            stepTitle = 'Step ' + (i + 1);
            stepDescription = 'Answer yes or no';
            template = $('#mustacheTemplate_wizard_item').html();
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
        });
        wrapper =  document.createElement("div");
        $(wrapper).attr('id', 'smartwizard');
        $(wrapper).append(list, content);
        $('.wizard').append(wrapper);
    }

    getSubQuestions() {
        $.get(this.endpoints.question + '/' + this.question.id, function (data) {
            config.categories = data;
        });

    }

    checklistCompleted(data) {
        let that = this;
        return function (data) {
            let activeStep, activeStepId, valid, checklist, fields, question, job;
            
            activeStep = $('#smartwizard .step-anchor .nav-item.active a');
            activeStepId = activeStep.attr('href');
            valid = CheckList.validateChecklistRadio(activeStepId);

            if (!valid) {
                return false;
            }

            checklist = data.data.checklist;
            fields = $( ".wizard :input" ).serializeArray();
            question = {name: 'question_id', value: checklist.question.id};
            job = {name: 'job_id', value: config.job.id};
            fields.push(question);
            fields.push(job);

            $.ajax({
              url: that.endpoints['jobs.answers.update'],
              type: 'PUT',
              data: fields,
              success: function(data) {
                config.page.getJob();
                config.page.getChecklist(true);

                toastr.success(data.message);

                $('#collapseTwoCLA').collapse('hide');
                $('#collapseOneCLA').collapse('show');
                $('#viewTab li:nth-child(1) a').tab('show');
              },
              error: function(response) {
                let json, msg;

                json = response.responseJSON;
                msg = 'There was an error';
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
                        .on('click', function() { 
                            $('#editTab li:nth-child(1) a').tab('show');      
                            $('.wizard').html('<div class="alert alert-warning" role="alert">Please choose a main question first</div>');
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

const isEmpty = function(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}