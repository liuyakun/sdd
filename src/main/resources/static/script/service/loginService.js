/**
 * Created by 刘亚坤 on 2016/8/19.
 */
define([], function() {
    function LoginService($resource) {
        this.loginApi = $resource('/api/staff/login');//通过用户名和密码登录
        this.loginInfoApi = $resource('/api/staff/login/:token_staff'); //通过token登陆
        this.loginOutApi = $resource('/api/staff/logout'); //注销登录
        this.modifyPasswordOfStaffApi = $resource('/api/staff/:sid/pwd',null,{'update':{method:'PUT'}}); //修改密码
    }

    //通过用户名和密码登录
    LoginService.prototype.login = function(staffValidate,cb){
        this.loginApi.save(staffValidate,function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })
    };

    //通过token登陆
    LoginService.prototype.loginInfo = function(token_staff,cb){
        this.loginInfoApi.get({token_staff:token_staff},function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })
    };

    //注销登录
    LoginService.prototype.loginOut = function(cb){
        this.loginOutApi.remove(function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })
    };

    //修改密码
    LoginService.prototype.modifyStaffPwd = function(sid,staff,cb){
        this.modifyPasswordOfStaffApi.update({sid:sid},staff,function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })

    };

    return LoginService;

});