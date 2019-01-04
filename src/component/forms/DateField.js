/**
 * 日期选择
 * 2018-11-29
 * 新增属性：
 * elem：绑定元素，即控件id
 * type：日期类型，默认值为date，可选值date、datetime、time、year、month
 * range：是否日期范围选择，默认为false
 * format：日期时间格式化串，默认值为yyyy-MM-dd
 * min：最小日期，默认值为'1900-1-1'，如果值为整数类型，则表示若干天后：-7表示7天前，7表示7天后
 * max：最大日期，默认值为'2099-12-31'
 * showBottom：是否显示底部按钮，默认为true
 * btns：底部显示哪些按钮，默认值是['clear', 'now', 'confirm']，可更换顺序
 * lang：语言版本，默认值为cn，可选值有cn、en
 * theme：主题，default（默认简约）、molv（墨绿背景）、#颜色值（自定义颜色背景）、grid（格子主题）
 * ready：控件初始打开的回调，function(date)
 * change：日期时间被切换后的回调，function(value, date, endDate)
 * done：控件选择完毕后的回调，function(value, date, endDate)
 * */
var JointDateField = {
    BaseProperty: function(){
        return {
            NameEN: 'JointDateField',
            NameCN: '日期选择',
            Version: '1.0.0',
            ReleaseDate: '2018-11-29'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointDateField.GetProperty(options), JointDateField.BaseProperty());
        var macthOpt = JointDateField.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">');
        html += ('<input class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="' + defaults.inputmode + '" value="' + (defaults.value || defaults.text) + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '"/>');
        html += '</div></div>';

        //创建控件对应的对象
        eval(defaults.id + '_OBJ = defaults.obj;');
        html += ('<script>laydate.render(' + defaults.id + '_OBJ);</script>');

        return html;
    },
    GetProperty: function (options){
        return JointTextField.GetProperty(options);
    },
    MatchProperty: function (defaults) {
        var options = JointTextField.MatchProperty(defaults);
        if(defaults.readonly || defaults.viewmode){
            options.inputClass += ' layui-form-disbaled ';
        }

        return options;
    },
    GetReadState: function (id){
        //返回控件的状态，只读返回为true
        return JointTextField.GetReadState(id);
    },
    SetReadState: function(id, read){
        //设置控件的状态，true为设置为只读
        var m = $('#' + id);
        if(read){
            m.removeClass('layui-input').addClass('layui-input-readonly').attr('readonly', 'true').addClass('layui-form-disbaled');
        }
        else{
            m.removeClass('layui-input-readonly').addClass('layui-input').removeAttr('readonly').removeClass('layui-form-disbaled');
        }
    },
    GetValue: function(id){
        return JointTextField.GetValue(id);
    },
    SetValue:function (id, val){
        JointTextField.SetValue(id, val);
    }
};