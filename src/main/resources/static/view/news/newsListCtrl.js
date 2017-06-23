/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('newsListCtrl',function($resource,$rootScope,$timeout,$location,$scope){
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;

        //--------------------------------------------------列表------------------------------------------------------
        //获取项目 列表
        this.projectList = [];
        $scope.objectPage = {
            currentPage : 1,
            totalPage : 0,
            pageSize : 5,
            pages : []
        };
        this.searchData = {};
        this.pageInfoArticle = function(){
            this.searchData.infoId = 1; //项目
            this.searchData.currentPage = $scope.objectPage.currentPage;
            this.searchData.pageSize = $scope.objectPage.pageSize
            infoArticleService.pageInfoArticle(this.searchData,function(data,headers){
                $scope.objectPage.totalPage = headers("Page-Count");
                if($scope.objectPage.totalPage == null){
                    $scope.objectPage.totalPage = 0;
                }
                $scope.objectPage.pages = [];
                for(var i=1;i<=$scope.objectPage.totalPage;i++){
                    $scope.objectPage.pages.push(i);
                }

                _this.projectList = data.message;
                for (var i = 0; i < _this.projectList.length; i++) {
                    _this.projectList[i].defaultPath = "/upload/" + _this.projectList[i].filePath.split("&")[0];
                }
                // console.log(_this.projectList);
            });
        };
        this.pageInfoArticle();

        //上下翻页
        this.changePage = function(operation){
            if(operation == 'next'){
                $scope.objectPage.currentPage = ($scope.objectPage.currentPage+1) > $scope.objectPage.totalPage
                    ? $scope.objectPage.currentPage : ($scope.objectPage.currentPage+1);
            } else if(operation == 'prev'){
                $scope.objectPage.currentPage = ($scope.objectPage.currentPage-1) < 1
                    ? $scope.objectPage.currentPage : ($scope.objectPage.currentPage-1);
            } else if(operation == "homePage"){
                $scope.objectPage.currentPage = 1;
            } else if(operation == "endPage"){
                $scope.objectPage.currentPage = $scope.objectPage.totalPage;
            }
        };

        $scope.isFirstEnter = true;
        $scope.$watch("objectPage.currentPage",function(){
            $(window).scrollTop(0);
            if($scope.isFirstEnter){
                $scope.isFirstEnter = false;
                return;
            }
            _this.pageInfoArticle();
        });


        //跳转到新闻详情
        $scope.jumpNewsMain = function (id) {
            $location.path("/web/news/main/" + id);
        };

    });
});