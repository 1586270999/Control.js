/**
 * 单选框组
 * 2018-11-30
 * 新增属性：
 * columns：每行显示几个选项，默认为4
 * */
var JointRadioGroup = {
    BaseProperty: function(){
        return {
            NameEN: 'JointRadioGroup',
            NameCN: '单选框组',
            Version: '1.0.0',
            ReleaseDate: '2018-11-30'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointRadioGroup.GetProperty(options), JointRadioGroup.BaseProperty());
        var macthOpt = JointRadioGroup.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += '<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>';
        }
        html += '<div class="' + macthOpt.inputClass1 + '" id="' + defaults.id + '" ' + macthOpt.attribute1 + ' style="width:' + defaults.inputwidth + 'px;max-width:' + defaults.inputwidth + 'px;">';
        var ary = options.jsds;
        for(var c = 0; c < ary.length; c++) {
            var value = ary[c].Value, text = ary[c].Text, checked = ((defaults.value || defaults.text) == ary[c].Value);
            html += ('<div title="' + text + '" class="layui-unselect layui-form-radio' + (checked ? ' layui-form-radioed' : '') + '" id="' + defaults.id + '_1" onclick="fnChooseOneByGroup(this);" name="' + defaults.id + '" value="' + value + '"><i class="layui-anim layui-icon ' + (checked ? 'layui-anim-scaleSpring layui-icon-radio' : 'layui-icon-unradio') + '"></i><div>' + text + '</div></div>');
        }
        html += '</div></div>';
        return html;
    },
    GetProperty: function (options){
        return JointTextField.GetProperty(options);
    },
    MatchProperty: function (defaults){
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
        return $('#' + id).find('div.layui-form-radioed').attr('value');
    },
    SetValue:function (id, val) {
        $('#' + id).find('div[value=' + val + ']').click();
    }
};



