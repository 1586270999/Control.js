/**
 * 动态下拉框
 * 2019-12-01
 * 新增属性：
 * asynload：是否异步加载，默认值为false
 * asynonce：异步回调时，是否只回调一次，默认值为false
 * pagecount：每页展示条数，默认值为25
 * showpager：是否显示分页条，默认值为true
 * maxwidth：下拉框最大宽度，默认300
 * maxheight：下拉框最大高度，默认300
 * 自动触发事件：
 * {id}_OnClientChange：下拉选项改变后触发事件
 * */
var JointDynaminCombox = {
    BaseProperty: function(){
        return {
            NameEN: 'JointDynaminCombox',
            NameCN: '动态下拉框',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointDynaminCombox.GetProperty(options), JointDynaminCombox.BaseProperty());
        var macthOpt = JointDynaminCombox.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">');
        html += ('<input class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="text" value="' + defaults.text + '" lay-value="' + defaults.value + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '"/>');
        html += ('<i class="layui-icon layui-icon-triangle-d" style="top: 20%; right: 7px; color: rgb(194, 194, 194); position: absolute; cursor: pointer;" onclick="JointDynaminCombox.Show(\'' + defaults.id + '\', true);$(\'#' + defaults.id + '\').focus();"></i>');
        html += '</div></div>';

        //创建控件对应的对象
        eval(defaults.id + "_RowData=options.rowdata;");
        eval(defaults.id + "_OBJ = {IsAsynDataLoad:'" + defaults.asynload + "',IsOnlyAsynOnce:'" + defaults.asynonce + "', ShowCountOnce:'" + defaults.pagecount + "',IsShowIntable:'" + defaults.intable + "',ShowIntableID:'" + defaults.intableid + "',IsShowPager: '" + defaults.showpager + "',ComboboxMaxWidth: '" + defaults.maxwidth + "',ComboboxMaxHeight: '" + defaults.maxheight + "'};");

        return html;
    },
    GetProperty: function (options) {
        var options = JointTextField.GetProperty(options);
        options.onfocus = 'JointDynaminCombox.Init(\'' + options.id + '\');;';
        options.onkeyup = 'JointDynaminCombox.OnKeyUp(\'' + options.id + '\');';
        if(CheckIsNullOrEmpty(options.asynload)){
            options.asynload = false;
        }
        if(CheckIsNullOrEmpty(options.asynonce)){
            options.asynonce = false;
        }
        if(CheckIsNullOrEmpty(options.pagecount)){
            options.pagecount = 25;
        }
        if(CheckIsNullOrEmpty(options.showpager)){
            options.showpager = true;
        }
        if(CheckIsNullOrEmpty(options.maxwidth)){
            options.maxwidth = 300;
        }
        if(CheckIsNullOrEmpty(options.maxheight)){
            options.maxheight = 300;
        }

        return options;
    },
    MatchProperty: function (defaults){
        var options = JointTextField.MatchProperty(defaults);
        options.inputClass = (defaults.readonly ? 'layui-input-readonly' : 'layui-input tableInput');
        if(defaults.asynload){
            options.attribute += ('AsynDataLoad="true" ');
        }
        if(defaults.asynonce){
            options.attribute += ('OnlyAsynOnce="true" ');
        }

        return options;
    },
    GetReadState: function (id){
        //返回控件的状态，只读返回为true
        return JointTextField.GetReadState(id);
    },
    SetReadState: function(id, read){
        //设置控件的状态，true为设置为只读
        JointTextField.SetReadState(id, read);
    },
    GetValue: function(id){
        var m = $('#' + id);
        return {
            Value: m.attr('lay-value'),
            Text: m.val()
        };
    },
    SetValue:function (id, val){
        var m = $('#' + id);
        m.attr('lay-value', val.Value).val(val.Text);
    },
    IsOnlyAsynOnce: false,
    ShowCountOnce: 20,
    Init: function (id) {
        var data = null;
        try{
            data = eval(id + "_JSDS");
        }
        catch (e) {
            eval(id + "_JSDS=[];");
            data = [];
        }
        var obj = eval(id + "_OBJ");
        if ($("#" + id).attr("init") != "true") {
            if (obj.IsAsynDataLoad == "true") {
                JointDynaminCombox.GcmGetData(id, "");
            }
            else {
                JointDynaminCombox.CreateTable(id, data);
            }

            $("#" + id).attr("init", "true");
        }
    },
    OnKeyUp: function (id) {
        if (event == undefined)
            event = window.event;

        switch (event.keyCode) {
            case 37: //←
            case 39: //→
                break;
            case 38: //↑
                if ($("#" + id + "_DropDiv").css("display") == "none")
                    return false;

                var dthis = $(".layctrl-" + id + "_Table .selected");
                if (dthis.length == 0) {
                    $(".layctrl-" + id + "_Table tr:first").addClass("selected");
                }
                else {
                    var index = dthis.attr("data-index") * 1;
                    var pthis = $(".layctrl-" + id + "_Table tr[data-index=" + (index - 1) + "]");
                    if (pthis.length > 0) {
                        dthis.removeClass("selected");
                        pthis.addClass("selected");

                        var pa = $(".layctrl-" + id + "_Table").parent();
                        JointDynaminCombox.SetScrollTop(id, dthis.position().top - pa.height() + dthis.height() + 60);
                    }
                }
                break;
            case 40: //↓
                if ($("#" + id + "_DropDiv").css("display") == "none")
                    return false;

                var dthis = $(".layctrl-" + id + "_Table .selected");
                if (dthis.length == 0) {
                    $(".layctrl-" + id + "_Table tr:first").addClass("selected");
                }
                else {
                    var index = dthis.attr("data-index") * 1;
                    var pthis = $(".layctrl-" + id + "_Table tr[data-index=" + (index + 1) + "]");
                    if (pthis.length > 0) {
                        dthis.removeClass("selected");
                        pthis.addClass("selected");

                        var pa = $(".layctrl-" + id + "_Table").parent();
                        JointDynaminCombox.SetScrollTop(id, dthis.position().top - pa.height() + dthis.height() + 60);
                    }
                }
                break;
            case 13: //Enter  回车默认选中第一行
                if ($("#" + id + "_DropDiv").css("display") == "none")
                    return false;

                var v = "", t = "";
                var mt = $(".layctrl-" + id + "_Table .selected");
                if (mt.length > 0) {
                    JointDynaminCombox.RowClick(id, mt);
                }
                else {
                    var fr = $(".layctrl-" + id + "_Table .tr:first");
                    if (fr.length > 0) {
                        JointDynaminCombox.RowClick(id, fr);
                    }
                }
                break;
            case 113:  //F2
                JointDynaminCombox.Show(id, true);
                break;
            default:
                setTimeout("JointDynaminCombox.Filter(\"" + id + "\")", 300);
                break;
        }
    },
    SetScrollTop: function (id, top) {
        $(".layctrl-" + id + "_Table").parent().scrollTop(top);
    },
    Hide: function (id) {
        $("#" + id + "_Table").parent().hide();
    },
    Show: function (id, toggle) {
        var elem = $("#" + id), top = elem.offset().top + elem.outerHeight() + "px", left = elem.offset().left + "px";
        $('#' + id + '_DropDiv').css('left', left).css('top', top);

        if (!toggle) {
            $("#" + id + "_Table").parent().show();
        }
        else {
            if ($("#" + id + "_Table").parent().css('display') == 'block') {
                $("#" + id + "_Table").parent().hide();
            }
            else {
                $("#" + id + "_Table").parent().show();
            }
        }
    },
    RowClick: function (id, row) {
        $(row).addClass('selected');
        eval("var rowdata = " + id + "_Table_DataSource.data[$(row).attr('data-index')];");

        var t = rowdata.FName, v = rowdata.FID; //暂时固定死
        $("#" + id).val(t);
        $("#" + id).attr("lay-value", v);
        $("#" + id).focus();
        JointDynaminCombox.Hide(id);

        //扩展事件
        var obj = eval(id + "_OBJ");
        if (obj.IsShowIntable == 'true') {
            JointLayEditTable.InnnerControlSelectChange(obj.ShowIntableID, v, t, rowdata);
        }
        else {
            var fn = obj.OnClientChange;
            if (!CheckIsNullOrEmpty(fn)) {
                var fn2 = null;
                try { fn2 = eval(fn) } catch (ex) { fn2 = fn; }
                if (CheckIsJsFunction(fn2)) {
                    fn2(id, v, t, rowdata);
                }
            }
        }
    },
    CreateTable: function (id, data) {
        var elem = $("#" + id), top = elem.offset().top + elem.outerHeight() + "px", left = elem.offset().left + "px";
        if ($("#" + id + "_Table").length == 0) {
            var _html = '<div id="' + id + '_DropDiv" class="comboboxtable layui-anim layui-anim-upbit" style="left:' + left + ';top:' + top + ';"><table id="' + id + '_Table"></table></div>';
            $('body').append($(_html));
        }

        var obj = eval(id + "_OBJ");
        var tableobj = {
            elem: "#" + id + "_Table",
            cols: eval(id + "_RowData"),
            done: function (res, curr, count) {
                eval(id + "_Table_DataSource = res;");
                JointDynaminCombox.InitEvent(id);
                var fn = id + "_AfterDoData";
                var fn2 = null;
                try { fn2 = eval(fn) } catch (ex) { fn2 = fn; }
                if (CheckIsJsFunction(fn2)) {
                    fn2(res, curr, count);
                }
            },
            loading: false,
            height: obj.ComboboxMaxHeight,
            width: obj.ComboboxMaxWidth,
            page: (obj.IsShowPager == "false" ? "false" : {
                theme: '#1E9FFF',
                layout: ['prev', 'next', 'count'],
                prev: '<i class="layui-icon layui-icon-prev" title="上一页"></i>',
                next: '<i class="layui-icon layui-icon-next" title="下一页"></i>',
                groups: 3
            }),
            limit: JointDynaminCombox.ShowCountOnce,
            data: data,
            size: 'sm'
        };
        JointLayTable.render(tableobj);
        JointDynaminCombox.Show(id);

        var lastpk = $("#" + id).attr("lay-value");
        if(!CheckIsNullOrEmpty(lastpk)){
            $(".layctrl-" + id + "_Table tr[data-index=" + lastpk + "]").addClass("selected");
        }
    },
    InitEvent: function (id) {
        var obj = eval(id + "_JSDS");

        //行选择事件
        $('.layctrl-' + id + '_Table tr').click(function () {
            $('.layctrl-' + id + '_Table tr.selected').removeClass('selected');
            JointDynaminCombox.RowClick(id, this);
        });

        //点击其他区域关闭
        $(document).mouseup(function (e) {
            var userSet_con = $('#' + id + ',#' + id + '_DropDiv');
            if (!userSet_con.is(e.target) && userSet_con.has(e.target).length === 0) {
                JointDynaminCombox.Hide(id);
            }
        });
    },
    Filter: function (id) {
        var data = eval(id + "_JSDS");
        var obj = eval(id + "_OBJ");
        var keywords = $("#" + id).val();

        if (obj.IsAsynDataLoad == "true") {
            if (keywords != "") {
                JointDynaminCombox.GcmGetData(id, keywords);
            }
            else {
                JointDynaminCombox.CreateTable(id, data);
                JointDynaminCombox.Show(id);
            }
        }
        else {
            if (keywords == "")
                JointDynaminCombox.CreateTable(id, data);
            else
                JointDynaminCombox.CreateTable(id, JointDynaminCombox.FilterData(data, keywords));

            JointDynaminCombox.Show(id);
        }
    },
    GcmGetData: function (id, keywords) {
        var obj = eval(id + "_OBJ");
        var expr = {
            ShowMask: false,
            CommandName: "ACT_ASYNDATALOAD",
            FFuncID: obj.QueryFFuncID,
            DataM: {
                KeyWords: keywords,
                CtrlID: id
            }
        };
        JointManage.AjaxMethod(expr, function (AjaxResult) {
            //成功后执行
            JointDynaminCombox.AsynCallBack(AjaxResult);
        }, function (AjaxResult) {
            //失败后执行
            alert("异步加载数据源发生错误！错误描述：" + AjaxResult);
        });
    },
    FilterData: function (data, keywords) {
        var mdata = new Array();
        var d = 0;
        for (var c = 0; c < data.length; c++) {
            var find = false;
            //循环每一个属性判断是否存在关键词
            $.each(data[c], function (key, value) {
                if (value.toString().toLowerCase().search(keywords.toString().toLowerCase()) > -1) {
                    find = true;
                    mdata[d] = data[c];
                    d++;
                }

                return !find;
            });
        }

        return mdata;
    },
    AsynCallBack: function (AjaxResult) {
        var data = AjaxResult.DataM;
        var id = data.ctrlId;
        var obj = eval(id + "_OBJ");

        var newdata = eval(data.JSDS);
        eval(id + "_JSDS = newdata;");

        JointDynaminCombox.CreateTable(id, newdata);
        JointDynaminCombox.Show(id);
    }
};