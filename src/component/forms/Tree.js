/**
 * 树
 * 2018-12-01
 * selectmode：选择模式，默认为none，可选值有radio和checkbox
 * ajaxurl：异步回调地址
 * pfieldname：父关联字段，默认FParentID
 * 自动触发事件：
 * {id}_OnClickEvent：结点单击事件
 * {id}_OnDblClickEvent：结点双击事件
 * {id}_OnRightClickEvent：结点右击事件
 * */
var JointTree = {
    BaseProperty: function(){
        return {
            NameEN: 'JointTree',
            NameCN: '树',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointTree.GetProperty(options), JointTree.BaseProperty());
        var html = ('<ul id="' + defaults.id + '" class="ztree">');
        html += (defaults.script + '</ul>');
        delete defaults.script;

        return html;
    },
    GetProperty: function (options){
        if(CheckIsNullOrEmpty(options.selectmode)){
            options.selectmode = 'none';
        }
        if(CheckIsNullOrEmpty(options.ajaxurl)){
            options.ajaxurl = '';
        }
        if(CheckIsNullOrEmpty(options.pfieldname)){
            options.pfieldname = 'FParentID';
        }
        options.script = '<script>';
        options.script += ('var ' + options.id + '_treedata =' + JSON.stringify(options.jsds) + ';');
        options.script += ('var ' + options.id + '_jsds={ MultiSelect: "' + (options.selectmode == 'checkbox' ? 'true': 'false') + '", AjaxUrl:"' + options.ajaxurl + '",ParentFieldName:"' + options.pfieldname + '", SelectMode:"' + options.selectmode + '"};');
        options.script += ('JointTree.GetInitNodes("' + options.id + '", function (id, data) { JointTree.Initialize(id, data); });');
        options.script += '</script>';

        return options;
    },
    Initialize: function (id, zNodes) {
        var obj = eval(id + "_jsds");
        var setting = {
            view: {
                selectedMulti: obj.MultiSelect
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "FID",
                    pIdKey: "FParentID",
                    rootPId: 0
                },
                key: {
                    checked: "FChecked", //默认选中
                    name: "FName",
                    title: "FName"
                }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    var fn = id + "_OnClickEvent", fn2 = null;
                    try { fn2 = eval(fn) } catch (ex) { fn2 = fn; }
                    if (CheckIsJsFunction(fn2)) {
                        return fn2(event, treeId, treeNode);
                    }
                },
                onDblClick: function (event, treeId, treeNode) {
                    var fn = id + "_OnDblClickEvent", fn2 = null;
                    try { fn2 = eval(fn) } catch (ex) { fn2 = fn; }
                    if (CheckIsJsFunction(fn2)) {
                        return fn2(event, treeId, treeNode);
                    }
                },
                onRightClick: function (event, treeId, treeNode) {
                    var fn = id + "_OnRightClickEvent", fn2 = null;
                    try { fn2 = eval(fn) } catch (ex) { fn2 = fn; }
                    if (CheckIsJsFunction(fn2)) {
                        return fn2(event, treeId, treeNode);
                    }
                },
                onAsyncSuccess: function (event, treeId, treeNode, msg) {
                    //var treeValue = treeNode.id + "," + treeNode.name;
                }
            },
            check: {
                enable: obj.SelectMode == "none" ? false : true, //是否显示勾选按钮
                chkStyle: obj.SelectMode, //checkbox或radio
                chkboxType: { "Y": "ps", "N": "ps" } //勾选操作，只影响父级节点；取消勾选操作，只影响子级节点
            },
            edit: {
                enable: false
            }
        };

        $.fn.zTree.init($("#" + id), setting, zNodes);
    },
    GetInitNodes: function (id, fn) {
        var obj = eval(id + "_jsds");
        //var _dataSingle = getRequestUrl();
        //_dataSingle.FParentID = 0;

        //这里只是模拟ajax回调返回数据，实际使用时需从ajaxurl中获取数据
        //var ajaxurl = obj.AjaxUrl || '默认url';
        //$.post(ajaxurl, function (AjaxResult) {
        //JointCombobox.AsynCallBack(AjaxResult);
        //});
        var jointResult = eval(id + '_treedata');
        return fn(id, jointResult);
    },
    GetSelectNodes: function (id) {
        //获取选中的节点
        var treeObj = $.fn.zTree.getZTreeObj(id);

        return treeObj.getSelectedNodes();
    },
    GetCheckedNodes: function (id, checked) {
        var treeObj = $.fn.zTree.getZTreeObj(id);

        return treeObj.getCheckedNodes(checked);
    },
    GetNodeById: function (id, nodeId) {
        //通过节点Id，选中节点
        var treeObj = $.fn.zTree.getZTreeObj(id);

        return treeObj.getNodeByTId(nodeId);
    },
    GetNodes: function (id) {
        //返回根节点的所有子节点
        var treeObj = $.fn.zTree.getZTreeObj(id);

        return treeObj.getNodes();
    },
    ExpandAll: function (id) {
        //展开所有节点
        var treeObj = $.fn.zTree.getZTreeObj(id);

        treeObj.expandAll(true);
    },
    ExpandAllByNodeId: function (id, nodeId) {
        //展开指定节点的所有子节点
        var treeObj = $.fn.zTree.getZTreeObj(id);
        var node = treeObj.getNodeByTId(nodeId);

        treeObj.expandNode(node, true, true, true);
    },
    GetParentNodeValue: function (id) {
        //返回父节点的值
        var treeObj = $.fn.zTree.getZTreeObj(id);
        var sNodes = treeObj.getSelectedNodes();
        var nodeID = -1;
        if (sNodes.length > 0) {
            var node = sNodes[0].getParentNode();
            if (node != null && node != undefined) {
                nodeID = node.id;
            }
        }
        return nodeID;
    },
    IsParentNode: function (id) {
        //返回当前节点是否为父节点
        var treeObj = $.fn.zTree.getZTreeObj(id);
        var sNodes = treeObj.getSelectedNodes();
        var isParent = false;
        if (sNodes.length > 0) {
            isParent = sNodes[0].isParent;
        }

        var nodes = treeObj.getNodesByFilter(function (node_) {   //返回父节点为当前结点的所有子节点
            return node_.pId == sNodes[0].id;
        });

        return isParent && nodes.length > 0;
    }
};