define(['../script/mge','jquery','../script/service/loginService'],function(module, $, LoginService){
    module.controller("indexMgeCtrl",function($rootScope,$scope,$http,$resource,$location,$route,$timeout,mgeService) {

        var _this =this;

        //通过token获得用户信息
        var loginService = new LoginService($resource);
        this.userInfo = {};
        this.loginInfo = function (loginCookie) {
            loginService.loginInfo(loginCookie, function (data) {
                if (data.status == "true") {
                    _this.userInfo = data.message;
                    // console.log(data);
                } else {
                    mgeService.deleteCookie("token_staff");
                    window.location.href='/mge/login';
                }

            })
        };

        //监控浏览器地址栏变化，如果变化刷新页面。解决点击浏览器的回退，前进按钮页面不刷新的问题
        $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
            if($rootScope.path === newLocation) {
                //alert('Why did you use history back?');
                window.location.href = newLocation
            }
        });

        //token登录权限
        var loginCookie = mgeService.getCookie('token_staff');//获取token
        if (loginCookie == "") {
            window.location.href='/mge/login';
        } else {
            $rootScope.loginCookie = loginCookie;
            this.loginInfo(loginCookie, false);
        }


        //注销登录
        this.loginOut = function(){
            loginService.loginOut(function(data){
                if (data.status == "false") {
                    mgeService.deleteCookie("token_staff");
                }
                window.location.href = "/mge/login";
            });
        };

    });
});