/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('classicProjectCtrl',function($resource,$scope,$rootScope,$timeout,$location){
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;

        //--------------------------------------------------列表------------------------------------------------------
        //获取项目 列表
        this.projectList = [];
        $scope.objectPage = {
            currentPage : 1,
            totalPage : 0,
            pageSize : 100,
            pages : []
        };
        this.searchData = {};
        this.pageInfoArticle = function(){
            this.searchData.infoId = 2; //项目
            this.searchData.currentPage = $scope.objectPage.currentPage;
            this.searchData.pageSize = $scope.objectPage.pageSize
            infoArticleService.pageInfoArticle(this.searchData,function(data,headers){
                _this.projectList = data.message;
                for (var i = 0; i < _this.projectList.length; i++) {
                    _this.projectList[i].defaultPath = "/upload/" + _this.projectList[i].filePath.split("&")[0];
                }
            });
        };
        this.pageInfoArticle();


        //-----------------------------------------------跳转到详情页面---------------------------------
        $scope.jumpDefault = function (id) {
            $location.path("/web/project/classicProject/post/" + id);
        };

    });
});