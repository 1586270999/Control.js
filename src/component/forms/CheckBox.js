/**
 * 复选框
 * 2018-11-29
 * 新增属性：
 * skin：呈现样式风格，默认为原始风格primary，可设置为开关风格switch
 * checked：是否选中状态，默认为false
 * showtext：显示文本内容(原始风格为单个词，比如写作、吃饭、发呆，开关风格为|分隔的两个词，比如放歌ON|OFF或开启|关闭)
 * minwidth：最小宽度，默认为50
 */
var JointCheckBox = {
    BaseProperty: function(){
        return {
            NameEN: 'JointCheckBox',
            NameCN: '复选框',
            Version: '1.0.0',
            ReleaseDate: '2018-11-29'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointCheckBox.GetProperty(options), JointCheckBox.BaseProperty());
        var macthOpt = JointCheckBox.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += '<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>';
        }
        html += '<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">';
        html += ('<div class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" ' + macthOpt.attribute + ' clstype="' + defaults.NameEN + '">');
        if(defaults.skin == 'primary'){
            html += ('<span>' + defaults.showtext + '</span><i class="layui-icon layui-icon-ok"></i>');
        }
        else{
            html += ('<em>' + (defaults.checked ? defaults.showtext.split('|')[1] : defaults.showtext.split('|')[0]) + '</em><i></i>');
        }
        html += '</div></div></div>';
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
        if(CheckIsNullOrEmpty(options.minWidth)){
            options.minWidth = 50;
        }

        return options;
    },
    MatchProperty: function (defaults) {
        var options = JointTextField.MatchProperty(defaults);
        if(defaults.skin == 'primary'){
            options.inputClass = ('layui-unselect layui-form-checkbox' + (defaults.checked ? ' layui-form-checked' : '') + ((defaults.readonly || defaults.viewmode) ? ' layui-form-disbaled' : ''));
            options.attribute += ('lay-skin="primary" ');
        }
        else{
            options.inputClass = ('layui-unselect layui-form-switch' + (defaults.checked ? ' layui-form-onswitch' : '') + ((defaults.readonly || defaults.viewmode) ? ' layui-form-disbaled' : ''));
        }
        options.attribute += ('lay-text="' + defaults.showtext + '" ');
        options.inputStyle += ('min-width: ' + defaults.minWidth + 'px;');
        options.attribute += (defaults.checked ? ('checked="true" lay-value="1" ') : ('lay-value="0" '));

        return options;
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
        return $('#' + id).attr('lay-value');
    },
    SetValue:function (id, val) {
        //设置控件的值
        val = (val == true || val == 'true' || val == 1);
        var m = $('#' + id);
        if (m.hasClass("layui-form-checkbox")) {
            if (!val) {
                m.attr("lay-value", 0);
                m.removeClass("layui-form-checked");
            }
            else {
                m.attr("lay-value", 1);
                m.addClass("layui-form-checked");
            }
        }
        else {
            if (!val) {
                m.attr("lay-value", 0);
                m.removeClass("layui-form-onswitch");
                m.find("em").html(m.attr("lay-text").split('|')[0]);
            }
            else {
                m.attr("lay-value", 1);
                m.addClass("layui-form-onswitch");
                m.find("em").html(m.attr("lay-text").split('|')[1]);
            }
        }
    }
};