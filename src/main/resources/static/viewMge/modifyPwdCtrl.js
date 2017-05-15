/**
 * Created by 刘亚坤
 */
define(['../script/mge','jquery','md5','../script/service/loginService'],function(module, $, MD5,LoginService){
    module.controller('modifyPwdCtrl',function($resource,$scope,$rootScope,$timeout,$location,mgeService){
        $rootScope.stayUrl = 3;
        var _this = this;
        $("#errorId").hide();

        this.updateVendorHideStaffData = {
            // oldPassword:'', //旧密码
            password:'' //新密码
        };

        $scope.oldPasswordPattern = mgeService.regex("password"); //定义password的正则表达式
        $scope.passwordPattern = mgeService.regex("password"); //定义password的正则表达式

        //修改密码
        var loginService = new LoginService($resource);
        this.updatePasswordNull = false;
        this.modifyVendorStaffPwd = function (flag) {
            this.updatePasswordNull = true;
            if (!flag) return;
            this.staffData = {
                username:$rootScope.userInfo.name,
                password:MD5(this.updateVendorHideStaffData.password), //md5加密
            };
            loginService.modifyStaffPwd($rootScope.userInfo.id,this.staffData,function(data){
                if (data.status == "true") {
                    $scope.errorInfo = "密码修改成功";
                    _this.loginOut();
                }else {
                    $timeout(function(){
                        $("#errorId").hide(300);
                        $scope.errorInfo = "";
                    },1000);
                    console.log(data.message);
                }

            });
        };

        //注销登录
        this.loginOut = function(){
            loginService.loginOut(function(data){
                $("#errorId").show(300);
                if (data.status == "false") {
                    mgeService.deleteCookie("token_staff");
                }
                $timeout(function(){
                    window.location.href = "/mge/login";
                },700);
            });
        };

    });
});