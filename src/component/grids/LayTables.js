/**
 * 普通表格
 * 2018-12-08
 * 常用属性：
 * multi：多选模式，默认false
 * selectfirst：自动选中第一条，默认true
 * selectall：自动全选，默认false，尚未实现
 * showpager：是否显示分页条，默认值为true
 * pagesize：每页展示条数，默认值为25
 * pagemodule：页码格式，默认值[20, 40, 60, 80, 100, 200]
 * skinsize：表格大小，默认是sm，可选值sm、''、lg
 * ajaxurl：异步回调地址，可配置，也可在回调时固定地址，这里暂不处理
 * width：表格宽度
 * height：表格高度
 * rowdata：表格列定义
 * 常用事件：
 * onclick：行点击事件
 * ondblclick：行双击事件
 * onrightclick：行右击事件
 * */
var JointLayTable = {
    BaseProperty: function(){
        return {
            NameEN: 'JointLayTable',
            NameCN: '普通表格',
            Version: '1.0.0',
            ReleaseDate: '2018-12-08'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointLayTable.GetProperty(options), JointLayTable.BaseProperty());

        var html = '';
        html += ('<div id="' + defaults.id + '_Main" style="width:' + defaults.width + ';">');
        html += ('<table id="' + defaults.id + '" class="layui-table"></table>');
        html += '</div><script>JointLayTable.RenderTable("' + defaults.id + '");</script>';

        //创建控件对应的对象
        eval(defaults.id + "_RowData=defaults.rowdata;");
        eval(defaults.id + "_JSDS = {Ajax:'true',KeyWordsID:'',QueryFFuncID:'',SelectMode:'" + (defaults.multi ? "true" : "false") + "',ClientRowClickEvent:'" + defaults.onclick + "',ClientRowDblClickEvent:'" + defaults.ondblclick + "',ClientRowRightClickEvent:'" + defaults.onrightclick + "',IsShowPager:'" + (defaults.showpager ? "true" : "false") + "',AutoSelectFirstRow:'" + (defaults.selectfirst ? "true" : "false") + "',objRowData:" + defaults.id + "_RowData,Height:'" + defaults.height + "',PageSize:'" + defaults.pagesize + "',PageModule:'" + defaults.pagemodule + "',SkinSize:'" + defaults.skinsize + "',AjaxUrl:'" + defaults.ajaxurl + "'};");

        return html;
    },
    GetProperty: function (options) {
        if(CheckIsNullOrEmpty(options.width)){
            options.width = "100%";
        }
        if(CheckIsNullOrEmpty(options.multi)){
            options.multi = false;
        }
        if(CheckIsNullOrEmpty(options.onclick)){
            options.onclick = '';
        }
        if(CheckIsNullOrEmpty(options.ondblclick)){
            options.ondblclick = '';
        }
        if(CheckIsNullOrEmpty(options.onrightclick)){
            options.onrightclick = '';
        }
        if(CheckIsNullOrEmpty(options.showpager)){
            options.showpager = true;
        }
        if(CheckIsNullOrEmpty(options.selectfirst)){
            options.selectfirst = true;
        }
        if(CheckIsNullOrEmpty(options.pagesize)){
            options.pagesize = 25;
        }
        if(CheckIsNullOrEmpty(options.pagemodule)){
            options.pagemodule = "[20, 40, 60, 80, 100, 200]";
        }
        if(CheckIsNullOrEmpty(options.skinsize)){
            options.skinsize = "sm";
        }
        if(CheckIsNullOrEmpty(options.ajaxurl)){
            options.ajaxurl = "";
        }

        return options;
    }
};
