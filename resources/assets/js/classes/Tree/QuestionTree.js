import {TreeUI} from './TreeUI';

export class QuestionTree extends TreeUI {
    constructor(el, entity, url) {
        super(el, entity, url);
    }

    init() {
        super.init();

        QuestionTree.showToolbar(null);
    }

    bindButtons() {
        console.log('QuestionTree.bindButtons 1.1');

        let addForm = config.page.forms['add'];

        let fn = addForm.showModal();
        let that = this;
        let callback = function(event) {
            let treeUI, tree, parentId, entity;

            parentId = config.question.id;

            treeUI = config.page.getTrees()['question'];
            console.log(treeUI);
            tree = treeUI.getTree();
            //treeUI.setSelectedId(id);

            console.log('QuestionTree.bindButtons 1.2');

            if (treeUI.getSelectedId() !== 0) {
                console.log('QuestionTree.bindButtons 1.3');
                //treeUI.setSelectedEntity(tree.getDataById(treeUI.getSelectedId()));
                entity = treeUI.getSelectedEntity();
                parentId = entity.id;

                var target = $( event.target );
                if (target.is("i")) {
                    target = target.parent();
                }

                let action = target.attr('data-action');
                console.log('QuestionTree.bindButtons 1.3.1', action, event.target, event);
                if (undefined !== action) {
                    console.log('QuestionTree.bindButtons 1.4', action);

                    if ('check' === action) {
                        //var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
                        let newURL = config.routes.checks + '/' + entity.id;
                        console.log('newURL', newURL);
                        window.location = newURL;
                    } else if (config.page.forms.hasOwnProperty(action)) {
                    
                        let form = config.page.forms[action];
                        let fn = form.showModal();
                        let record = {};

                        if ('add' === action) {
                            record = {parent_id: parentId};
                        } else {
                            record = entity;
                        }

                        fn({data: {record: record}});
                    }
                    
                }
                 
                console.log('forms', config.page.forms);
                console.log('bindButtons Callback', action, treeUI.getSelectedEntity());
             }  
        };

        //let data = {record: {parent_id: config.question.id}, callback: function() {console.log('test123');}};
        //let callback = 'test123';

        let data = {};

        $('.toolbar button').on('click', data, callback);

    }

    reloadQuery() {
        return super.reloadQuery();
    }

    selectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = config.page.getTrees()[entity];
            console.log(treeUI);
            tree = treeUI.getTree();
            treeUI.setSelectedId(id);

            if (treeUI.getSelectedId() !== 0) {
                treeUI.setSelectedEntity(tree.getDataById(treeUI.getSelectedId()));

                console.log('selectCallback', treeUI.getSelectedEntity());
                QuestionTree.showToolbar(treeUI.getSelectedEntity());
                //$('.' + entity + ' .btn.edit, .' + entity + ' .btn.delete').prop('disabled', false);
                /*if (entity == 'category') {
                    let itemTreeUI = config.page.getTrees()['item'];
                    itemTreeUI.reload();
                }*/
            }
        }
    }

    unselectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = config.page.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.setSelectedId(0);
            treeUI.setSelectedEntity(null);

            //$('.' + entity + '.btn.edit, .' + entity + ' .btn.delete').prop('disabled', true);

            QuestionTree.showToolbar(null);
        }
    }

    static showToolbar(entity) {
        if (entity === null) {
            $('.toolbar .btn').prop('disabled', true);
            return false;
        }

        if (entity.parent_id == null) {
            $('.toolbar .btn').prop('disabled', true);
            $('.toolbar .check.btn').prop('disabled', false);
        } else {
            $('.toolbar .btn').prop('disabled', false);
        }
    }

}