/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "jquery";
require('./bootstrap');
import Mustache from 'mustache';
import 'gijgo/js/gijgo';
import gj from 'gijgo/js/gijgo';
import bootbox from 'bootbox';
import toastr from 'toastr';
require('bootstrap-select');

let app;

$(document).ready(function () {
    app = new App();
    app.init();
});

class App {
    constructor() {
        this.trees = [];
        this.endpoints = {
            category: "/d5-api/categories",
            category_all: "/d5-api/categories/all",
            item: "/d5-api/items"
        },
        this.modal,
        this.forms,
        this.etags = {}
    }

    getTrees() {
        return this.trees;
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

    getCategoriesAll() {
        return this.categoriesAll;
    }

    setModal(modal) {
        this.modal = modal;
    }

    setCategoriesAll(categories) {
        this.categoriesAll = categories;
    }

    init() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $(document).ajaxComplete(function(ev, jqXHR, settings) {
            let etag = jqXHR.getResponseHeader('ETag');
            let prefix = '';
            let type;

            if (settings.type === 'GET') {
                if (settings.url.includes('categories')) {
                    prefix = 'Category';
                    type = prefix.toLowerCase();
                } else if (settings.url.includes('items')) {
                    prefix = 'Item';
                    type = prefix.toLowerCase();
                }

                if (!app.etags.hasOwnProperty(prefix)) {
                    app.etags[prefix] = {}; 
                }

                if (app.etags[prefix].hasOwnProperty(settings.url)) {
                    if (app.etags[prefix][settings.url] !== null && etag !== null) {
                        if (app.etags[prefix][settings.url] !== etag) {
                            if (!settings.url.includes('all')) {
                                if (prefix !== '') {
                                    toastr.info(prefix + ' has changed');
                                    app.etags[prefix] = {};
                                    console.log(prefix + ' has changed', app.etags[prefix][settings.url], etag);
                                }
                            }
                        }
                    }
                }

                app.etags[prefix][settings.url] = etag;
            }

        });

        this.initTrees();
        this.loadAllCategories();
        this.syncData();
        this.initModalForms(this.categoriesAll);
    }

    initTrees() {
        let tree;
        tree = new CategoryTree($('#categories'), 'category', this.endpoints.category);
        tree.init();

        this.trees[tree.getEntity()] = tree;

        tree = new ItemTree($('#items'), 'item', this.endpoints.item);
        tree.init();

        this.trees[tree.getEntity()] = tree;
    }

    initModalForms(categoriesAll) {
        let forms = new ModalForms(categoriesAll);
        forms.init();
        this.forms = forms;
    }

    initButtons() {
        $('.crud .btn').prop('disabled', true);
        $('.btn.add').prop('disabled', false);
    }

    reloadCategoryTree() {
        this.trees['category'].reload();
    }

    reloadItemTree() {
        this.trees['item'].reload();
    }

    reloadAllData() {
        app.reloadItemTree();
        app.reloadCategoryTree();
    }

    syncData() {
        setInterval(function () {
            app.reloadCategoryTree();
            app.reloadItemTree();
            app.loadAllCategories();
        }, 15000)
    }

    loadAllCategories() {
        $.get(this.endpoints.category_all, function (data) {
            app.setCategoriesAll(data);
        });
    }
}

class TreeUI {
    constructor(el, entity, url) {
        this.el = el;
        this.entity = entity;
        this.url = url;
        this.tree;
        this.selectedId = 0;
        this.selectedEntity = null;
        this.ETag = null;
        this.lastQueryUrl = null;
        this.expanded = {};
    }

    greet() {
        return `${this.name} says hello.`;
    }

    getTree() {
        return this.tree;
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
        this.tree = this.el.tree({
            uiLibrary: 'bootstrap4',
            textField: 'title',
            childrenField: 'childs',
            dataSource: this.getAJAXConfig(),
            primaryKey: 'id'
        });

        this.bindSelect();
        this.bindUnselect();
        this.bindExpand();
    }

    reloadQuery() {
        return {};
    }

    reload() {
        let query = this.reloadQuery();
        this.tree.reload(query);
    }

    errorCallback(entity) {
        var $widget = this;
        return function (response) {
            if (response && response.statusText && response.statusText !== 'abort') {
                toastr.error(response.statusText);
            }
        };
    }

    reloadCallback(entity) {
        return function (jqXHR, textStatus) {
            let treeUI, tree, selectedId;
            treeUI = app.getTrees()[entity];
            tree = treeUI.getTree();
            selectedId = treeUI.getSelectedId();
            //tree.expandAll();

            if (selectedId && selectedId != 0) {
                let node = tree.getNodeById(selectedId);
                if (node && node !== undefined) {
                    tree.select(node);
                } else {
                    treeUI.setSelectedId(0);
                    treeUI.setSelectedEntity(null);
                }
            }

            console.log('expanded', treeUI.expanded);

            for (let key of Object.keys(treeUI.expanded)) {  
              let mealName = treeUI.expanded[key];
              // ... do something with mealName
              console.log(key);
              let node = tree.getNodeById(key);
              tree.expand(node);
            }

            /*let lastQueryUrl = treeUI.getLastQueryUrl();
            const etag = treeUI.getETag();

            if (etag !== null && etag !== jqXHR.getResponseHeader('ETag')) {
                if (lastQueryUrl != null && lastQueryUrl == this.url) {
                    let prefix = entity.charAt(0).toUpperCase() + entity.substr(1);
                    //toastr.info(prefix + ' has changed');
                }
            }

            treeUI.setETag(jqXHR.getResponseHeader('ETag'));
            treeUI.setLastQueryUrl(this.url);*/
        }
    }

    selectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = app.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.setSelectedId(id);

            if (treeUI.getSelectedId() !== 0) {
                treeUI.setSelectedEntity(tree.getDataById(treeUI.getSelectedId()));

                $('.' + entity + ' .btn.edit, .' + entity + ' .btn.delete').prop('disabled', false);
                if (entity == 'category') {
                    let itemTreeUI = app.getTrees()['item'];
                    itemTreeUI.reload();
                }
            }
        }
    }

    unselectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = app.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.setSelectedId(0);
            treeUI.setSelectedEntity(null);

            $('.' + entity + '.btn.edit, .' + entity + ' .btn.delete').prop('disabled', true);

            if (entity == 'category') {
                let itemTreeUI = app.getTrees()['item'];
                itemTreeUI.reload();
            }
        }
    }

    expandCallback(entity) {
        return function (e, node, id) {
            //console.log('expand', e, node, id);

            let treeUI, tree;
            treeUI = app.getTrees()[entity];
            tree = treeUI.getTree();

            treeUI.expanded[id] = true;
        }
    }

    collapseCallback(entity) {
        return function (e, node, id) {
            //console.log('collapse', e, node, id);
            
            let treeUI, tree;
            treeUI = app.getTrees()[entity];
            tree = treeUI.getTree();

            delete treeUI.expanded[id];
        }
    }

    bindSelect() {
        this.tree.on('select', this.selectCallback(this.entity));
    }

    bindUnselect() {
        this.tree.on('unselect', this.unselectCallback(this.entity));
    }
    
    bindExpand() {
        this.tree.on('expand', this.expandCallback(this.entity));
    }

    bindCollapse() {
        this.tree.on('collapse', this.collapseCallback(this.entity));
    }
}

class ItemTree extends TreeUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        let query, categoryTreeUI;
        query = super.reloadQuery();
        categoryTreeUI = app.getTrees()['category'];
        query.category = categoryTreeUI.getSelectedId();
        return query;
    }
}

class CategoryTree extends TreeUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    reloadQuery() {
        return super.reloadQuery();
    }
}

class ModalForms {
    constructor(categoriesAll) {
        this.categoriesAll = categoriesAll;
    }

    init() {
        this.bindCRUDButtons();
    }

    setCategoriesAll(categories) {
        this.categoriesAll = categories;
    }

    initCRUDModal(entity, method) {
        let treeUI, tree, categorySelectLabel, categorySelectId;
        treeUI = app.getTrees()[entity];
        tree = treeUI.getTree();

        if (method === 'delete') {
            this.initDeleteModal(tree, treeUI.getSelectedId(), treeUI.getEntity(), this.deleteCallback(entity));
        } else {
            if (entity === 'category') {
                categorySelectLabel = 'Parent Category';
                categorySelectId = 'parent_id';
            } else if (entity == 'item') {
                categorySelectLabel = 'Categories';
                categorySelectId = 'category_ids';
            } else {
                return false;
            }
            this.initEditModal("#mustacheTemplate_categoryForm", method, treeUI.getEntity(), categorySelectLabel, categorySelectId, this.saveCallback(entity));
        }
    }

    initEditModal(template, action, type, categorySelectLabel, categorySelectId, callback) {
        let html, newEl, modal;
        template = $(template).html();
        html = Mustache.to_html(template, {
            action: action,
            type: type,
            category_select_label: categorySelectLabel,
            category_select_id: categorySelectId
        });
        newEl = $(html);

        modal = bootbox.dialog({
            className: action,
            message: html,
            title: 'Modal',
            buttons: [{
                label: "Save",
                className: "btn btn-primary pull-left save",
                callback: function () {
                    callback();
                    return false;
                }
            },
            {
                label: "Close",
                className: "btn btn-default pull-left",
                callback: function () {
                }
            }],
            show: false,
            onEscape: function () {
                app.getModal().modal("hide");
            }
        });

        app.setModal(modal);
    }

    initDeleteModal(dataTree, selectedId, type, callback) {
        let data, modal;
        data = dataTree.getDataById(selectedId);
        modal = bootbox.dialog({
            className: 'delete',
            message: 'Are you sure you want to delete the <b>' + data.title + '</b> ' + type + '?',
            title: "Delete " + type,
            buttons: [{
                label: "Delete",
                className: "btn btn-danger pull-left delete",
                callback: function () {
                    callback();
                    return false;
                }
            },
            {
                label: "Cancel",
                className: "btn btn-light pull-left",
                callback: function () {
                    //
                }
            }],
            show: false,
            onEscape: function () {
                app.getModal().modal("hide");
            }
        });

        app.setModal(modal);
    }

    deleteCallback(type) {
        return function () {
            let url, selectedId, treeUI, tree, modal;
            treeUI = app.getTrees()[type];
            tree = treeUI.getTree();
            selectedId = treeUI.getSelectedId();
            url = app.getEndpoints()[type] + '/' + selectedId;
            modal = app.getModal();
            $.ajax({
                type: 'DELETE',
                url: url,
                beforeSend: function () {
                    app.getForms().startButtonLoader('.modal-footer .btn.delete');
                },
                success: function (data, textStatus, jqhr) {
                    let treeUI, tree;
                    app.getModal().modal('hide');
                    treeUI = app.getTrees()[type];
                    tree = treeUI.getTree();
                    treeUI.setSelectedId(0);
                    treeUI.setSelectedEntity(null);
                    toastr.success('The ' + type + ' was deleted');
                    app.reloadAllData();
                },
                error: function (jqXHR, status, error) {
                    let msg = 'There was an error with that request';
                    msg = jqXHR.responseJSON.message != undefined ? jqXHR.responseJSON.message : msg;
                    app.getModal().modal('hide');
                    toastr.error(msg.substring(0, 125) + '...');
                },
                complete: function () {
                    app.getForms().stopButtonLoader('.modal-footer .btn.delete');
                }
            });
        }
    }

    saveCallback(type) {
        return function () {
            let requestType, modal, action, type, title, formValues, endpoints, url, selectedParent, treeUI, tree, selectedId;
            modal = app.getModal();
            action = modal.find('form input[name="action"]').val();
            type = modal.find('form input[name="type"]').val();
            title = modal.find('form input[name="title"]').val();
            formValues = {};
            endpoints = app.getEndpoints();
            url = endpoints[type];
            selectedParent = $('select.categories-select').val();
            treeUI = app.getTrees()[type];
            tree = treeUI.getTree();
            selectedId = treeUI.getSelectedId();

            if (action === 'add') {
                requestType = 'POST';
            } else if (action === 'edit') {
                requestType = 'PUT';
                 url += '/' + selectedId;
            }

            if (type === 'item') {
                formValues['category_ids'] = selectedParent;

            } else if (type === 'category') {
                formValues['parent_id'] = selectedParent[0];
            }

            formValues['title'] = title;

            $.ajax({
                type: requestType,
                url: url,
                data: formValues,
                beforeSend: function () {
                    $(modal).find('.form-control').removeClass('is-invalid');
                    $(modal).find('form .invalid-feedback').remove();
                    app.getForms().startButtonLoader('.modal-footer .btn.save');
                },
                success: function (data, textStatus, jqhr) {
                    app.getModal().modal('hide');
                    toastr.success('The ' + type + ' was saved');
                    app.reloadAllData();
                },
                error: function (jqXHR, status, error) {
                    let msg = 'There was an error with that request';
                    if (jqXHR.responseJSON) {
                        if (jqXHR.responseJSON.message === 'Validation Error') {
                            let validationErrors = jqXHR.responseJSON.data;
                            modal.find('form .form-group').each(function (i, v) {
                                let val = $(v).attr('data-validation-name');
                                if (validationErrors.hasOwnProperty(val)) {
                                    $(v).find('.form-control').addClass('is-invalid');
                                    $(v).append('<div class="invalid-feedback">' + validationErrors[val] + '</div>');
                                }
                            });
                            return false;
                        }
                    }
                    msg = jqXHR.responseJSON.message != undefined ? jqXHR.responseJSON.message : msg;
                    app.getModal().modal('hide');
                    toastr.error(msg.substring(0, 125) + '...');
                },
                complete: function () {
                    app.getForms().stopButtonLoader('.modal-footer .btn.save');
                }
            });
        }
    }

    bindCRUDButtons() {
        $('.crud .btn').on('click', function () {
            let treeUI, selectedId, tree, btn, action, entity;
            btn = $(this);
            action = btn.attr('data-action');
            entity = btn.attr('data-entity');
            treeUI = app.getTrees()[entity];
            selectedId = treeUI.getSelectedId();
            tree = treeUI.getTree();

            if (action != 'add') {
                if (selectedId == 0 || selectedId == undefined) {
                    return false;
                }
            }

            app.getForms().initCRUDModal(entity, action);
            app.getForms().bindUpdateCRUDModal();
            app.getModal().modal("show");
        });
    }

    bindUpdateCRUDModal() {
        app.getModal().on('shown.bs.modal', function (event) {
            let selectedId, selectedEntity, action, type, modal, closeButton, selectpickerConfig, treeUI, tree, options, option;
            action = $('.bootbox.modal').find('form input[name="action"]').val();
            type = $('.bootbox.modal').find('form input[name="type"]').val();
            modal = $(this)
            closeButton = modal.find(".modal-header .close")[0].outerHTML;
            modal.find(".modal-header .close").remove();
            modal.find(".modal-header").append(closeButton);

            selectpickerConfig = {
                style: 'btn-info',
                size: 4
            };

            if (undefined == action) {
                return true;
            }

            if (type === 'category') {
                selectpickerConfig['maxOptions'] = 1;
            }

            treeUI = app.getTrees()[type];
            tree = treeUI.getTree();

            let modalTitle1 = action.charAt(0).toUpperCase() + action.substr(1);
            let modalTitle2 = type.charAt(0).toUpperCase() + type.substr(1);
            
            modal.find('.modal-title').text(modalTitle1 + ' ' + modalTitle2);
            selectedId = treeUI.getSelectedId();
            selectedEntity = treeUI.getSelectedEntity();
            modal.find('.modal-body input[name="action"]').val(action);

            options = '';
            $('select.categories-select').empty();
            $(app.getCategoriesAll()).each(function (i, v) {
                if (v.id === undefined || v.title === undefined) {
                    return;
                }
                let renderOption = true;
                if (type === 'category') {
                    renderOption = action == 'add' || parseInt(v.id) !== parseInt(selectedId);
                }
                if (renderOption) {
                    option = '<option value="' + v.id + '">' + v.title + '</option>';
                    $('select.categories-select').append(option);
                }
            });

            if (action == 'add') {
                modal.find('.modal-body input[name="title"]').val("");
                $('.form-group.parent_id').show();
                $('select.categories-select').selectpicker(selectpickerConfig);
            } else if (action == 'edit') {
                if (type === 'category') {
                    let currentParentId = null;
                    modal.find('.modal-body input[name="title"]').val(selectedEntity.title);
                    $('select.categories-select').selectpicker(selectpickerConfig);

                    if (selectedEntity.parent_id !== undefined) {
                        currentParentId = selectedEntity.parent_id;
                        if (currentParentId !== null) {
                            $('select.categories-select').selectpicker('val', currentParentId);
                        }
                    }
                } else if (type === 'item') {
                    modal.find('.modal-body input[name="title"]').val(selectedEntity.title);
                    let currentCategories, currentCategoryIds;
                    currentCategories = selectedEntity.categories;
                    currentCategoryIds = [];
                    currentCategories.forEach(function (element) {
                        currentCategoryIds.push(element.id);
                    });
                    $('select.categories-select').selectpicker(selectpickerConfig);
                    $('select.categories-select').selectpicker('val', currentCategoryIds);
                }
            }
        });
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