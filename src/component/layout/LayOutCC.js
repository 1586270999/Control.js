/**
 * 中间布局
 * 2018-12-19
 * 新增属性：
 * width：宽度，默认为100%
 * childs：布局子控件
 * */
var JointLayOutCC = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayOutCC',
            NameCN: '中间布局',
            Version: '1.0.0',
            ReleaseDate: '2018-12-19'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointLayOutCC.GetProperty(options), JointLayOutCC.BaseProperty());
        var html = '<div style="height: 100%;width: ' + defaults.width + ';">';
        if(CheckIsNullOrEmpty(defaults.childs.OrderBy)){
            for(var c in defaults.childs){
                if(c != 'OrderBy') {
                    html += ControlsBase.GetRenderHtml(defaults.childs[c]);
                }
            }
        }
        else{
            var orderby = defaults.childs.OrderBy.toString();
            var ary = orderby.split(',');
            for(var c in ary){
                html += ControlsBase.GetRenderHtml(defaults.childs[ary[c]]);
            }
        }
        html += '</div>';

        return html;
    },
    GetProperty: function (options){
        if(CheckIsNullOrEmpty(options.width)){
            options.width = '100%';
        }
        if(CheckIsNullOrEmpty(options.childs)){
            options.childs = {};
        }

        return options;
    }
};