/**
 * 数字录入
 * 2018-11-30
 * 新增属性：
 * allowlesszero：是否允许小于零，默认值为true
 * isfloat：是否是浮点数，即是否可以有小数点，默认值为true
 * precision：精确度，即小数位，默认为0
 * spinner：是否显示递增和递减按钮，默认值为true，当precision不为0时，值默认为false
 * enablepaste：是否启用黏贴功能，默认值为false
 * */
var JointNumericText = {
    BaseProperty: function(){
        return {
            NameEN: 'JointNumericText',
            NameCN: '数字录入',
            Version: '1.0.0',
            ReleaseDate: '2018-11-30'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointNumericText.GetProperty(options), JointNumericText.BaseProperty());
        var macthOpt = JointNumericText.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel){
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">');
        html += ('<input class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="' + defaults.inputmode + '" value="' + (defaults.value || defaults.text) + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '"/>');
        if(defaults.spinner){
            html += '<div class="layui-slider-input-btn"><i class="layui-icon layui-icon-up" onclick="fnAddOneByOne(this);"></i><i class="layui-icon layui-icon-down" onclick="fnDecOneByOne(this);"></i></div>';
        }
        html += '</div></div>';

        return html;
    },
    GetProperty: function (options){
        var options = JointTextField.GetProperty(options);
        options.inputmode = "text";
        if(CheckIsNullOrEmpty(options.allowlesszero)){
            options.allowlesszero = true;
        }
        if(CheckIsNullOrEmpty(options.isfloat)){
            options.isfloat = true;
        }
        if(CheckIsNullOrEmpty(options.precision)){
            options.precision = 0;
        }
        if(CheckIsNullOrEmpty(options.enablepaste)){
            options.enablepaste = false;
        }
        if(CheckIsNullOrEmpty(options.spinner)){
            options.spinner = !(options.precision > 0);
        }
        options.onfocus = 'this.select();';
        options.onkeyup = options.onblur = 'CheckIsNumberChar(this);';

        return options;
    },
    MatchProperty: function (defaults){
        var options = JointTextField.MatchProperty(defaults);
        options.attribute += ('lesszero="' + defaults.allowlesszero + '" ');
        options.attribute += ('isfloat="' + defaults.isfloat + '" ');
        options.attribute += ('precision="' + defaults.precision + '" ');
        options.attribute += ('ondragenter="return false;" ');
        if(defaults.enablepaste){
            options.attribute += ('onpaste="return false;" ');
        }
        if(!defaults.readonly){
            options.inputStyle += 'padding-right:20px;';
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
        return JointTextField.GetValue(id);
    },
    SetValue:function (id, val){
        JointTextField.SetValue(id, val);
    }
};