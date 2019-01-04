/**
 * 多行文本输入框
 * 2018-11-29
 * 新增属性：
 * height：高度
 * */
var JointTextArea = ObjectCopy(JointTextField);
JointTextArea.BaseProperty = function(){
    return {
        NameEN: 'JointTextArea',
        NameCN: '多行文本输入框',
        Version: '1.0.0',
        ReleaseDate: '2018-11-29'
    };
};
JointTextArea.GetRenderHtml = function (options) {
    var defaults = $.extend(JointTextField.GetProperty(options), JointTextArea.BaseProperty());
    var macthOpt = JointTextField.MatchProperty(defaults);
    macthOpt.inputClass = ((defaults.readonly || defaults.viewmode) ? 'layui-textarea-readonly' : 'layui-textarea');
    if(!CheckIsNullOrEmpty(defaults.height)){
        macthOpt.inputStyle += ('height:' + defaults.height + 'px;');
    }

    var html = ''
    html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
    if(defaults.showlabel) {
        html += '<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>';
    }
    html += '<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">';
    html += '<textarea class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="' + defaults.inputmode + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '">' + (defaults.value || defaults.text) + '</textarea>';
    html += '</div></div>';

    return html;
};
JointTextArea.GetReadState = function (id) {
    //返回控件的状态，只读返回为true
    return $('#' + id).hasClass('layui-textarea-readonly');
};
JointTextArea.SetReadState = function(id, read){
    //设置控件的状态，true为设置为只读
    var m = $('#' + id);
    if(read){
        m.removeClass('layui-textarea').addClass('layui-textarea-readonly').attr('readonly', 'true');
    }
    else{
        m.removeClass('layui-textarea-readonly').addClass('layui-textarea').removeAttr('readonly');
    }
};

