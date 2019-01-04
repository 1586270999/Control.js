/**
* 所有表单控件基类
* 2018-11-28
* */
var JointFormBase = {
    BaseProperty: function() {
        return $.extend(ControlsBase.BaseProperty(), {
            id: '', /*输入框id，必须传入*/
            showlabel: true, /*是否显示label标签，默认为true*/
            width: 300, /*控件宽度，默认为300px*/
            labelwidth: 80, /*label标签宽度，默认为80px*/
            labelalign: 'left', /*label标签对齐方式，默认为左对齐*/
            labelcolor: '', /*label标签颜色，默认为空，当isrequired=true时，自动为red*/
            labeltext: '', /*label标签内容，默认为空*/
            inputwidth: 220, /*input输入框宽度，默认为220px*/
            textalign: 'left', /*input输入框对齐方式，默认为左对齐*/
            inputmode: 'text', /*输入模式，默认为文本输入框，密码输入时设为password*/
            required: false, /*是否必填，默认为false*/
            readonly: false, /*是否只读，默认为false*/
            viewmode: false, /*是否查看模式，默认为false*/
            fieldname: '', /*对应需要保存的字段名，默认为空*/
            fieldalias: '', /*对应需要显示的字段名,存在隐藏值和显示值时使用，默认为空*/
            forsave: false, /*是否需要进行保存，默认为false*/
            title: '', /*鼠标滑过时内容提示*/
            value: '', /*对应需要保存的字段的值，默认为空*/
            text: '', /*对应需要显示的字段,存在隐藏值和显示值时使用，默认为空*/
            placeholder: '', /*默认文本提示内容，默认为空*/
            verify: '', /*校验模式，默认为空*/
            inputstyle: '', /*input输入框样式追加*/
            showtable: false, /*是否呈现表格样式，默认为false*/
            intable: false, /*是否用于表格内嵌显示，默认为false*/
            intableid: '', /*在id的Table表格内嵌*/
            onclick: '', /*输入框的点击事件*/
            onkeypress: '', /*输入框的onkeypress事件，默认为空*/
            onkeyup: '', /*输入框的onkeyup事件，默认为空*/
            onkeydown: '', /*onkeydown，默认为空*/
            onchange: '', /*onchange，默认为空*/
            onblur: '', /*onblur，默认为空*/
            onfocus: '' /*onfocus，默认为空*/
        });
    },
    GetReadState: function (id) {
        //返回控件的状态，只读返回为true
    },
    SetReadState: function(id, read) {
        //设置控件的状态，true为设置为只读
    },
    GetValue: function(id) {
        //返回控件的值
    },
    SetValue:function (id, val) {
        //设置控件的值
    }
};

