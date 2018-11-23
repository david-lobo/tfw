export class FormBuilder {
    constructor(selector, fields) {
        this.selector = selector;
        this.fields = fields;
        this.form;
        this.footer;
    }

    build() {
        console.log('FormBuilder.build', this.selector, this.fields, this.form);

        this.form = document.createElement("form");
        
        $(this.form).attr('data-entity', '').attr('data-method', '');

        this.addInputs();

        this.addFooter();
        
        this.renderForm();
    }

    addInputs() {
        let that = this;
        $(this.fields).each(function(i, v) {
            console.log('addInputs', i, v);
            let input, isWrapInput, isValidateInput, isLabel, className;
            isWrapInput = true;
            isValidateInput = true;
            isLabel = true;
            className = 'form-control';
            switch(v.type) {
                case "hidden":
                    isValidateInput = false;
                    isWrapInput = false;
                    isLabel = false;
                    className = '';
                    console.log('hidden');
                    input = document.createElement('input');
                    $(input).attr('type', 'hidden');
                    break;
                case "textarea":
                    input = document.createElement('textarea');
                    //class="form-control" id="content" name="content" rows="2" cols="50
                    $(input).attr('rows', '2').attr('cols', 2);
                    break;
                case "select":
                    input = document.createElement('select');
                    className += ' ' + v.name + '-select';

                    $(v.options).each(function(i, v) {
                        let option = document.createElement('option');
                        $(option).attr('value', v.value).html(v.label);
                        $(input).append(option);
                    });
                    break;
                case "input":
                    input = document.createElement('input');
                    //class="form-control" id="content" name="content" rows="2" cols="50
                    //$(input).attr('rows', '2').attr('cols', 2);
                    break;
                default:
                    text = "I have never heard of that fruit...";
            }

            $(input).attr('name', v.name).attr('class', className).val('');
            //console.log(that.form);

            if (isWrapInput) {
                let wrapper = document.createElement('div');
                if (isLabel){
                    let label = document.createElement('label');
                    $(label).attr('for', v.name).html(v.label);
                    $(wrapper).append(label);

                }
                $(wrapper).attr('class', 'form-group').attr('data-validation-name', v.name);
                input = $(wrapper).append(input);
            }
            $(that.form).append(input);
        });
    }

    addFooter() {
                    /*<div data-role="footer">
                <button type="button" id="btnSave" class="btn btn-default btn-confirm">Save</button>
                <button type="button" id="btnCancel" class="btn btn-default">Cancel</button>
            </div>*/

        let footer = document.createElement('div');
        $(footer).attr('data-role', 'footer');
        let saveBtn = document.createElement('button');
        let cancelBtn = document.createElement('button');

        $(saveBtn).attr('type', 'button').attr('class', 'btn btn-primary btn-confirm').html('Save');
        $(cancelBtn).attr('type', 'button').attr('class', 'btn btn-secondary btn-cancel').html('Cancel');

        $(footer).append(saveBtn, cancelBtn);

        this.footer = footer;
    }

    renderForm() {
        var wrapper = document.createElement("div");
        let body = document.createElement('div');
        let confirm = document.createElement('div');

        $(body).attr('data-role', 'body');
        $(wrapper).attr('id', this.selector.replace("#", ""));
        $(confirm).attr('class', 'confirm-message');
        $(body).append(this.form, confirm);
        $(wrapper).append(body, this.footer);
        $("body").append(wrapper); 
    }
}