angular.module('services',['angularSoap'])
    .factory('checkUser',function(){
    //检查用户登陆和注册时填写的格式
    function checkUserName(str, minLen, maxLen) {
        var reg = /^[(\u4e00-\u9fa5)a-z][(\u4e00-\u9fa5)a-zA-Z0-9_]{1,15}$/;
        var len = str.length;
        return reg.test(str) && len >= minLen && len <= maxLen;
    }

    function checkEmail(str) {
        var reg = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
        return reg.test(str) && str.length >= 6 && str.length <= 64;
    }

    return function(form,option) {
        /*if(!form.account) return '用户名缺省';
        if(!form.password) return '密码缺省';
        if(!checkUserName(form.account, 4, 8)) return '用户名格式有误';
        if(!checkUserName(form.password,6,15)) return '密码格式有误';
        if(option=='signup'){
            if(!form.email) return 'Email缺省';
            if(!form.repeatPassword) return '重复密码缺省';
            if(!checkEmail(form.email)) return 'Email格式错误';
            if(form.password!==form.repeatPassword) return '密码不一致';
        }*/
        return null;
    };
    })
    .factory("testService", ['$soap',function($soap){
    var base_url = "http://ws.webxml.com.cn/WebServices/ValidateEmailWebService.asmx";

    return {
        GetReport: function(mail,port){
            //console.log($http.post(base_url));
            return $soap.post(base_url,'ValidateEmailAddressPro',{theEmail:mail,theEmailPort:port});
        }
    }
    }]);
