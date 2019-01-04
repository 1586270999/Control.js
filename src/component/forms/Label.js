/**
 * Label标签
 * 2018-11-30
 * 新增属性：
 * color：字体颜色
 * linemode: 下划线样式(overline上划线line-through删除线贯穿线underline下划线)，默认值为空
 * fontsize：字体大小，默认值为空
 * fontstyle：字体格式(normal 默认／italic，oblique斜体)
 * fontweight：设定字体粗细。normal 默认／bold 粗体／bolder 比bold更粗／lighter 比较细的字体
 * fontfamily：字体，比如“微软雅黑”／“宋体”／“黑体”
 * text：显示文本
 * onclick：点击事件
 * */
var JointLabel = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLabel',
            NameCN: 'Label标签',
            Version: '1.0.0',
            ReleaseDate: '2018-11-30'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLabel.GetProperty(options), JointLabel.BaseProperty());

        return '<label id="' + defaults.id + '" style="' + defaults.labelStyle + '" ' + (!CheckIsNullOrEmpty(defaults.onclick) ? 'onclick="' + defaults.onclick + '"' : '') + '" clstype="' + defaults.NameEN + '">' + defaults.text + '</label>';
    },
    GetProperty: function (options) {
        options.labelStyle = '';
        if(!CheckIsNullOrEmpty(options.width)){
            options.labelStyle += ('width:' + options.width + 'px;');
        }
        if(!CheckIsNullOrEmpty(options.color)){
            options.labelStyle += ('color:' + options.color + ';');
        }
        if(!CheckIsNullOrEmpty(options.linemode)){
            options.labelStyle += ('text-decoration:' + options.linemode + ';');
        }
        if(!CheckIsNullOrEmpty(options.fontsize)){
            options.labelStyle += ('font-size:' + options.fontsize + ';');
        }
        if(!CheckIsNullOrEmpty(options.fontstyle)){
            options.labelStyle += ('font-style:' + options.fontstyle + ';');
        }
        if(!CheckIsNullOrEmpty(options.fontweight)){
            options.labelStyle += ('font-weight:' + options.fontweight + ';');
        }
        if(!CheckIsNullOrEmpty(options.fontfamily)){
            options.labelStyle += ('font-family:' + options.fontfamily + ';');
        }
        if(!CheckIsNullOrEmpty(options.onclick)){
            options.labelStyle += ('cursor:pointer;');
        }

        return options;
    },
    GetValue: function(id){
        return $('#' + id).text();
    },
    SetValue:function (id, val){
        $('#' + id).text(val);
    }
};