/**
 * 复选框组
 * 2018-11-29
 * 新增属性：
 * columns：每行显示几个选项，默认为4
 * skin：呈现样式风格，默认为原始风格primary，可设置为开关风格switch
 * */
var JointCheckBoxGroup = {
    BaseProperty: function(){
        return {
            NameEN: 'JointCheckBoxGroup',
            NameCN: '复选框组',
            Version: '1.0.0',
            ReleaseDate: '2018-11-29'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointCheckBoxGroup.GetProperty(options), JointCheckBoxGroup.BaseProperty());
        var macthOpt = JointCheckBoxGroup.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += '<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>';
        }
        html += '<div class="' + macthOpt.inputClass1 + '" id="' + defaults.id + '" ' + macthOpt.attribute1 + ' style="width:' + defaults.inputwidth + 'px;max-width:' + defaults.inputwidth + 'px;">';
        var ary = options.jsds;
        for(var c = 0; c < ary.length; c++) {
            var attribute2 = (macthOpt.attribute2 + ('lay-text="' + ary[c].Text + '" '));
            var checked = (defaults.value.search(ary[c].Value) > -1), inputClass2 = '';
            attribute2 += (checked ? ('checked="true" lay-value="1" ') : ('lay-value="0" '));
            if(defaults.skin == 'primary'){
                inputClass2 = ('layui-unselect layui-form-checkbox' + (checked ? ' layui-form-checked' : ''));
                attribute2 += ('lay-skin="primary" ');
            }
            else{
                inputClass2 = ('layui-unselect layui-form-checkbox' + (checked ? ' layui-form-checked' : ''));
            }
            html += ('<div onclick="fnSwitch2State(this);" class="' + inputClass2 + '" id="' + defaults.id + '_' + c + '" style="' + macthOpt.inputStyle + '" ' + attribute2 + ' clstype="' + defaults.NameEN + '" value="' + ary[c].Value + '">');
            if (defaults.skin == 'primary') {
                html += ('<span>' + ary[c].Text + '</span><i class="layui-icon layui-icon-ok"></i>');
            }
            else {
                html += ('<span>' + ary[c].Text + '</span><i class="layui-icon layui-icon-ok"></i>');
            }
            html += '</div>';
        }
        html += '</div></div>';
        return html;
    },
    GetProperty: function (options) {
        var options = JointTextField.GetProperty(options);
        if(CheckIsNullOrEmpty(options.skin)){
            options.skin = 'primary'; //默认原始风格，而非开关
        }
        if(CheckIsNullOrEmpty(options.checked)){
            options.checked = false; //选中状态，默认非选中
        }
        if(CheckIsNullOrEmpty(options.onclick)){
            options.onclick = 'fnSwitch2State(this);';
        }

        return options;
    },
    MatchProperty: function (defaults) {
        var labelStyle = '', inputStyle = '', inputClass1 = 'layui-input-inline', inputClass2 = '', attribute1 = '', attribute2 = '';
        if (defaults.showlabel) {
            labelStyle += ('width:' + defaults.labelwidth + 'px;');
            if(defaults.labelalign != 'left')
                labelStyle += ('text-align:' + defaults.labelalign + ';');
            if(defaults.labelcolor == '' && defaults.required){
                labelStyle += ('color: red;');
            }
            else if(defaults.labelcolor != ''){
                labelStyle += ('color: ' + defaults.labelcolor + ';');
            }
        }
        if(defaults.textalign != 'left'){
            inputStyle += ('text-align:' + defaults.textalign + ';');
        }
        if(defaults.inputstyle != ''){
            inputStyle += defaults.inputstyle;
        }
        if (defaults.readonly || defaults.viewmode) {
            inputClass1 += 'layui-input-readonly layui-form-disbaled';
            attribute1 += 'readonly ';
        }
        if (!CheckIsNullOrEmpty(defaults.fieldname)) {
            attribute1 += ('fieldname="' + defaults.fieldname + '" ');
        }
        if (!CheckIsNullOrEmpty(defaults.fieldalias)) {
            attribute1 += ('fieldalias="' + defaults.fieldalias + '" ');
        }
        if(defaults.title != ''){
            attribute2 += ('title="' + defaults.title + '" ');
        }

        return {
            labelStyle: labelStyle,
            inputStyle: inputStyle,
            inputClass1: inputClass1,
            attribute1: attribute1,
            inputClass2: inputClass2,
            attribute2: attribute2
        };
    },
    GetReadState: function (id) {
        //返回控件的状态，只读返回为true
        return $('#' + id).hasClass('layui-form-disbaled');
    },
    SetReadState: function(id, read){
        //设置控件的状态，true为设置为只读
        var m = $('#' + id);
        if(read){
            m.addClass('layui-form-disbaled');
        }
        else{
            m.removeClass('layui-form-disbaled');
        }
    },
    GetValue: function(id){
        //返回控件的值
        var v = '';
        $('#' + id).find('div[lay-value=1]').each(function () {
            v += (',' + $(this).attr('value'));
        });

        return v.slice(1);
    },
    SetValue:function (id, val) {
        //设置控件的值
        var m = $('#' + id);
        var ary = val.split(',');
        m.find('div').each(function(){
            var n = $(this);
            if(val.search(n.attr('value')) > -1){
                n.attr("lay-value", 1);
                n.addClass("layui-form-checked");
            }
            else{
                n.attr("lay-value", 0);
                n.removeClass("layui-form-checked");
            }
        });
    }
};