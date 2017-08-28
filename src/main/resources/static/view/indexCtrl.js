define(['../script/sdd','jquery','../script/service/userService'],function(module, $,UserService){
    module.controller("indexCtrl",function($rootScope,$scope,$http,$resource,$location,commonService,$route,$timeout) {
        // console.log("欢迎加入");


        //初始化路径
        $rootScope.$on('$locationChangeSuccess', function (e) {
            $rootScope.path = $location.path();
            if ($rootScope.path === '/' || $rootScope.path.length === 0) {
                $rootScope.isHome = true;
                $rootScope.mainMenuIndex = 0; //主菜单索引
                $(".userList").removeClass("hide");
            } else {
                $rootScope.isHome = false;
            }
        });

        $scope.jumpMain = function(){
            window.location.href = "/";
        };

    });
});