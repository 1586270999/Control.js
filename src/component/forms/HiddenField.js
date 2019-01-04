/**
 * 隐藏域
 * 2018-12-01
 * 属性：
 * fieldname：对应需要保存的字段名，默认为空
 * forsave：是否需要进行保存，默认为false
 * value：默认值
 * */
var JointHiddenField = {
    BaseProperty: function(){
        return {
            NameEN: 'JointHiddenField',
            NameCN: '隐藏域',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = $.extend(options, JointButton.BaseProperty());
        var attribute = '';
        if(!CheckIsNullOrEmpty(options.fieldname)){
            attribute += (' fieldname="' + options.fieldname + '"');
        }
        if(!CheckIsNullOrEmpty(options.value)){
            attribute += (' value="' + options.value + '"');
        }
        if(!CheckIsNullOrEmpty(options.forsave)){
            attribute += (' forsave="' + options.forsave + '"');
        }

        var html = ('<input type="hidden" id="'+ defaults.id + '" ' + attribute + ' />');

        return html;
    },
    GetValue: function(id){
        //返回控件的值
        return $('#' + id).val();
    },
    SetValue:function (id, val) {
        //设置控件的值
        $('#' + id).val(val);
    }
};
