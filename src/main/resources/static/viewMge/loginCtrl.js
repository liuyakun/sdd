/**
 * Created by 刘亚坤 on 2016/8/19.
 */
define(['../script/mge','jquery','../script/service/loginService','md5'],function(module, $, LoginService, MD5){
    module.controller('loginCtrl',function($resource,$scope,$rootScope,$timeout,$location,mgeService){
        var loginCookie = mgeService.getCookie('token_staff');//获取token
        if(loginCookie !== ""){
            $location.path('/mge');
        }

        var loginService = new LoginService($resource);

        this.loginData = {
            username:'',
            password:'',
        };  //登录信息
        this.passwordDisplay = ''; //显示的密码
        var _this = this;

        //用户登录
        this.login = function(){
            if(this.loginData.username === ''){
                return;
            }
            if(this.passwordDisplay === ''){
                return;
            }
            this.loginData.password = MD5(this.passwordDisplay);
            loginService.login(this.loginData,function(data){
                if(data.status == 'true'){
                    $location.path('/mge');
                } else {
                   console.log(data);
                }
            });
        };

    });
});