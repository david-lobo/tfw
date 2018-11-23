import {AjaxForm} from './AjaxForm';

export class UpdateForm extends AjaxForm {
    constructor(selector, entity, endpoint, method, fields) {
        
        super(selector, entity, endpoint, method, fields);
        this.populateCallback;
    }

    initDialog() {
        let dialog = $(this.selector).dialog(this.getDialogConfig());

        //let dropdown = $('#answer').selectpicker({width: '100%'});
        //app.page.editDialog = dialog;

        this.dialog = dialog;
    }

    populateFields(record) {
        $(this.selector).find('input, select, textarea').each(function(i, v) {

            let fieldId = v.name;
            let subEntity = false;

            if (record === undefined) {
                return false;
            }

            if (record[fieldId] === undefined) {
                fieldId = 'category';
                subEntity = true;
            }

            if (record[fieldId] != undefined) {
                //console.log('selectpicker.populateFields 1.3');
                if ($(v).is('input, textarea')) {
                    //console.log('selectpicker.populateFields 1.4', v.name, record);
                    $(v).val(record[fieldId]);
                } else if ($(v).is('select')) {
                    //console.log('selectpicker.populateFields 1.5', v.name, record);
                    if (subEntity) {
                        $(v).selectpicker('val', record[fieldId]['id']);
                    } else{                     
                        $(v).selectpicker('val', record[fieldId]);
                    }
                }
            }
        });

        if (this.populateCallback !== undefined) {
            console.log('populateCallback called');
        }
    }

    showModal(event) {

        let that = this;
        return function (event) {
        console.log('showModal', event);
        
        let command = that.method === 'POST' ? 'Add' : 'Update';
        /*$('#dialog').find('form input[name="id"]').val(e.data.id);
        $('#dialog').find('form textarea[name="content"]').val(e.data.record.content);
        $('#dialog').find('form select[name="answer"]').selectpicker('val', e.data.record.answer);*/

        //let dialogId = this.selector;
        that.reset();
        that.populateFields(event.data.record);
        that.populateConfigFields();

        if (event.data.callback != undefined) {
            event.data.callback();
        }

        //$(this.selector).find('form').attr('data-method', "PUT");
        //$(this.selector).find('form').attr('data-entity', "check");

        //let dialog = app.page.editDialog;
        

        that.dialog.open(command + ' ' + capitalize(that.entity));

    }
}
}