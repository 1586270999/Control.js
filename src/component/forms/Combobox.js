/**
 * 下拉框
 * 2018-11-29
 * 新增属性：
 * filter：是否允许快捷过滤，默认值为true
 * asynload：是否异步加载，默认值为false
 * asynonce：异步回调时，是否只回调一次，默认值为false
 * pagecount：每页展示条数，默认值为25
 * ajaxurl：异步回调地址，可配置，也可在回调时固定地址，这里暂不处理
 * targetid：目标控件id
 * 自动触发事件：
 * {id}_OnClientChange：下拉选项改变后触发事件
 * */
var JointCombobox = {
    BaseProperty: function(){
        return {
            NameEN: 'JointCombobox',
            NameCN: '下拉框',
            Version: '1.0.0',
            ReleaseDate: '2018-11-29'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointCombobox.GetProperty(options), JointCombobox.BaseProperty());
        var macthOpt = JointCombobox.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">');
        html += '<div class="layui-unselect layui-form-select">';
        html += '<div class="layui-select-title">';
        html += ('<input class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="text" value="' + defaults.text + '" lay-value="' + defaults.value + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '"/>');
        html += '<i class="layui-edge"></i></div>';
        html += ('<dl class="layui-anim layui-anim-upbit" id="' + defaults.id + '_dl">');
        html += '</dl></div></div></div>';

        //创建控件对应的对象
        eval(defaults.id + '_JSDS = options.jsds;');
        eval(defaults.id + "_OBJ = {IsAsynDataLoad:'" + defaults.asynload + "',IsOnlyAsynOnce:'" + defaults.asynonce + "', ShowCountOnce:'" + defaults.pagecount + "',IsShowIntable:'" + defaults.intable + "',ShowIntableID:'" + defaults.intableid + "',AjaxUrl:'" + defaults.ajaxurl + "'};");

        return html;
    },
    GetProperty: function (options){
        var options = JointTextField.GetProperty(options);
        options.onfocus = 'JointCombobox.Show(this);';
        options.onblur = 'JointCombobox.Blur(this);';
        options.onclick = 'JointCombobox.Show(this);';
        options.onkeyup = 'JointCombobox.KeyUp(event, this);';
        if(CheckIsNullOrEmpty(options.asynload)){
            options.asynload = false;
        }
        if(CheckIsNullOrEmpty(options.asynonce)){
            options.asynonce = false;
        }
        if(CheckIsNullOrEmpty(options.targetid)){
            options.targetid = options.id;
        }
        if(CheckIsNullOrEmpty(options.filter)){
            options.filter = true;
        }
        if(CheckIsNullOrEmpty(options.ajaxurl)){
            options.ajaxurl = '';
        }
        if(CheckIsNullOrEmpty(options.pagecount)){
            options.pagecount = 25;
        }

        return options;
    },
    MatchProperty: function (defaults){
        var options = JointTextField.MatchProperty(defaults);
        options.inputClass = (defaults.readonly ? 'layui-input-readonly' : 'layui-input layui-unselect');
        if(defaults.asynload){
            options.attribute += ('AsynDataLoad="true" ');
        }
        if(defaults.asynonce){
            options.attribute += ('OnlyAsynOnce="true" ');
        }
        options.attribute += ('target-control="' + defaults.targetid + '" ');
        options.attribute += ('layid="' + defaults.id + '" ');

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
    Init: function (mthis) {
        var cthis = $(mthis);
        var targetid = cthis.attr("target-control");
        var data = eval(targetid + "_JSDS");
        var obj = eval(targetid + "_OBJ");
        var dl = cthis.parent().next();

        if (dl.attr("init") != "true" || (obj.IsAsynDataLoad == "true" && dl.attr("load") != "true")) {
            if (data.length > 0) {
                var pagecount = 0;
                if (obj.IsAsynDataLoad == "true") {
                    pagecount = obj.ShowCountOnce;
                }

                JointCombobox.CreateTable(dl, data, pagecount);
            }

            dl.hover(function () {
                dl.addClass('aComboboxHover');
            }, function () {
                dl.removeClass('aComboboxHover');
            });

            dl.mousedown(function (nthis) {
                var data = eval(targetid + "_JSDS");
                var cthis = $("dl").find("dd[class=layui-this]");
                if (cthis.length == 0) {
                    $(nthis.target).addClass("layui-this");
                }
                else {
                    cthis.removeClass("layui-this");
                    $(nthis.target).addClass("layui-this");
                }

                if (nthis.target.childNodes.length == 1) {
                    var v = $(nthis.target).attr("lay-value");
                    var t = nthis.target.innerText;
                    var i = $(nthis.target).attr("lay-index");
                    $(this).parent().find("input").val(t);
                    $(this).parent().find("input").attr("lay-value", v);
                    JointCombobox.OnClientChange(mthis, t, v, data[i].Values);
                }

                JointCombobox.Hide(mthis);
            });

            dl.attr("init", "true");
            dl.attr("load", "true");
            dl.css("height", "200px");
        }
    },
    CreateTable: function (dl, data, pagecount) {
        var listHtml = '';
        for (var c = 0; c < data.length; c++) {
            if (pagecount == 0 || c < pagecount) {
                listHtml += '<dd lay-index="' + c + '" lay-value="' + data[c].Value + '">' + data[c].Text + '</dd>';
            }
            else {
                break;
            }
        }

        dl.html(listHtml);
    },
    Show: function (mthis, toggle) {
        if($(mthis).hasClass('layui-input-readonly')){
            return false;
        }
        JointCombobox.Init(mthis);
        var layvalue = $(mthis).attr("lay-value");
        var dl = $(mthis).parent().next();
        if (!toggle) {
            if (dl.css("display") != "block") {
                dl.find("dd.layui-this").removeClass("layui-this");
                if(layvalue != ''){
                    dl.find("dd[lay-value=" + layvalue + "]").addClass("layui-this");
                }
            }
            if (dl.find("dd").length == 0) {
                JointCombobox.Filter($(mthis).attr("layid"));
            }
            dl.css("display", "block");
            dl.parent().addClass("layui-form-selected");
        }
        else {
            if (dl.css('display') == 'block') {
                JointCombobox.Hide(mthis);
            }
            else {
                if (dl.css("display") != "block") {
                    dl.find("dd.layui-this").removeClass("layui-this");
                    if (layvalue != '') {
                        dl.find("dd[lay-value=" + layvalue + "]").addClass("layui-this");
                    }
                }
                if (dl.find("dd").length == 0) {
                    JointCombobox.Filter($(mthis).attr("layid"));
                }
                dl.css("display", "block");
                dl.parent().addClass("layui-form-selected");
            }
        }
    },
    Hide: function (mthis) {
        var dl = $(mthis).parent().next();
        dl.css("display", "none");
        dl.parent().removeClass("layui-form-selected");
    },
    KeyUp: function (event, mthis) {
        var targetid = $(mthis).attr("target-control");
        var obj = eval(targetid + "_OBJ");
        var data = eval(targetid + "_JSDS");

        if (event == undefined)
            event = window.event;

        switch (event.keyCode) {
            case 37: //←
            case 39: //→
                break;
            case 38: //↑
                JointCombobox.MoveUp(mthis);
                break;
            case 40: //↓
                if (!obj.IsShowIntable) {
                    JointCombobox.Show(mthis);
                    JointCombobox.MoveDown(mthis);
                }
                else {
                    if ($(mthis).parent().next().css('display') == 'block') {
                        JointCombobox.MoveDown(mthis);
                    }
                }
                break;
            case 13: //Enter
                var nthis = $(mthis).parent().next().find("dd[class=layui-this]");
                if (nthis.length > 0) {
                    var v = nthis.attr("lay-value");
                    var t = nthis[0].innerText;
                    var i = nthis.attr("lay-index");
                    $(mthis).val(t);
                    $(mthis).attr("lay-value", v);
                    JointCombobox.OnClientChange(mthis, t, v, data[i].Values);
                    JointCombobox.Hide(mthis);
                }
                break;
            case 113: //F2
                JointCombobox.Show(mthis, true);
                break;
            default:
                setTimeout("JointCombobox.Filter(\"" + $(mthis).attr("layid") + "\")", 200);
                break;
        }
    },
    MoveUp: function (mthis) {
        var dl = $(mthis).parent().next();
        var dthis = dl.find("dd[class=layui-this]");
        if (dthis.length == 0) {
            dl.find("dd[lay-index=0]").addClass("layui-this");
        }
        else {
            var index = dthis.attr("lay-index") * 1;
            var pthis = dl.find("dd[lay-index=" + (index - 1) + "]");
            if (pthis.length > 0) {
                dthis.removeClass("layui-this");
                pthis.addClass("layui-this");
            }

            dl.scrollTop((index - 1) * 35);
        }
    },
    MoveDown: function (mthis) {
        var dl = $(mthis).parent().next();
        var dthis = dl.find("dd[class=layui-this]");
        if (dthis.length == 0) {
            dl.find("dd[lay-index=0]").addClass("layui-this");
        }
        else {
            var index = dthis.attr("lay-index") * 1;
            var nthis = dl.find("dd[lay-index=" + (index + 1) + "]");
            if (nthis.length > 0) {
                dthis.removeClass("layui-this");
                nthis.addClass("layui-this");
            }

            dl.scrollTop(index * 35);
        }
    },
    Blur: function (mthis) {
        var dl = $(mthis).parent().next();
        if (!dl.hasClass('aComboboxHover')) {
            JointCombobox.Hide(mthis);
        }
    },
    Filter: function (layid) {
        var cthis = $("input[layid=" + layid + "]");;
        var targetid = cthis.attr("target-control");
        var data = eval(targetid + "_JSDS");
        var obj = eval(targetid + "_OBJ");
        var dl = cthis.parent().next();
        var keywords = cthis.val();
        var asyn = obj.IsAsynDataLoad == "true", asynonce = obj.IsOnlyAsynOnce == "true", load = cthis.attr("load") == "true";

        if ((asyn && asynonce && !load) || (asyn && !asynonce)) {
            var fn2 = null;
            var opt = {
                KeyWords: keywords,
                CtrlID: cthis.attr("layid")
            };
            try {
                fn2 = eval(targetid + "_GetCallbackOpts");

                opt = fn2(opt);
            } catch (ex) { }

            if (opt == false) {
                return false;
            }
            var dataMain = opt;
            dataMain.KeyWords = keywords;
            dataMain.CtrlID = layid;

            //这里只是模拟ajax回调返回数据，实际使用时需从ajaxurl中获取数据
            //var ajaxurl = obj.AjaxUrl || '默认url';
            //$.post(ajaxurl, function (AjaxResult) {
            //JointCombobox.AsynCallBack(AjaxResult);
            //});
            JointCombobox.AsynCallBack(provincedata);
        }
        else {
            var newdata = JointCombobox.FilterData(data, keywords);
            if (newdata.length > 0) {
                var pagecount = 0;
                if (obj.IsAsynDataLoad == "true") {
                    pagecount = obj.ShowCountOnce;
                }

                JointCombobox.CreateTable(dl, newdata, pagecount);
            }
            else {
                dl.html('');
            }
        }

        dl.css("display", "block");
        dl.parent().removeClass("layui-form-selected");
    },
    FilterData: function (data, keywords) {
        var mdata = new Array();
        var d = 0;
        for (var c = 0; c < data.length; c++) {
            var find = false;
            //循环每一个属性判断是否存在关键词
            if(!CheckIsNullOrEmpty(data[c].Values)){
                $.each(data[c].Values, function (key, value) {
                    if (value.toLowerCase().search(keywords.toLowerCase()) > -1) {
                        find = true;
                        mdata[d] = data[c];
                        d++;
                    }

                    return !find;
                });
            }
            else{
                if(data[c].Value.toString().toLowerCase().search(keywords.toLowerCase()) > -1 || data[c].Text.toLowerCase().search(keywords.toLowerCase()) > -1){
                    find = true;
                    mdata[d] = data[c];
                    d++;
                }
            }
        }

        return mdata;
    },
    AsynCallBack: function (AjaxResult) {
        var data = AjaxResult.DataM;
        var layid = data.ctrlId;
        var cthis = $("input[layid=" + layid + "]");
        var targetid = cthis.attr("target-control");
        var obj = eval(targetid + "_OBJ");
        var dl = $(cthis).parent().next();

        var newdata = eval(data.JSDS);
        eval(targetid + "_JSDS=newdata;");
        if (newdata.length > 0) {
            var pagecount = 0;
            if (obj.IsAsynDataLoad == "true") {
                pagecount = obj.ShowCountOnce;
            }

            JointCombobox.CreateTable(dl, newdata, pagecount);
            var layvalue = $(cthis).attr("lay-value");
            if(layvalue != ''){
                dl.find("dd[lay-value=" + layvalue + "]").addClass("layui-this");
            }
            cthis.attr("load", "true");
        }
        else {
            dl.html('');
        }
    },
    OnClientChange: function (mthis, t, v, d) {
        var id = $(mthis).attr("target-control");
        var obj = eval(id + "_OBJ");

        if (obj.IsShowIntable == 'true') {
            JointLayEditTable.InnnerControlSelectChange(obj.ShowIntableID, v, t, d);
        }
        else {
            var fn = id + "_OnClientChange", fn2 = null;
            try { fn2 = eval(fn) } catch (ex) { fn2 = fn; }
            if (CheckIsJsFunction(fn2)) {
                fn2(id, v, t, d);
            }
        }
    }
};