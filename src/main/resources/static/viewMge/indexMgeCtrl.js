define(['../script/mge','jquery','../script/service/loginService'],function(module, $, LoginService){
    module.controller("indexMgeCtrl",function($rootScope,$scope,$http,$resource,$location,$route,$timeout,mgeService) {

        var _this =this;
        //监控login
        $rootScope.isLogin = false;
        $rootScope.$on('$locationChangeSuccess', function (e) {
            $rootScope.path = $location.path();
            if ($rootScope.path === '/mge/login') {
                $rootScope.isLogin = false;
            } else {
                $rootScope.isLogin = true;
            }
        });

        //通过token获得用户信息
        var loginService = new LoginService($resource);
        this.userInfo = {};
        this.loginInfo = function (loginCookie) {
            loginService.loginInfo(loginCookie, function (data) {
                console.log(data);
                if (data.status == "true") {
                    _this.userInfo = data.message;
                } else {
                    mgeService.deleteCookie("token_staff");
                    $location.path("/mge/login");
                }

            })
        };

        //token登录权限
        var loginCookie = mgeService.getCookie('token_staff');//获取token
        if (loginCookie == "") {
            $location.path('/mge/login');
        } else {
            $rootScope.loginCookie = loginCookie;
            this.loginInfo(loginCookie, false);
        }

    });
});