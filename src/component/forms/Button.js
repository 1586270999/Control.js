/**
 * 按钮
 * 2018-12-01
 * 新增属性：
 * width: 默认80
 * height：默认空
 * skins: 皮肤，默认空，可选值primary原始/normal百搭/warm暖色/danger警告/disabled禁用
 * size: 按钮大小，默认空，可选值xs微型/sm小型/lg大型
 * radius: 圆角效果,默认false
 * text: 显示文本
 * icon：小图标，默认空
 * type: 按钮类型：(0按钮1链接)
 * posturl: 按钮类型为链接时，地址Url
 * onclick: 点击事件
 * */
var JointButton = {
    BaseProperty: function(){
        return {
            NameEN: 'JointButton',
            NameCN: '按钮',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointButton.GetProperty(options), JointButton.BaseProperty());

        var html = '';
        if(defaults.type == '1'){
            html += '<a id="' + defaults.id + '" class="' + defaults.class + '" style="' + defaults.style + '" ' + defaults.attribute + '>' + options.icon + defaults.text + '</a>';
        }
        else{
            html += '<button id="' + defaults.id + '" class="' + defaults.class + '" style="' + defaults.style + '" ' + defaults.attribute + '>' + options.icon + defaults.text + '</button>';
        }

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
        if(!CheckIsNullOrEmpty(options.radius)){
            if(options.radius){
                options.class += '  layui-btn-radius';
            }
        }
        options.icon = '';
        if(!CheckIsNullOrEmpty(options.icon)){
            options.icon += ('<i class="layui-icon layui-icon-' + options.icon + '"></i>');
        }
        options.style = '';
        if(!CheckIsNullOrEmpty(options.width)){
            options.style += ('width:' + options.width + 'px;');
        }
        if(!CheckIsNullOrEmpty(options.height)){
            options.style += ('height:' + options.height + 'px;');
        }
        options.attribute = '';
        if(!CheckIsNullOrEmpty(options.onclick)){
            options.attribute += ('onclick="' + options.onclick + '"');
        }
        if(!CheckIsNullOrEmpty(options.posturl)){
            options.attribute += ('target="_blank" href="' + options.posturl + '"');
        }

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
        return $('#' + id).text();
    },
    SetValue:function (id, val) {
        //设置控件的值
        $('#' + id).text(val);
    }
};
