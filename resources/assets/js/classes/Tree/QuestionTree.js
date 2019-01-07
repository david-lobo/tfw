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
        let addForm, fn, that, callback, data;

        addForm = config.page.forms['add'];
        fn = addForm.showModal();
        that = this;
        callback = function(event) {
            let data, treeUI, tree, parentId, entity, target, action, newURL, form, fn, record;

            parentId = config.question.id;
            treeUI = config.page.getTrees()['question'];
            tree = treeUI.getTree();

            if (treeUI.getSelectedId() !== 0) {
                entity = treeUI.getSelectedEntity();
                parentId = entity.id;

                target = $( event.target );
                if (target.is("i")) {
                    target = target.parent();
                }

                action = target.attr('data-action');
                if (undefined !== action) {
                    if ('check' === action) {
                        newURL = config.routes.checks + '/' + entity.id;
                        window.location = newURL;
                    } else if (config.page.forms.hasOwnProperty(action)) {
                        form = config.page.forms[action];
                        fn = form.showModal();
                        record = {};

                        if ('add' === action) {
                            record = {parent_id: parentId};
                        } else {
                            record = entity;
                        }

                        fn({data: {record: record}});
                    }
                }
             }  
        };

        data = {};

        $('.toolbar button').on('click', data, callback);
    }

    reloadQuery() {
        return super.reloadQuery();
    }

    selectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = config.page.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.setSelectedId(id);

            if (treeUI.getSelectedId() !== 0) {
                treeUI.setSelectedEntity(tree.getDataById(treeUI.getSelectedId()));
                QuestionTree.showToolbar(treeUI.getSelectedEntity());
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

            QuestionTree.showToolbar(null);
        }
    }

    static showToolbar(entity) {
        if (entity === null) {
            $('.toolbar .btn').prop('disabled', true);
            return false;
        }

        if (entity.parent_id == null && entity.childs.length !== 0) {
            $('.toolbar .btn').prop('disabled', true);
            $('.toolbar .check.btn').prop('disabled', false);
        } else {
            $('.toolbar .btn').prop('disabled', false);
        }
    }
}