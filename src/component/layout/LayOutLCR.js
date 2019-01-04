/**
 * 左中右布局
 * 常用属性：
 * lmargin: 左侧边距，即左布局宽度，默认100
 * ltitle：左侧标题，默认空
 * lcollapse：是否显示左侧收缩按钮，默认true
 * lsplit：是否显示左侧分割线，默认true *
 * lchilds：左侧布局子控件
 * title: 中间布局标题，默认为空
 * childs：中间布局子控件
 * rmargin: 右侧边距，即左布局宽度，默认100
 * rtitle：右侧标题，默认空
 * rcollapse：是否显示右侧收缩按钮，默认true
 * rsplit：是否显示右侧分割线，默认true
 * rchilds：右侧布局子控件
 * */
var JointLayOutLCR = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayOutLCR',
            NameCN: '左边-中间-右边布局',
            Version: '1.0.0',
            ReleaseDate: '2018-12-07'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLayOutLCR.GetProperty(options), JointLayOutLCR.BaseProperty());

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
        html += ('<div class="layout-center" style="left:' + (defaults.lsplit ? (defaults.lmargin * 1 + 4) : (defaults.lmargin * 1 + 1)) + 'px;right:' + (defaults.rsplit ? (defaults.rmargin + 4) : defaults.rmargin) + 'px;height:100%;">');
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
        if(CheckIsNullOrEmpty(options.lchilds)){
            options.lchilds = {};
        }
        if(CheckIsNullOrEmpty(options.title)){
            options.title = '';
        }
        if(CheckIsNullOrEmpty(options.childs)){
            options.childs = {};
        }
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
        if(CheckIsNullOrEmpty(options.rchilds)){
            options.rchilds = {};
        }

        return options;
    }
};