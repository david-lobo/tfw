import {FormBuilder} from './FormBuilder';
import toastr from 'toastr';

export class AjaxForm {
    constructor(selector, entity, endpoint, method, fields, app) {
        this.selector = selector;
        this.entity = entity; 
        this.endpoint = endpoint;
        this.method = method;
        this.dialog = null;
        this.fields = fields;
        this.app;
        this.init();
    }

    init() {
        this.createTemplate();
        this.bindButtons();
        this.initDialog();
    }

    createTemplate() {
        let builder = new FormBuilder(this.selector, this.fields);
        builder.build();
    }

    initDialog() {}

    showModal() {}

    populateConfigFields() {
        console.log('populateConfigFields', this.entity);
        $(this.selector).find('form').attr('data-method', this.method);
        $(this.selector).find('form').attr('data-entity', this.entity);
    }

    bindButtons() {
        console.log('============');
        console.log('init buttons', this.selector, this);
        //$('#btnSave').on('click', this.saveCallback());
        //$('#btnAdd').on('click', CheckUpdateForm.add);
        $(this.selector).find('.btn-confirm').on('click', this.saveCallback());

        //$(this.selector).find('.btn-confirm').on('click', function(){console.log('bindSave')});
        $(this.selector).find('.btn-cancel').on('click', this.cancelCallback());
        console.log('============');
    }

    reset() {
        console.log('parent reset');
        $(this.selector).find('input, select, textarea').each(function(i, v) {
            console.log('form-data', i, v, v.name);

                if ($(v).is('input, textarea')) {
                    $(v).val("");
                } else if ($(v).is('select')) {
                    $(v).val($(v).find("option:first").val());
                    $(v).selectpicker('refresh');
                }

        });

        $(this.selector).find('form').attr('data-method', "");
        $(this.selector).find('form').attr('data-entity', "");
    }

    clearValidationErrors() {
        //$(this.constructor.getDialogId()).find('.form-control').removeClass('is-invalid');
        //$(this.constructor.getDialogId()).find('form .invalid-feedback').remove();
        $(this.selector).find('.form-control').removeClass('is-invalid');
        $(this.selector).find('form .invalid-feedback').remove();
    }

    showValidationErrors(validationErrors) {
        let shown = false;
        $(this.selector).find('form .form-group').each(function (i, v) {
            let val = $(v).attr('data-validation-name');
            if (validationErrors.hasOwnProperty(val)) {
                shown = true;
                $(v).find('.form-control').addClass('is-invalid');
                $(v).append('<div class="invalid-feedback">' + validationErrors[val] + '</div>');
            }
        });

        $(this.selector).find('form input[type="hidden"]').each(function (i, v) {
            let val = $(v).attr('data-validation-name');
            if (undefined === val) {
                val = $(v).attr('name');
            }
            if (validationErrors.hasOwnProperty(val)) {
                shown = true;
                console.log('toast error', validationErrors[val]);
                toastr.error(validationErrors[val]);
            }
        });

        return shown;
    }

    getFormData() {
        var record = {};

        $(this.selector).find('input, select, textarea').each(function(i, v) {
            record[v.name] = $(v).val(); 
        });

        //console.log('record', record);
        return record;

    }


    cancelCallback() {
        //console.log('this', this);
        let that = this;
        return function () {
            that.dialog.close();
        }
    }

    saveCallback() {
        //console.log('this', this);
        let that = this;
        return function () {
        let url, selectedId, gridUI, treeUI, record, entity, method;
        record = {};
        //console.log('this', that);
        method = that.method;
        entity = that.entity;
        record = that.getFormData();

        url = that.endpoint;
        if (method !== 'POST') {
            console.log('URL', URL, url.includes("ID", 0));
            if (url.includes("ID", 0)) {
                url = url.replace("ID", record.id);
            } else {
                selectedId = record.id;
                url +=  '/' + selectedId
            }
        }
           
           console.log('saveCallback', method, url, record);
        
            $.ajax({
                type: method,
                url: url,
                data: record,
                beforeSend: function () {
                    that.clearValidationErrors();
                    console.log('startButtonLoader', that.selector);
                    config.page.startButtonLoader(that.selector + ' .btn-confirm');
                },
                success: function (data, textStatus, jqhr) {
                    //let entity = 'check';

                    //let dialog = app.page.getDialog();
                    let dialog = that.dialog;
                    dialog.close();
                    
                    gridUI = config.page.getGrids()[entity];
                    if (undefined !== gridUI) {
                        gridUI.reload();
                    }

                    treeUI = config.page.getTrees()[entity];
                    if (undefined !== treeUI) {
                        treeUI.reload();
                    }

                    let confirmed = method === 'DELETE' ? ' deleted ' : 'saved';
                    toastr.success('The ' + entity + ' was ' + confirmed);
                },
                error: function (jqXHR, status, error) {
                    let msg = 'There was an error with that request';
                    msg = jqXHR.responseJSON.message != undefined ? jqXHR.responseJSON.message : msg;
                    //app.page.getModal().modal('hide');
                    //let dialog = app.page.getDialog();
                    //dialog.close();
                    let dialog = that.dialog;

                    if (jqXHR.responseJSON) {
                        if (jqXHR.responseJSON.message === 'Validation Error') {
                            let validationErrors = jqXHR.responseJSON.data;
                            let shown = that.showValidationErrors(validationErrors)
                            console.log('validationErrors', validationErrors);

                            if (shown) {
                                return false;
                            }
                        }
                    }

                    toastr.error(msg.substring(0, 125) + '...');
                },
                complete: function () {
                    config.page.stopButtonLoader(that.selector + ' .btn-confirm');
                }
            });
        }
    }

    getDialogConfig() {
        return {
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            autoOpen: false,
            scrollable: true,
            resizable: true,
            minWidth: 200,
            maxWidth: 600,
            minHeight: 200,
            maxHeight: 450,
            width: 450,
            height: "auto",
            modal: true
        }
    }
}