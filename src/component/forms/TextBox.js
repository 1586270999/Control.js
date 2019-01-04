/**
* 单行文本输入框
* 2018-11-28
* */
var JointTextField = {
    BaseProperty: function(){
        return {
            NameEN: 'JointTextField',
            NameCN: '单行文本输入框',
            Version: '1.0.0',
            ReleaseDate: '2018-11-28'
        };
    },
    GetRenderHtml: function (options) {
        var defaults = JointTextField.GetProperty(options);
        var macthOpt = JointTextField.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel){
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += ('<div class="layui-input-inline" style="width:75%;max-width:' + defaults.inputwidth + 'px;">');
        html += ('<input class="' + macthOpt.inputClass + '" id="' + defaults.id + '" style="' + macthOpt.inputStyle + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' type="' + defaults.inputmode + '" value="' + (defaults.value || defaults.text) + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '"/>');
        html += '</div></div>';

        return html;
    },
    GetProperty: function (options) {
        var property = ObjectCopy(JointFormBase.BaseProperty());
        var options = $.extend(property, options);
        if(options.intable){
            options.showlabel = options.readonly = options.required = false;
            options.inputwidth = options.width;
            options.labeltext = '';
        }
        else{
            if(options.labeltext == '' || options.labelwidth == 0){
                options.showlabel = false;
                options.labelwidth = 0;
            }
            if(!options.showlabel){
                options.inputwidth = options.width;
                options.labeltext = '';
            }
            else{
                if(options.readonly || options.viewmode){
                    options.inputwidth = (options.width - options.labelwidth - 40);
                }
                else{
                    options.inputwidth = (options.width - options.labelwidth - 35);
                }
            }
        }
        if (CheckIsNullOrEmpty(options.verify)) {
            options.verify = (options.required ? 'required' : '');
        }
        if(options.placeholder == '' && options.labeltext != '' && options.required && !options.readonly){
            options.placeholder = ('请输入' + options.labeltext);
        }

        return $.extend(options, JointTextField.BaseProperty());
    },
    MatchProperty: function(defaults){
        //计算属性
        var labelStyle = '', inputStyle = '', inputClass = 'layui-input', attribute = '';
        if (defaults.showlabel) {
            labelStyle += ('width:' + defaults.labelwidth + 'px;');
            if(defaults.labelalign != 'left')
                labelStyle += ('text-align:' + defaults.labelalign + ';');
            if(defaults.labelcolor == '' && defaults.required){
                labelStyle += ('color: red;');
            }
            else if(defaults.labelcolor != ''){
                labelStyle += ('color: ' + defaults.labelcolor + ';');
            }
        }
        if(defaults.textalign != 'left'){
            inputStyle += ('text-align:' + defaults.textalign + ';');
        }
        if(defaults.inputstyle != ''){
            inputStyle += defaults.inputstyle;
        }
        if (defaults.readonly || defaults.viewmode) {
            inputClass = 'layui-input-readonly';
            attribute += 'readonly ';
        }
        if (!CheckIsNullOrEmpty(defaults.forsave)) {
            attribute += ('forsave="' + defaults.forsave + '" ');
        }
        if (!CheckIsNullOrEmpty(defaults.fieldname)) {
            attribute += ('fieldname="' + defaults.fieldname + '" ');
        }
        if (!CheckIsNullOrEmpty(defaults.fieldalias)) {
            attribute += ('fieldalias="' + defaults.fieldalias + '" ');
        }
        if (defaults.onkeypress != '') {
            attribute += ('onkeypress="' + defaults.onkeypress + '" ');
        }
        if (defaults.onkeyup != '') {
            attribute += ('onkeyup="' + defaults.onkeyup + '" ');
        }
        if (defaults.onkeydown != '') {
            attribute += ('onkeydown="' + defaults.onkeydown + '" ');
        }
        if (defaults.onchange != '') {
            attribute += ('onchange="' + defaults.onchange + '" ');
        }
        if (defaults.onblur != '') {
            attribute += ('onblur="' + defaults.onblur + '" ');
        }
        if (defaults.onfocus != '') {
            attribute += ('onfocus="' + defaults.onfocus + '" ');
        }
        if (defaults.onclick != '') {
            attribute += ('onclick="' + defaults.onclick + '" ');
        }
        if(defaults.placeholder != ''){
            attribute += ('placeholder="' + defaults.placeholder + '" ');
        }
        if(defaults.title != ''){
            attribute += ('title="' + defaults.title + '" ');
        }

        return {
            labelStyle: labelStyle,
            inputStyle: inputStyle,
            inputClass: inputClass,
            attribute: attribute
        };
    },
    GetReadState: function (id) {
        //返回控件的状态，只读返回为true
        return $('#' + id).hasClass('layui-input-readonly');
    },
    SetReadState: function(id, read){
        //设置控件的状态，true为设置为只读
        var m = $('#' + id);
        if(read){
            m.removeClass('layui-input').addClass('layui-input-readonly').attr('readonly', 'true');
        }
        else{
            m.removeClass('layui-input-readonly').addClass('layui-input').removeAttr('readonly');
        }
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
