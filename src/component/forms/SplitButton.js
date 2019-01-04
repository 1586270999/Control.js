/**
 * 按钮带菜单
 * 2018-12-01
 * 配置方式基本同ButtonGroup，但是skin固定为sm，且去掉skins属性和width属性以及height属性
 * 新增属性：
 * bgcolor：按钮背景色，默认值为green。可选值有赤红red/橙色organge/墨绿色green/藏青cyan/蓝色blue/雅黑black
 * */
var JointSplitButton = {
    BaseProperty: function(){
        return {
            NameEN: 'JointSplitButton',
            NameCN: '按钮带菜单',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointSplitButton.GetProperty(options), JointSplitButton.BaseProperty());

        var html = ('<div id="' + defaults.id + '" style="width: 105px;">');
        var ary = options.jsds, icon = '', onclick = 'return false;';
        var tclick = (!CheckIsNullOrEmpty(ary[0].OnClick) ? (ary[0].OnClick + onclick) : onclick);
        if(!CheckIsNullOrEmpty(ary[0].Icon)){
            icon = ('<i class="layui-icon layui-icon-' + ary[0].Icon + '"></i>');
        }
        html += ('<button class="' + defaults.class + '" id="' + defaults.id + '_' + ary[0].Name + '" onclick="' + tclick + '">' + icon + ary[0].Text + '</button>');
        html += ('<button class="dropdown-toggle ' + defaults.class + '" onclick="$(this).next().toggle();return false;" style="margin-left: 0px;"><span class="caret"></span></button>');
        html += '<ul class="dropdown-menu">';
        for(var c = 1; c < ary.length; c++) {
            icon = '';
            html += '<li style="margin-top: 1px;" class="' + defaults.liclass + '">';
            tclick = (!CheckIsNullOrEmpty(ary[c].OnClick) ? (ary[c].OnClick + onclick) : onclick);
            if(!CheckIsNullOrEmpty(ary[c].Icon)){
                icon = ('<i class="layui-icon layui-icon-' + ary[c].Icon + '"></i>');
            }
            html += ('<a onclick="' + tclick + '">' + icon + ary[c].Text + '</a>');
            html += '</li>';
        }
        html += '</ul></div>';

        return html;
    },
    GetProperty: function (options) {
        options.class = 'layui-btn layui-btn-sm ', options.liclass = '';
        if(CheckIsNullOrEmpty(options.bgcolor)){
            options.class += ' layui-bg-green';
            options.liclass += ' layui-bg-green';
        }
        else{
            options.class += ' layui-bg-' + options.bgcolor;
            options.liclass += ' layui-bg-' + options.bgcolor;
        }

        return options;
    },
    GetReadState: function (id, name) {
        //返回控件的状态，只读返回为true
        return $('#' + id + '_' + name).hasClass('layui-form-disbaled');
    },
    SetReadState: function(id, name, read){
        //设置控件的状态，true为设置为只读
        var m = $('#' + id + '_' + name);
        if(read){
            m.addClass('layui-form-disbaled');
        }
        else{
            m.removeClass('layui-form-disbaled');
        }
    },
    GetValue: function(id, name){
        //返回控件的值
        return $('#' + id + '_' + name).text();
    },
    SetValue:function (id, name, val) {
        //设置控件的值
        $('#' + id + '_' + name).text(val);
    }
};