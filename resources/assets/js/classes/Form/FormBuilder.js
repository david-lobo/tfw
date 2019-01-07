export class FormBuilder {
    constructor(selector, fields) {
        this.selector = selector;
        this.fields = fields;
        this.form;
        this.footer;
        this.events;
    }

    build() {
        this.events = [];
        this.form = document.createElement("form");
        $(this.form).attr('data-entity', '').attr('data-method', '');
        this.addInputs();
        this.addFooter();
        this.renderForm();
    }

    addInputs() {
        let that = this;
        $(this.fields).each(function(i, v) {
            let input, isWrapInput, isValidateInput, isLabel, className, form, inputClassName, createOptions;
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
                    input = document.createElement('input');
                    $(input).attr('type', 'hidden');
                    break;
                case "textarea":
                    input = document.createElement('textarea');
                    $(input).attr('rows', '2').attr('cols', 2);
                    break;
                case "select":
                    input = document.createElement('select');
                    className += ' ' + v.name + '-select selectpicker';
                    form = that.form;
                    inputClassName = v.name + '-select';

                    createOptions = function(options, input) {
                        let selectElem;

                        $(form).find('select.' + inputClassName).attr('test123', 'test');
                        selectElem = $(form).find('select.' + inputClassName);
                        $(options).each(function(i, v) {
                        let option = document.createElement('option');
                        $(option).attr('value', v.value).html(v.label);
                        $(selectElem).append(option);
                        });

                        $(selectElem).attr('data-live-search', false);
                        $(selectElem).attr('data-size', 3);
                        $(selectElem).attr('data-width', '100%');
                        $(selectElem).attr('data-dropup-auto', false);
                        $(selectElem).attr('data-virtual-scroll', 3);
                        $(selectElem).attr('data-title', 'Choose one of the following...');
                        $(selectElem).selectpicker('refresh');
                    }

                    if (v.options instanceof Function) {
                        let c, success, e, fn;
                        c  = v.options;
                        
                        success = function() {
                            if (config.hasOwnProperty(v.data_source)) {
                                if (config[v.data_source]) {
                                    let options = FormBuilder.entityToOptions(config[v.data_source]);
                                    createOptions(options, input, form);
                                    config.page.forms.update.populateFieldsFromAttr();
                                }
                            } 
                        }

                        e = $(that.selector);
                        fn = function(event) {
                            c(success);
                        };

                        $(that.form).on( "modal:show", fn);
                    } else {
                        $(v.options).each(function(i, v) {
                            let option = document.createElement('option');
                            $(option).attr('value', v.value).html(v.label);
                            $(input).append(option);
                        });
                    }

                    break;
                case "input":
                    input = document.createElement('input');

                    break;
                default:
                    //
                    break;
            }
            //className += ' col-6';
            $(input).attr('name', v.name).attr('class', className).val('');

            if (isWrapInput) {
                let wrapper = document.createElement('div');
                if (isLabel){
                    let label = document.createElement('label');
                    $(label).attr('for', v.name).html(v.label);//.attr('class', 'col-6')
                    $(wrapper).append(label);
                }
                $(wrapper).attr('class', 'form-group rows').attr('data-validation-name', v.name);
                input = $(wrapper).append(input);
            }
            $(that.form).append(input);
        });
    }

    addFooter() {
        let footer, saveBtn, cancelBtn;
        
        footer = document.createElement('div');
        $(footer).attr('data-role', 'footer');
        saveBtn = document.createElement('button');
        cancelBtn = document.createElement('button');
        $(saveBtn).attr('type', 'button').attr('class', 'btn btn-primary btn-confirm').html('Save');
        $(cancelBtn).attr('type', 'button').attr('class', 'btn btn-secondary btn-cancel').html('Cancel');
        $(footer).append(saveBtn, cancelBtn);

        this.footer = footer;
    }

    renderForm() {
        let wrapper, body, confirm;
        wrapper = document.createElement("div");
        body = document.createElement('div');
        confirm = document.createElement('div');

        $(body).attr('data-role', 'body');
        $(wrapper).attr('id', this.selector.replace("#", ""));
        $(confirm).attr('class', 'confirm-message');
        $(body).append(this.form, confirm);
        $(wrapper).append(body, this.footer);
        $("body").append(wrapper); 
    }

    attachEvents() {
        let that = this;
        $(this.events).each(function(i, v) {
            $(this.selector).on( "modal:show", v);
        })
    }

    static entityToOptions(categories) {
        let options = [];
        $(categories).each(function(i, v) {
            let option = {
                label: v.title,
                value: v.id
            }
            options.push(option);
        });
        return options;
    }
}