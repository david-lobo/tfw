import toastr from 'toastr';

export class TreeUI {
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
            textField: 'content',
            childrenField: 'childs',
            dataSource: this.getAJAXConfig(),
            primaryKey: 'id',
            border: true
        });

        this.bindSelect();
        this.bindUnselect();
        this.bindExpand();
        this.bindButtons();
    }

    reloadQuery() {
        return {};
    }

    reload() {
        let query = this.reloadQuery();
        this.tree.reload(query);
    }

    errorCallback(entity) {
        let $widget = this;

        return function (response) {
            if (response && response.statusText && response.statusText !== 'abort') {
                toastr.error(response.statusText);
            }
        };
    }

    reloadCallback(entity) {
        return function (jqXHR, textStatus) {
            let treeUI, tree, selectedId;
            treeUI = config.page.getTrees()[entity];
            tree = treeUI.getTree();
            selectedId = treeUI.getSelectedId();

            if (selectedId && selectedId != 0) {
                let node = tree.getNodeById(selectedId);
                if (node && node !== undefined) {
                    tree.select(node);
                } else {
                    treeUI.setSelectedId(0);
                    treeUI.setSelectedEntity(null);
                }
            }

            for (let key of Object.keys(treeUI.expanded)) {  
              let mealName = treeUI.expanded[key];
              let node = tree.getNodeById(key);
              tree.expand(node);
            }
        }
    }

    selectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = config.page.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.setSelectedId(id);

            if (treeUI.getSelectedId() !== 0) {
                treeUI.setSelectedEntity(tree.getDataById(treeUI.getSelectedId()));
                $('.' + entity + ' .btn.edit, .' + entity + ' .btn.delete').prop('disabled', false);
            }
        }
    }

    unselectCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree,itemTreeUI;

            treeUI = config.page.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.setSelectedId(0);
            treeUI.setSelectedEntity(null);

            $('.' + entity + '.btn.edit, .' + entity + ' .btn.delete').prop('disabled', true);

            if (entity == 'category') {
                itemTreeUI = config.page.getTrees()['item'];
                itemTreeUI.reload();
            }
        }
    }

    expandCallback(entity) {
        return function (e, node, id) {
            let treeUI, tree;
            treeUI = config.page.getTrees()[entity];
            tree = treeUI.getTree();
            treeUI.expanded[id] = true;
        }
    }

    collapseCallback(entity) {
        return function (e, node, id) {            
            let treeUI, tree;
            treeUI = app.page.getTrees()[entity];
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