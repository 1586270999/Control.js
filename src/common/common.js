/**
* 公共js方法类
* 2018-11-28
* */

//判断JS对象是否存在或者null，如果不存在，这返回false
function CheckIsNullOrEmpty(avar) {
    return (
        (avar == null) ||
        (avar == 'null') ||
        (avar == undefined) ||
        (avar.toString() == '')
    );
};

//判断传入的方法名是否存在
function CheckIsJsFunction(fn) {
    return (typeof (fn) == 'function');
};

//数组或对象的拷贝
var ObjectCopy = function (obj) {
    if(obj === null) return null
    if(typeof obj !== 'object') return obj;
    if(obj.constructor===Date) return new Date(obj);
    if(obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor ();  //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }

    return newObj;
};

//单选框控件点击状态控制
fnSwitch2State = function (obj) {
    if ($(obj).hasClass("layui-form-checkbox")) {
        if ($(obj).attr("lay-value") == "1") {
            $(obj).attr("lay-value", 0);
            $(obj).removeClass("layui-form-checked");
        }
        else {
            $(obj).attr("lay-value", 1);
            $(obj).addClass("layui-form-checked");
        }
    }
    else {
        if ($(obj).attr("lay-value") == "1") {
            $(obj).attr("lay-value", 0);
            $(obj).removeClass("layui-form-onswitch");
            $(obj).find("em").html($(obj).attr("lay-text").split('|')[0]);
        }
        else {
            $(obj).attr("lay-value", 1);
            $(obj).addClass("layui-form-onswitch");
            $(obj).find("em").html($(obj).attr("lay-text").split('|')[1]);
        }
    }

    //是否为表格全选
    if ($(obj).attr("layTableAllChoose") == "true") {
        var checked = $(obj).attr("lay-value") == "1";
        var childs = $(obj).parents("div.layui-table-box").find('div[name="layTableCheckbox"]');
        childs.each(function (i, item) {
            if (checked) {
                $(item).attr("lay-value", 1);
                $(item).addClass("layui-form-checked");
            }
            else {
                $(item).attr("lay-value", 0);
                $(item).removeClass("layui-form-checked");
            }
        });
    }
};

//函数功能：对Url进行参数值的替换,有则进行替换，没有则进行追加
//参数说明：
//url      目标url
//arg      需要替换的参数名称
//arg_val  替换后的参数的值
//return url 参数替换后的url
function ChangeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }

    return url + '\n' + arg + '\n' + arg_val;
};

//函数功能：对Url进行参数值的追加,有则不处理，没有则进行追加
//参数说明：
//url      目标url
//arg      需要替换的参数名称
//arg_val  替换后的参数的值
//return url 参数替换后的url
function ChangeURLArg2(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (!url.match(pattern)) {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }

    return url + '\n' + arg + '\n' + arg_val;
};

//将JS对象转换成Url地址输入串
function JsObjectPackToQry(v_o) {
    var _qry = "";
    for (o_a in v_o) {
        if (typeof (v_o[o_a]) != "function") {
            var _value = encodeURI(v_o[o_a]);
            //alert(_value);
            //_qry += String.format("&{0}={1}", o_a, _value);
            _qry += "&" + o_a + "=" + _value;
        }
    }

    return _qry;
};

//递增
fnAddOneByOne = function (t) {
    var target = $(t.parentElement).prev();
    if (target.val() === "") {
        target.val(1);
    }
    else {
        target.val(parseInt(target.val()) + 1);
    }

    target.focus();
};

//递减
fnDecOneByOne = function (t) {
    var target = $(t.parentElement).prev();
    if (target.val() === "") {
        target.val(0);
    }
    else {
        target.val(parseInt(target.val()) - 1);
    }

    target.focus();
};

//数字录入控件
CheckIsNumberChar = function (object) {
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40)
        return false;
    var allowLessZero = $(object).attr("lesszero") == "true";
    var isFloat = $(object).attr("isfloat") == "true";

    var elv = object.value.replace(/[^0-9-.]+/, '');
    if (!allowLessZero) {
        elv = object.value.replace(/[^0-9.]+/, '');
    }

    if (!isFloat) {
        elv = elv.replace(/[^0-9-]+/, '');
    }

    if ((event.keyCode == 109 || event.keyCode == 189) && allowLessZero) {
        if (elv.indexOf('-') == elv.lastIndexOf('-')) {
            object.value = "-" + elv.replace(/[^0-9.]+/, '');
        }
        else {
            object.value = elv.substring(0, elv.length - 1);
        }
    }
    else if ((event.keyCode == 110 || event.keyCode == 190) && isFloat) {
        if (elv.indexOf('.') == elv.lastIndexOf('.')) {
            object.value = elv;
        }
        else {
            object.value = elv.substring(0, elv.length - 1);
        }
    }
    else {
        object.value = elv;
    }
};

//单选框组控件点击事件控制
fnChooseOneByGroup = function (cthis) {
    if (!$(cthis).hasClass("layui-form-radioed")) {
        $(cthis).parent().find(">div.layui-form-radioed").each(function () {
            $(this).removeClass("layui-form-radioed");
            $(this).find("i").removeClass("layui-anim-scaleSpring").removeClass("layui-icon-radio").addClass("layui-icon-unradio");
        });

        $(cthis).addClass("layui-form-radioed");
        $(cthis).find("i").addClass("layui-anim-scaleSpring").addClass("layui-icon-radio").removeClass("layui-icon-unradio");
    }
};

//循环每个项目
layeach = function (obj, fn) {
    var key, that = this;
    if (typeof fn !== 'function') return that;
    obj = obj || [];
    if (obj.constructor === Object) {
        for (key in obj) {
            if (fn.call(obj[key], key, obj[key])) break;
        }
    } else {
        for (key = 0; key < obj.length; key++) {
            if (fn.call(obj[key], key, obj[key])) break;
        }
    }
    return that;
};

//操作系统信息
device = function (key) {
    var agent = navigator.userAgent.toLowerCase()

        //获取版本号
        , getVersion = function (label) {
            var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
            label = (agent.match(exp) || [])[1];
            return label || false;
        }

        //返回结果集
        , result = {
            os: function () { //底层操作系统
                if (/windows/.test(agent)) {
                    return 'windows';
                } else if (/linux/.test(agent)) {
                    return 'linux';
                } else if (/iphone|ipod|ipad|ios/.test(agent)) {
                    return 'ios';
                } else if (/mac/.test(agent)) {
                    return 'mac';
                }
            }()
            , ie: function () { //ie版本
                return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
                    (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
                ) : false;
            }()
            , weixin: getVersion('micromessenger')  //是否微信
        };

    //任意的key
    if (key && !result[key]) {
        result[key] = getVersion(key);
    }

    //移动设备
    result.android = /android/.test(agent);
    result.ios = result.os === 'ios';

    return result;
};

//将数组中的对象按其某个成员排序
laysort = sort = function (obj, key, desc) {
    var clone = JSON.parse(
        JSON.stringify(obj || [])
    );

    if (!key) return clone;

    //如果是数字，按大小排序，如果是非数字，按字典序排序
    clone.sort(function (o1, o2) {
        var isNum = /^-?\d+$/
            , v1 = o1[key]
            , v2 = o2[key];

        if (isNum.test(v1)) v1 = parseFloat(v1);
        if (isNum.test(v2)) v2 = parseFloat(v2);

        if (v1 && !v2) {
            return 1;
        } else if (!v1 && v2) {
            return -1;
        }

        if (v1 > v2) {
            return 1;
        } else if (v1 < v2) {
            return -1;
        } else {
            return 0;
        }
    });

    desc && clone.reverse(); //倒序
    return clone;
};

//阻止事件冒泡
laystope = function (thisEvent) {
    thisEvent = thisEvent || win.event;
    try { thisEvent.stopPropagation() } catch (e) {
        thisEvent.cancelBubble = true;
    }
};

//自定义模块事件
layonevent = function (modName, events, callback) {
    if (typeof modName !== 'string'
        || typeof callback !== 'function') return this;

    return layevent(modName, events, null, callback);
};

//执行自定义模块事件
var layconfig = { event: {} };
layevent = function (modName, events, params, fn) {
    var that = this
        , result = null
        , filter = events.match(/\((.*)\)$/) || [] //提取事件过滤器字符结构，如：select(xxx)
        , eventName = (modName + '.' + events).replace(filter[0], '') //获取事件名称，如：form.select
        , filterName = filter[1] || '' //获取过滤器名称,，如：xxx
        , callback = function (_, item) {
        var res = item && item.call(that, params);
        res === false && result === null && (result = false);
    };

    //添加事件
    if (fn) {
        layconfig.event[eventName] = layconfig.event[eventName] || {};

        layconfig.event[eventName][filterName] = [fn];
        return this;
    }

    //执行事件回调
    layeach(layconfig.event[eventName], function (key, item) {
        //执行当前模块的全部事件
        if (filterName === '{*}') {
            layeach(item, callback);
            return;
        }

        //执行指定事件
        key === '' && layeach(item, callback);
        key === filterName && layeach(item, callback);
    });

    return result;
};

//布局分割线拖拽
fnLayoutSplitMove = function(mthis, type, id){
    var obj = fnSearchObjectById(pageControls, id.slice(1));
    switch(type){
        case "top":
            if($(id).hasClass('layout-top-hide'))
                return false;
            var prev = $(mthis).prevAll('.layout-top:first');
            var next = $(mthis).nextAll('.layout-center:first');
            var offset = $(mthis).parent().offset().top;
            $(document).mousemove(function (e) {
                $(mthis).css("top", (e.clientY - offset)  + "px");
                prev.css("height", (e.clientY - offset) + "px");
                next.css("top", (e.clientY - offset + 4) + "px");

                if(obj != null){
                    obj.tmargin = (e.clientY - offset);
                }
            });
            break;
        case "bottom":
            if($(id).hasClass('layout-bottom-hide'))
                return false;
            var initMargin = event.clientY;
            var initBottom = $(mthis).css("bottom").replace("px", "") * 1;
            var prev = $(mthis).prevAll('.layout-center:first');
            var next = $(mthis).nextAll('.layout-bottom:first');
            $(document).mousemove(function (e) {
                var moveMargin = e.clientY - initMargin;
                $(mthis).css("bottom", (initBottom - moveMargin) + "px");
                prev.css("bottom", (initBottom - moveMargin + 4) + "px");
                next.css("height", (initBottom - moveMargin) + "px");

                if(obj != null){
                    obj.bmargin = (initBottom - moveMargin);
                }
            });
            break;
        case "left":
            if($(id).hasClass('layout-left-hide'))
                return false;
            var prev = $(mthis).prevAll('.layout-left:first');
            var next = $(mthis).nextAll('.layout-center:first');
            var offset = $(mthis).parent().offset().left;
            $(document).mousemove(function (e) {
                $(mthis).css("left", (e.clientX - offset) + "px");
                prev.css("width", (e.clientX - offset) + "px");
                next.css("left", (e.clientX - offset + 4) + "px");

                if(obj != null){
                    obj.lmargin = (e.clientX - offset);
                }
            });
            break;
        case "right":
            if($(id).hasClass('layout-right-hide'))
                return false;
            var initMargin = event.clientX;
            var initRight = $(mthis).css("right").replace("px", "") * 1;
            var prev = $(mthis).prevAll('.layout-center:first');
            var next = $(mthis).nextAll('.layout-right:first');
            $(document).mousemove(function (e) {
                var moveMargin = e.clientX - initMargin;
                $(mthis).css("right", (initRight - moveMargin) + "px");
                prev.css("right", (initRight - moveMargin + 4) + "px");
                next.css("width", (initRight - moveMargin) + "px");

                if(obj != null){
                    obj.rmargin = (initRight - moveMargin);
                }
            });
            break;
    }

    //释放MouseMove
    $(document).mouseup(function () {
        $(document).unbind("mousemove");
    });
};

fnSearchObjectById = function (controls, id) {
    var dest = null;

    for(var c in controls){
        var obj = controls[c];
        if(obj.id == id){
            dest = obj;
        }
        if(dest == null && !CheckIsNullOrEmpty(obj.lchilds)){
            dest = fnSearchObjectById(obj.lchilds, id);
        }
        if(dest == null && !CheckIsNullOrEmpty(obj.rchilds)){
            dest = fnSearchObjectById(obj.rchilds, id);
        }
        if(dest == null && !CheckIsNullOrEmpty(obj.tchilds)){
            dest = fnSearchObjectById(obj.tchilds, id);
        }
        if(dest == null && !CheckIsNullOrEmpty(obj.bchilds)){
            dest = fnSearchObjectById(obj.bchilds, id);
        }
        if(dest == null && !CheckIsNullOrEmpty(obj.childs)){
            dest = fnSearchObjectById(obj.childs, id);
        }

        if(dest != null){
            return dest;
        }
    }

    return dest;
};
