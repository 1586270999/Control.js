/**
 * 按钮组
 * 2018-12-01
 * 继承自Button组件，属性自动继承Button组件
 * 特别注意：Name/Text/Icon/OnClick属性改到了明细上，且不处理type、posturl
 * */
var JointButtonGroup = {
    BaseProperty: function(){
        return {
            NameEN: 'JointButtonGroup',
            NameCN: '按钮组',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointButtonGroup.GetProperty(options), JointButtonGroup.BaseProperty());
        var html = ('<div class="layui-btn-group" id="' + defaults.id + '" style="'+ defaults.style +'">');
        var ary = options.jsds, icon = '', onclick = '';
        for(var c = 0; c < ary.length; c++) {
            icon = '', onclick = 'return false;';
            if(!CheckIsNullOrEmpty(ary[c].Icon)){
                icon = ('<i class="layui-icon layui-icon-' + ary[c].Icon + '"></i>');
            }
            if(!CheckIsNullOrEmpty(ary[c].OnClick)){
                onclick = (' onclick="' + ary[c].OnClick + onclick + '"');
            }
            html += ('<button class="' + defaults.class + '" id="' + defaults.id + '_' + ary[c].Name + '"' + onclick + '>' + icon + ary[c].Text + '</button>');
        }
        html += '</div>';

        return html;
    },
    GetProperty: function (options) {
        options.class = 'layui-btn';
        if(!CheckIsNullOrEmpty(options.skins)){
            options.class += ' layui-btn-' + options.skins;
        }
        if(!CheckIsNullOrEmpty(options.size)){
            options.class += ' layui-btn-' + options.size;
        }

        options.style = '';
        if(!CheckIsNullOrEmpty(options.width)){
            options.style += ('width:' + options.width + 'px;');
        }
        if(!CheckIsNullOrEmpty(options.height)){
            options.style += ('height:' + options.height + 'px;');
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
