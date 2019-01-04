/**
 * 文件上传
 * 2018-12-01
 * 新增属性：
 * url：文件上传地址
 * accept：指定允许上传时校验的文件类型，默认images。可选值有:images图片/file所有文件/video视频/audio音频
 * acceptMime：规定打开文件选择框时，筛选出的文件类型，值为用逗号隔开的 MIME 类型列表。默认值为images
 * exts：允许上传的文件后缀，默认值：jpg|png|gif|bmp|jpeg
 * size：设置文件最大可允许上传的大小，单位 KB。不支持ie8/9。默认值为0
 * choose：选择文件后的回调函数，function(obj)
 * before：文件提交上传前的回调，function(obj)
 * done：执行上传请求后的回调，function(res, index, upload)
 * error：执行上传请求出现异常的回调（一般为网络异常、URL 404等），function(index, upload)
 * */
var JointFileUpload = {
    BaseProperty: function(){
        return {
            NameEN: 'JointFileUpload',
            NameCN: '文件上传',
            Version: '1.0.0',
            ReleaseDate: '2018-12-01'
        };
    },
    GetRenderHtml: function (options){
        var defaults = $.extend(JointFileUpload.GetProperty(options), JointFileUpload.BaseProperty());
        var macthOpt = JointFileUpload.MatchProperty(defaults);

        var html = '';
        html += ('<div class="layui-inline' + (defaults.showtable ? ' layui-form-pane' : '') + '" id="' + defaults.id + '_Main" style="width:95%;max-width:' + defaults.width + 'px">');
        if(defaults.showlabel) {
            html += ('<label class="layui-form-label" id="' + defaults.id + '_Label" style="' + macthOpt.labelStyle + '" for="' + defaults.id + '">' + defaults.labeltext + '：</label>');
        }
        html += '<div class="layui-upload">';
        html += ('<input readonly="true" class="layui-input-readonly" type="text" style="width:' + defaults.inputwidth + 'px" id="' + defaults.id + '" required="' + defaults.required + '" ' + macthOpt.attribute + ' value="' + (defaults.value || defaults.text) + '" clstype="' + defaults.NameEN + '" lay-verify="' + defaults.verify + '" />');
        if(!(defaults.readonly || defaults.viewmode)) {
            html += ('<button class="layui-btn layui-btn-primary layui-btn-sm" id="' + defaults.id + '_Btn1" style="padding: 0px 5px; margin-top: 0px;">选择文件</button>');
        }
        html += ('<button class="layui-btn layui-btn-primary layui-btn-sm" id="' + defaults.id + '_Btn2" style="padding: 0px 5px; margin-top: 0px; margin-left: 1px;" onclick="layer.open({type: 1,title: \'图片预览\', area:[\'550px\',\'580px\'], content: $(\'#' + defaults.id + '_ImgShow\')});">预览</button>');
        html += ('<div class="layui-upload-list" id="' + defaults.id + '_ImgShow" style="display: none;">');
        html += ('<img class="layui-upload-img" id="' + defaults.id + '_Img" style="width: 500px; height: 500px;">');
        html += ('<p id="' + defaults.id + '_DemoText"></p></div>');
        html += '</div></div>';
        //创建控件对应的对象
        eval(defaults.id + '_OBJ = defaults.obj;');
        html += ('<script>' + defaults.id + '_OBJ.done=function(res, index, upload){$(\'#' + defaults.id + '\').val(res.src);$(\'#' + defaults.id + '_Img\').attr("src", res.src);};');
        html += ('JointFileUpload.render(' + defaults.id + '_OBJ);</script>');

        return html;
    },
    GetProperty: function (options){
        var options = JointTextField.GetProperty(options);
        options.inputwidth = (options.width - options.labelwidth - 118);

        return options;
    },
    MatchProperty: function (defaults) {
        var options = JointTextField.MatchProperty(defaults);
        if(defaults.readonly || defaults.viewmode){
            options.inputClass += ' layui-form-disbaled ';
        }

        return options;
    },
    GetReadState: function (id){
        //返回控件的状态，只读返回为true
        return JointTextField.GetReadState(id);
    },
    SetReadState: function(id, read){
        //设置控件的状态，true为设置为只读
        var m = $('#' + id);
        if(read){
            m.removeClass('layui-input').addClass('layui-input-readonly').attr('readonly', 'true').addClass('layui-form-disbaled');
        }
        else{
            m.removeClass('layui-input-readonly').addClass('layui-input').removeAttr('readonly').removeClass('layui-form-disbaled');
        }
    },
    GetValue: function(id){
        return JointTextField.GetValue(id);
    },
    SetValue:function (id, val){
        JointTextField.SetValue(id, val);
    }
};