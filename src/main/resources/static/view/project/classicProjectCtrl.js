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

        $scope.projectTypeList = [
            {id:0,typeName:'推荐'},
            {id:1,typeName:'办公建筑'},
            {id:2,typeName:'城市规划'},
            {id:3,typeName:'工业与交通建筑'},
            {id:4,typeName:'建筑改造及装饰装修'},
            {id:5,typeName:'教育建筑'},
            {id:6,typeName:'酒店与休闲建筑'},
            {id:7,typeName:'居住建筑'},
            {id:8,typeName:'绿化与景观'},
            {id:9,typeName:'商业与服务建筑'},
            {id:10,typeName:'文化与体育建筑'},
            {id:11,typeName:'医疗与科研建筑'}
        ];

        $scope.pageInfoArticleByType = function(typeId){
            if(typeId === 0){
                typeId = null;
            }
            _this.searchData.typeId = typeId;
            _this.pageInfoArticle();
        };

    });
});