/**
 * Created by 刘亚坤
 */
define(['../script/mge','jquery','../script/service/infoArticleService','../viewMge/myPagination'],function(module, $, InfoArticleService){
    module.controller('newsCtrl',function($resource,$scope,$rootScope,$timeout,$location,mgeService){
        // console.log("news");
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;

        //--------------------------------------------------列表------------------------------------------------------
        //获取新闻列表
        this.newsList = [];
        $scope.objectPage = {
            currentPage : 1,
            totalPage : 0,
            pageSize : 10,
            pages : []
        };
        this.searchData = {};
        this.pageInfoArticle = function(){
            this.searchData.infoId = 1; //新闻
            this.searchData.currentPage = $scope.objectPage.currentPage;
            this.searchData.pageSize = $scope.objectPage.pageSize
            infoArticleService.pageInfoArticle(this.searchData,function(data,headers){
                // console.log(data);
                $scope.objectPage.totalPage = headers('Page-Count');
                $scope.objectPage.pages = [];
                for(var i=1;i<=$scope.objectPage.totalPage;i++){
                    $scope.objectPage.pages.push(i);
                }
                _this.newsList = data.message;
            });
        };
        this.pageInfoArticle();

        $scope.initPage = true;
        $scope.$watch('objectPage.currentPage',function(){
            if($scope.initPage){
                $scope.initPage = false;
                return;
            }
            _this.pageInfoArticle();
        });
        //--------------------------------------------------列表end---------------------------------------------------

        //--------------------------------------------删除-------------------------------------------------------
        //点击删除
        $('#deleteShow').hide();
        this.deleteId = "";
        this.checkDelete = function(id){
            this.deleteId = id;
            $('#deleteShow').slideDown("slow");
        };
        //取消删除
        this.cancelDelete = function(){
            this.deleteId = "";
            $('#deleteShow').slideUp("slow");
        };
        //确认删除
        this.confirmDelete = function(){
            infoArticleService.deleteInfoArticle(this.deleteId,function(data){
                // console.log(data);
                if(data.status === 'true'){
                    _this.pageInfoArticle();
                    _this.cancelDelete();
                }else{
                    console.log(data);
                }
            });
        };
        //--------------------------------------------删除end----------------------------------------------------

        //--------------------------------------------新增-------------------------------------------------------
        //点击新增
        $("#addShow").hide();
        this.checkAdd = function(){
            $("#addShow").slideDown("slow");
            $("#listShow").slideUp("slow");
        };
        this.addReturn = function(){
            $("#listShow").slideDown("slow");
            $("#addShow").slideUp("slow");
        };

    });
});