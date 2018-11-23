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
        console.log('Edit', event, x);
        //CheckUpdateForm.reset();
        //console.log('Delete called', e.data);
        //console.log('Delete called');

        that.reset();

        that.populateConfigFields();

        //$(this.selector).find('form').attr('data-method', "DELETE");
        //$(this.selector).find('form').attr('data-entity', "check");

        $(that.selector).find('input[name="id"]').val(event.data.record.id);
        let message = 'Are you sure you want to delete this ' + that.entity + '?';
        
        $(that.selector).find('.confirm-message').html(message);


        that.dialog.open("Delete " + that.entity + ' ' + event.data.record.id);

        //deleteDialog = dialog;
        //this.dialog = dialog;
        }
    }
}