/**
 * 换行分割线
 * 2018-12-19
 * 新增属性：
 * type: 类型(0:换行 1:横线)
 * bgcolor：如果是横线，背景色。(red:赤色/orange:橙色/green:墨绿/cyan:青色/blue:蓝色/black:黑色/gray:灰色)，默认为空
 * */
var JointSplitLine = {
    BaseProperty: function(){
        return {
            NameEN: 'JointSplitLine',
            NameCN: '换行分割线',
            Version: '1.0.0',
            ReleaseDate: '2018-12-19'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointSplitLine.GetProperty(options), JointSplitLine.BaseProperty());
        var html = '';
        if(defaults.type == 0){
            html = '<br/>';
        }
        else{
            if(CheckIsNullOrEmpty(defaults.bgcolor)){
                html = '<hr>';
            }
            else {
                html = ('<hr class="' + defaults.bgcolor + '">');
            }
        }

        return html;
    },
    GetProperty: function (options){
        if(CheckIsNullOrEmpty(options.type)){
            options.type = 0;
        }
        if(CheckIsNullOrEmpty(options.bgcolor)){
            options.bgcolor = '';
        }
        else{
            options.bgcolor =('layui-bg-' + options.bgcolor);
        }

        return options;
    }
};