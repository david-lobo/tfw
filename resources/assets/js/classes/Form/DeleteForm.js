import {AjaxForm} from './AjaxForm';

export class DeleteForm extends AjaxForm {

    constructor(selector, entity, endpoint, method, fields) {
        super(selector, entity, endpoint, method, fields);
    }

    initDialog() {
        let dialog = $(this.selector).dialog(this.getDialogConfig());
        this.dialog = dialog;
    }

    showModal(event, x) {
        let that = this;

        return function (event, x) {
            let message; 
            that.reset();
            that.populateConfigFields();
            $(that.selector).find('input[name="id"]').val(event.data.record.id);
            message = 'Are you sure you want to delete this ' + that.entity + '?';
            $(that.selector).find('.confirm-message').html(message);
            that.dialog.open("Delete " + that.entity + ' ' + event.data.record.id);
        }
    }
}