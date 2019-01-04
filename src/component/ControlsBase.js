/**
* 所有控件的基类
* 2018-11-28
* */
var ControlsBase = {
    BaseProperty: function(){
       return {
           NameEN: 'ControlsBase',
           NameCN: '所有控件的基类',
           Version: '1.0.0',
           ReleaseDate: '2018-11-28'
       };
    },
    GetRenderHtml: function(options){
       for(var c in options){
           if(options[c] == "true"){
               options[c] = true;
           }
           if(options[c] == "false"){
               options[c] = false;
           }
        }

        var fn = eval(options.clstype + '.GetRenderHtml');
        return fn(options);
    }
};

