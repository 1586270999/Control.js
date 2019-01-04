/**
 * 上中下布局
 * 常用属性：
 * tmargin: 顶部边距，即左布局宽度，默认100
 * ttitle：顶部标题，默认空
 * tcollapse：是否显示顶部收缩按钮，默认true
 * tsplit：是否显示顶部分割线，默认true
 * tchilds：顶部布局子控件
 * title: 中间布局标题，默认为空
 * childs：中间布局子控件
 * bmargin: 顶部边距，即左布局宽度，默认100
 * btitle：顶部标题，默认空
 * bcollapse：是否显示顶部收缩按钮，默认true
 * bsplit：是否显示顶部分割线，默认true
 * bchilds：顶部布局子控件
 * */
var JointLayOutTCB = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayOutLCR',
            NameCN: '顶部-中间-底部布局',
            Version: '1.0.0',
            ReleaseDate: '2018-12-07'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLayOutTCB.GetProperty(options), JointLayOutTCB.BaseProperty());

        var html = '';
        html += ('<div id="' + defaults.id + '" class="layout-auto">');
        html += ('<div class="layout-top" style="height:' + defaults.tmargin + 'px;">');
        if(defaults.ttitle != ''){
            html += ('<div class="layout-header">');
            html += ('<div class="layout-text">' + defaults.ttitle + '</div>');
            if(defaults.tcollapse){
                html += ('<div class="layout-icon-d" onclick="$(\'#' + defaults.id + '\').toggleClass(\'layout-top-hide\');"><div></div></div>');
            }
            html += '</div>';
        }
        html += ('<div class="layout-body" style="' + (defaults.ttitle == '' ? 'top:0px;' : '') + '"><div class="layout-auto">');
        if(CheckIsNullOrEmpty(defaults.tchilds.OrderBy)){
            for(var c in defaults.tchilds){
                if(c != 'OrderBy') {
                    html += ControlsBase.GetRenderHtml(defaults.tchilds[c]);
                }
            }
        }
        else{
            var orderby = defaults.tchilds.OrderBy.toString();
            var ary = orderby.split(',');
            for(var c in ary){
                html += ControlsBase.GetRenderHtml(defaults.tchilds[ary[c]]);
            }
        }
        html += ('</div></div></div>');
        if(defaults.tsplit){
            html += ('<div class="layout-split-row top-row" style="top:' + defaults.tmargin + 'px;" onmousedown="fnLayoutSplitMove(this, \'top\', \'#' + defaults.id + '\');"></div>');
        }
        html += ('<div class="layout-center" style="top:' + (defaults.tsplit ? (defaults.tmargin * 1 + 4) : (defaults.tmargin * 1 + 1)) + 'px;bottom:' + (defaults.bsplit ? (defaults.bmargin + 4) : defaults.bmargin) + 'px;width:100%;">');
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
        if(defaults.bsplit){
            html += ('<div class="layout-split-row bottom-row" style="bottom:' + defaults.bmargin + 'px;" onmousedown="fnLayoutSplitMove(this, \'bottom\', \'#' + defaults.id + '\');"></div>');
        }
        html += ('<div class="layout-bottom" style="height:' + defaults.bmargin + 'px;">');
        if(defaults.btitle != ''){
            html += ('<div class="layout-header">');
            html += ('<div class="layout-text">' + defaults.btitle + '</div>');
            if(defaults.bcollapse){
                html += ('<div class="layout-icon-d" onclick="$(\'#' + defaults.id + '\').toggleClass(\'layout-bottom-hide\');"><div></div></div>');
            }
            html += '</div>';
        }
        html += ('<div class="layout-body" style=""><div class="layout-auto">');
        if(CheckIsNullOrEmpty(defaults.bchilds.OrderBy)){
            for(var c in defaults.bchilds){
                if(c != 'OrderBy') {
                    html += ControlsBase.GetRenderHtml(defaults.bchilds[c]);
                }
            }
        }
        else{
            var orderby = defaults.bchilds.OrderBy.toString();
            var ary = orderby.split(',');
            for(var c in ary){
                html += ControlsBase.GetRenderHtml(defaults.bchilds[ary[c]]);
            }
        }
        html += ('</div></div>');
        html += ('</div>');

        return html;
    },
    GetProperty: function (options) {
        if (CheckIsNullOrEmpty(options.tmargin)) {
            options.tmargin = 100;
        }
        if (CheckIsNullOrEmpty(options.ttitle)) {
            options.ttitle = '';
        }
        if (CheckIsNullOrEmpty(options.tcollapse)) {
            options.tcollapse = true;
        }
        if (CheckIsNullOrEmpty(options.tsplit)) {
            options.tsplit = true;
        }
        if(CheckIsNullOrEmpty(options.tchilds)){
            options.tchilds = {};
        }
        if(CheckIsNullOrEmpty(options.title)){
            options.title = '';
        }
        if(CheckIsNullOrEmpty(options.childs)){
            options.childs = {};
        }
        if (CheckIsNullOrEmpty(options.bmargin)) {
            options.bmargin = 100;
        }
        if (CheckIsNullOrEmpty(options.btitle)) {
            options.btitle = '';
        }
        if (CheckIsNullOrEmpty(options.bcollapse)) {
            options.bcollapse = true;
        }
        if (CheckIsNullOrEmpty(options.bsplit)) {
            options.bsplit = true;
        }
        if(CheckIsNullOrEmpty(options.bchilds)){
            options.bchilds = {};
        }

        return options;
    }
};