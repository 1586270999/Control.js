/**
 * 中右布局
 * 常用属性：
 * rmargin: 右侧边距，即左布局宽度，默认100
 * rtitle：右侧标题，默认空
 * rcollapse：是否显示右侧收缩按钮，默认true
 * rsplit：是否显示右侧分割线，默认true
 * title: 中间布局标题，默认为空
 * rchilds：右侧布局子控件
 * childs：中间布局子控件
 * */
var JointLayOutCR = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayOutCR',
            NameCN: '中间-右边布局',
            Version: '1.0.0',
            ReleaseDate: '2018-12-05'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLayOutCR.GetProperty(options), JointLayOutCR.BaseProperty());

        var html = '';
        html += ('<div id="' + defaults.id + '" class="layout-auto">');
        html += ('<div class="layout-center" style="left:0px;right:' + (defaults.rsplit ? (defaults.rmargin + 4) : defaults.rmargin) + 'px;height:100%;">');
        if(defaults.title != ''){
            html += ('<div class="layout-header"><div class="layout-text">' + defaults.title + '</div></div>');
        }
        html += ('<div class="layout-body" style="' + (defaults.title == '' ? 'top:0px;' : '') + '"><div class="layout-auto">');
        if(CheckIsNullOrEmpty(defaults.childs.OrderBy)){
            for(var c in defaults.childs){
                if(c != 'OrderBy'){
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
        html += ('</div></div></div>');
        if(defaults.rsplit){
            html += ('<div class="layout-split-col right-col" style="right:' + defaults.rmargin + 'px;" onmousedown="fnLayoutSplitMove(this, \'right\', \'#' + defaults.id + '\');"></div>');
        }
        html += ('<div class="layout-right" style="width:' + defaults.rmargin + 'px;">');
        if(defaults.rtitle != ''){
            html += ('<div class="layout-header">');
            html += ('<div class="layout-text">' + defaults.rtitle + '</div>');
            if(defaults.rcollapse){
                html += ('<div class="layout-icon-d" onclick="$(\'#' + defaults.id + '\').toggleClass(\'layout-right-hide\');"><div></div></div>');
            }
            html += '</div>';
        }
        html += ('<div class="layout-body" style="' + (defaults.rtitle == '' ? 'top:0px;' : '') + '"><div class="layout-auto">');
        if(CheckIsNullOrEmpty(defaults.rchilds.OrderBy)){
            for(var c in defaults.rchilds){
                if(c != 'OrderBy') {
                    html += ControlsBase.GetRenderHtml(defaults.rchilds[c]);
                }
            }
        }
        else{
            var orderby = defaults.rchilds.OrderBy.toString();
            var ary = orderby.split(',');
            for(var c in ary){
                html += ControlsBase.GetRenderHtml(defaults.rchilds[ary[c]]);
            }
        }
        html += ('</div></div></div>');
        if(defaults.rtitle != ''){
            html += ('<div class="layout-right-copy">');
            html += ('<div class="layout-icon-d" onclick="$(\'#' + defaults.id + '\').toggleClass(\'layout-right-hide\');"><div></div></div>');
            html += ('<div class="layout-text">' + defaults.rtitle + '</div>');
            html += '</div>';
        }
        html += ('</div>');

        return html;
    },
    GetProperty: function (options) {
        if (CheckIsNullOrEmpty(options.rmargin)) {
            options.rmargin = 100;
        }
        if (CheckIsNullOrEmpty(options.rtitle)) {
            options.rtitle = '';
        }
        if (CheckIsNullOrEmpty(options.rcollapse)) {
            options.rcollapse = true;
        }
        if (CheckIsNullOrEmpty(options.rsplit)) {
            options.rsplit = true;
        }
        if(CheckIsNullOrEmpty(options.title)){
            options.title = '';
        }
        if(CheckIsNullOrEmpty(options.rchilds)){
            options.rchilds = {};
        }
        if(CheckIsNullOrEmpty(options.childs)){
            options.childs = {};
        }

        return options;
    }
};