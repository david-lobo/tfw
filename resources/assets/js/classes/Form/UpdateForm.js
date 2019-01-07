import {AjaxForm} from './AjaxForm';

export class UpdateForm extends AjaxForm {
    constructor(selector, entity, endpoint, method, fields) {
        
        super(selector, entity, endpoint, method, fields);
        this.populateCallback;
    }

    initDialog() {
        let dialog = $(this.selector).dialog(this.getDialogConfig());
        this.dialog = dialog;
    }

    populateFields(record) {
        $(this.selector).find('input, select, textarea').each(function(i, v) {
            let fieldId, subEntity;
            
            fieldId = v.name;
            subEntity = false;

            if (record === undefined) {
                return false;
            }

            if (record[fieldId] === undefined) {
                subEntity = true;
                fieldId = fieldId.replace('_id', '');
            }

            if (record[fieldId] !== undefined) {
                if ($(v).is('input, textarea')) {
                    $(v).val(record[fieldId]);
                } else if ($(v).is('select')) {
                    let selectedId;
                    if (subEntity) {
                        selectedId = record[fieldId]['id'];
                        $(v).selectpicker('val', record[fieldId]['id']);
                    } else{      
                        selectedId = record[fieldId]         
                        $(v).selectpicker('val', record[fieldId]);
                    }
                    $(v).attr('data-selected-val', selectedId);
                }
            }
        });
    }

    populateFieldsFromAttr() {
        $(this.selector).find('select.selectpicker').each(function(i, v) {
            let value = $(v).attr('data-selected-val');
            $(v).attr('data-pop-done', true);
            $(v).selectpicker('val', value);
            $(v).selectpicker('refresh');
        });
    }

    showModal(event) {
        let that = this;

        return function (event) {      
            let command = that.method === 'POST' ? 'Add' : 'Update';
            
            that.reset();
            that.populateFields(event.data.record);
            that.populateConfigFields();

            if (event.data.callback != undefined) {
                event.data.callback();
            }

            $(that.selector).find('form').trigger('modal:show');
            that.dialog.open(command + ' ' + capitalize(that.entity));
        }
    }
}