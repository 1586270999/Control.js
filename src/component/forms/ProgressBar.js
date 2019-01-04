/**
 * 进度条
 * 2018-11-30
 * 新增属性：
 * size: 默认为空，可选择有big
 * bgcolor: 背景色，默认为green绿色，可选值有green/red/orange/cyan/blue/black/gray
 * percent: 百分比，进度数
 * showpercent: 是否显示进度数值
 * width: 宽度，默认为300px
 * */
var JointProgressBar = {
    BaseProperty: function(){
        return {
            NameEN: 'JointProgressBar',
            NameCN: '进度条',
            Version: '1.0.0',
            ReleaseDate: '2018-11-30'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(JointProgressBar.GetProperty(options), JointProgressBar.BaseProperty());

        var html = '';
        html += ('<div id="' + defaults.id + '_P" class="' + defaults.divClass1 + '" style="width:' + defaults.width + 'px;margin-top:20px;"' + ((defaults.showpercent) ? ' lay-showPercent="true"' : '') + '>');
        html += ('<div id="' + defaults.id + '" class="' + defaults.divClass2 + '" lay-percent="' + defaults.percent + '" style="width:' + defaults.percent + ';">');
        html += ('<span class="layui-progress-text">' + defaults.percent + '</span>');
        html += '</div></div>';

        return html;
    },
    GetProperty: function (options) {
        if(CheckIsNullOrEmpty(options.width)){
            options.width = 300;
        }
        if(CheckIsNullOrEmpty(options.showpercent)){
            options.showpercent = true;
        }
        if(CheckIsNullOrEmpty(options.percent)){
            options.percent = '0%';
        }
        options.divClass2 = 'layui-progress-bar';
        if(CheckIsNullOrEmpty(options.bgcolor)){
            options.divClass2 += ' layui-progress-green';
        }
        else{
            options.divClass2 += (' layui-progress-' + options.bgcolor);
        }
        options.divClass1 = 'layui-progress';
        if(!CheckIsNullOrEmpty(options.size)){
            options.divClass1 += ' layui-progress-big';
        }

        return options;
    },
    GetValue: function(id){
        //返回控件的值
        return $('#' + id).attr('lay-percent');
    },
    SetValue:function (id, val1, val2, val3) {
        //设置控件的值:val1,需要设置的值；val2,递增数值；val3,每次递增的时间,单位为ms，默认为1000
        if(CheckIsNullOrEmpty(val2)){
            $('#' + id).attr('lay-percent', val1).css("width", val1);
            $('#' + id).find('span').text(val1);
        }
        else{
            if(CheckIsNullOrEmpty(val3)){
                val3 = 1000;
            }
            var v = val1.replace('%', '') * 1, timer = setInterval(function(){
                v = v + val2 * 1;
                if(v >= 100){
                    v = 100;
                    clearInterval(timer);
                }
                JointProgressBar.SetValue(id, v + '%');
            }, val3);
        }
    }
};