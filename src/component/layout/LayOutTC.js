/**
 * 上中布局
 * 常用属性：
 * tmargin: 顶部边距，即左布局宽度，默认100
 * ttitle：顶部标题，默认空
 * tcollapse：是否显示顶部收缩按钮，默认true
 * tsplit：是否显示顶部分割线，默认true
 * title: 中间布局标题，默认为空
 * tchilds：顶部布局子控件
 * childs：中间布局子控件
 * */
var JointLayOutTC = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayOutTC',
            NameCN: '顶部-中间布局',
            Version: '1.0.0',
            ReleaseDate: '2018-12-06'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLayOutTC.GetProperty(options), JointLayOutTC.BaseProperty());

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
        html += ('<div class="layout-center" style="top:' + (defaults.tsplit ? (defaults.tmargin * 1 + 4) : (defaults.tmargin * 1 + 1)) + 'px;bottom:0px;width:100%;">');
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
        if(CheckIsNullOrEmpty(options.title)){
            options.title = '';
        }
        if(CheckIsNullOrEmpty(options.tchilds)){
            options.tchilds = {};
        }
        if(CheckIsNullOrEmpty(options.childs)){
            options.childs = {};
        }

        return options;
    }
};