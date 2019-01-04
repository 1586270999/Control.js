/**
 * 左中布局
 * 常用属性：
 * lmargin: 左侧边距，即左布局宽度，默认100
 * ltitle：左侧标题，默认空
 * lcollapse：是否显示左侧收缩按钮，默认true
 * lsplit：是否显示左侧分割线，默认true
 * title: 中间布局标题，默认为空
 * lchilds：左侧布局子控件
 * childs：中间布局子控件
 * */
var JointLayOutLC = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayOutLC',
            NameCN: '左边-中间布局',
            Version: '1.0.0',
            ReleaseDate: '2018-12-05'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLayOutLC.GetProperty(options), JointLayOutLC.BaseProperty());

        var html = '';
        html += ('<div id="' + defaults.id + '" class="layout-auto">');
        html += ('<div class="layout-left" style="width:' + defaults.lmargin + 'px;">');
        if(defaults.ltitle != ''){
            html += ('<div class="layout-header">');
            html += ('<div class="layout-text">' + defaults.ltitle + '</div>');
            if(defaults.lcollapse){
                html += ('<div class="layout-icon-d" onclick="$(\'#' + defaults.id + '\').toggleClass(\'layout-left-hide\');"><div></div></div>');
            }
            html += '</div>';
        }
        html += ('<div class="layout-body" style="' + (defaults.ltitle == '' ? 'top:0px;' : '') + '"><div class="layout-auto">');
        if(CheckIsNullOrEmpty(defaults.lchilds.OrderBy)){
            for(var c in defaults.lchilds){
                if(c != 'OrderBy') {
                    html += ControlsBase.GetRenderHtml(defaults.lchilds[c]);
                }
            }
        }
        else{
            var orderby = defaults.lchilds.OrderBy.toString();
            var ary = orderby.split(',');
            for(var c in ary){
                html += ControlsBase.GetRenderHtml(defaults.lchilds[ary[c]]);
            }
        }
        html += ('</div></div></div>');
        if(defaults.ltitle != ''){
            html += ('<div class="layout-left-copy">');
            html += ('<div class="layout-icon-d" onclick="$(\'#' + defaults.id + '\').toggleClass(\'layout-left-hide\');"><div></div></div>');
            html += ('<div class="layout-text">' + defaults.ltitle + '</div>');
            html += '</div>';
        }
        if(defaults.lsplit){
            html += ('<div class="layout-split-col left-col" style="left:' + defaults.lmargin + 'px;" onmousedown="fnLayoutSplitMove(this, \'left\', \'#' + defaults.id + '\');"></div>');
        }
        html += ('<div class="layout-center" style="left:' + (defaults.lsplit ? (defaults.lmargin * 1 + 4) : (defaults.lmargin * 1 + 1)) + 'px;right:0px;height:100%;">');
        if(defaults.title != ''){
            html += ('<div class="layout-header"><div class="layout-text">' + defaults.title + '</div></div>');
        }
        html += ('<div class="layout-body" style="' + (defaults.title == '' ? 'top:0px;' : '') + '"><div class="layout-auto">');
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
        html += ('</div></div>');

        return html;
    },
    GetProperty: function (options) {
        if (CheckIsNullOrEmpty(options.lmargin)) {
            options.lmargin = 100;
        }
        if (CheckIsNullOrEmpty(options.ltitle)) {
            options.ltitle = '';
        }
        if (CheckIsNullOrEmpty(options.lcollapse)) {
            options.lcollapse = true;
        }
        if (CheckIsNullOrEmpty(options.lsplit)) {
            options.lsplit = true;
        }
        if(CheckIsNullOrEmpty(options.title)){
            options.title = '';
        }
        if(CheckIsNullOrEmpty(options.lchilds)){
            options.lchilds = {};
        }
        if(CheckIsNullOrEmpty(options.childs)){
            options.childs = {};
        }

        return options;
    }
};