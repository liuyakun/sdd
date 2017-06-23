/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('newsListCtrl',function($resource,$scope,$rootScope,$timeout,$location){
        console.log("新闻列表");
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
            this.searchData.infoId = 1; //项目
            this.searchData.currentPage = $scope.objectPage.currentPage;
            this.searchData.pageSize = $scope.objectPage.pageSize
            infoArticleService.pageInfoArticle(this.searchData,function(data,headers){
                _this.projectList = data.message;
                for (var i = 0; i < _this.projectList.length; i++) {
                    _this.projectList[i].defaultPath = "/upload/" + _this.projectList[i].filePath.split("&")[0];
                }
                console.log(_this.projectList);
            });
        };
        this.pageInfoArticle();

    });
});