/**
 * HTML编辑器(选用百度UEditor编辑器)
 * 2018-11-30
 * */
var JointHtmlEditor = {
    BaseProperty: function(){
        return {
            NameEN: 'JointHtmlEditor',
            NameCN: 'HTML编辑器',
            Version: '1.0.0',
            ReleaseDate: '2018-11-30'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointHtmlEditor.GetProperty(options), JointHtmlEditor.BaseProperty());
        var macthOpt = JointHtmlEditor.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel){
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:' + defaults.inputwidth + 'px;max-width:' + defaults.inputwidth + 'px;">');
        html += ('<script class="" id="' + defaults.id + '" ' + macthOpt.attribute + '" clstype="' + defaults.NameEN + '"></script>');
        html += '</div></div>';
        var addscript = '';
        if(!CheckIsNullOrEmpty(defaults.showhtml)){
            addscript += 'editor.setContent(\'' + defaults.showhtml + '\');';
        }
        if(defaults.readonly || defaults.viewmode){
            addscript += 'editor.setDisabled(\'fullscreen\');';
        }
        if(defaults.height > 0){
            addscript += 'editor.setHeight(' + defaults.height + ');';
        }
        html += ('<script>var editor = new baidu.editor.ui.Editor();editor.render(' + defaults.id + ');editor.addListener(\'ready\', function (event) {' + addscript + '});</script>');

        return html;
    },
    GetProperty: function (options){
        var options = JointTextField.GetProperty(options);
        options.intable = false;
        options.placeholder = '';
        options.verify = '';
        options.onkeypress = '';
        options.onkeyup = '';
        options.onkeydown = '';
        options.onchange = '';
        options.onblur = '';
        options.onfocus = '';
        options.onclick = '';
        options.showhtml = (options.value || options.text);
        options.value = options.text = '';

        return options;
    },
    MatchProperty: function (defaults){
        return JointTextField.MatchProperty(defaults);
    },
    GetReadState: function (id){
        //返回控件的状态，只读返回为true
        return JointTextField.GetReadState(id);
    },
    SetReadState: function(id, read){
        //设置控件的状态，true为设置为只读
        JointTextField.SetReadState(id, read);
        if(read){
            editor.setDisabled('fullscreen');
        }
        else {
            editor.setEnabled();
        }
    },
    GetValue: function(id){
        //返回控件的值
        return editor.getContent();
    },
    SetValue:function (id, val){
        //设置控件的值
        editor.setContent(val);
    }
};