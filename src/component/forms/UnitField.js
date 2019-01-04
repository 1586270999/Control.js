/**
 * 带单位的文本框
 * 2018-11-30
 * 新增属性：
 * numinput：是否启用数字录入功能，默认为false
 * allowlesszero：是否允许小于零，默认值为true
 * isfloat：是否是浮点数，即是否可以有小数点，默认值为true
 * precision：精确度，即小数位，默认为0
 * spinner：是否显示递增和递减按钮，默认值为true，当precision不为0时，值默认为false
 * enablepaste：是否启用黏贴功能，默认值为false
 * unitwidth：单位文本宽度，默认值为31
 * unittext：单位文本内容
 * unitcolor：单位文本颜色
 * unitfontsize：单位文本字体大小
 * */
var JointUnitField = {
    BaseProperty: function(){
        return {
            NameEN: 'JointUnitField',
            NameCN: '带单位的文本框',
            Version: '1.0.0',
            ReleaseDate: '2018-11-30'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointUnitField.GetProperty(options), JointUnitField.BaseProperty());
        var macthOpt = JointUnitField.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel){
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">');
        html += ('<input class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="' + defaults.inputmode + '" value="' + (defaults.value || defaults.text) + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '"/>');
        html += ('<div class="layui-spinner-unit" style="top:0px;width:' + defaults.unitwidth + 'px;margin-left:' + defaults.marginleft + 'px;"><span class="layui-spinner-unit-span">' + defaults.unittext + '</span></div>');
        html += '</div></div>';

        return html;
    },
    GetProperty: function (options){
        var options = JointTextField.GetProperty(options);
        options.inputmode = "text";
        if(CheckIsNullOrEmpty(options.numinput)){
            options.numinput = false;
            options.allowlesszero = true;
            options.isfloat = true;
            options.precision = 0;
            options.enablepaste = false;
        }
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
        if(options.numinput){
            options.onfocus = 'this.select();';
            options.onkeyup = options.onblur = 'CheckIsNumberChar(this);';
        }
        if(CheckIsNullOrEmpty(options.unitwidth)){
            options.unitwidth = 31;
        }
        if(options.readonly || options.viewmode){
            options.inputwidth = (options.width - options.labelwidth - 40);
            options.marginleft = (options.width - options.labelwidth - 71);
        }
        else{
            options.inputwidth = (options.width - options.labelwidth - 35);
            options.marginleft = (options.width - options.labelwidth - 76);
        }

        return options;
    },
    MatchProperty: function (defaults){
        var options = JointTextField.MatchProperty(defaults);
        if(defaults.numinput){
            options.attribute += ('lesszero="' + defaults.allowlesszero + '" ');
            options.attribute += ('isfloat="' + defaults.isfloat + '" ');
            options.attribute += ('precision="' + defaults.precision + '" ');
            options.attribute += ('ondragenter="return false;" ');
            if(defaults.enablepaste){
                options.attribute += ('onpaste="return false;" ');
            }
        }
        options.inputStyle += ('width:' + (defaults.inputwidth - 32) + 'px;');
        options.unitStyle = '';
        options.unitStyle += (CheckIsNullOrEmpty(defaults.unitcolor) ? '' : ('color:' + defaults.unitcolor) + ';');
        options.unitStyle += (CheckIsNullOrEmpty(defaults.unitfontsize) ? '' : ('font-size:' + defaults.unitfontsize) + ';');

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