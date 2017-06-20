/**
 * Created by 刘亚坤
 */
define(['../script/mge','jquery','ZeroClipboard','../script/service/infoArticleService','../viewMge/myPagination'],function(module, $, zeroClipboard, InfoArticleService){
    module.controller('newsCtrl',function($resource,$scope,$rootScope,$timeout,$location,mgeService){
        // console.log("news");
        window['ZeroClipboard'] = zeroClipboard;
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;
        $rootScope.stayUrl = 1;

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
            this.titleShow = false;
            this.contentShow = false;
            this.addNewsData = {};
            ue.ready(function(){
                ue.setContent("");
            });
            $("#addShow").slideDown("slow");
            $("#listShow").slideUp("slow");
        };
        this.addReturn = function(){
            $("#listShow").slideDown("slow");
            $("#addShow").slideUp("slow");
        };

        UE.delEditor('container');
        var ue = UE.getEditor( 'container', {
            autoHeightEnabled: false,
            autoFloatEnabled: false,
            elementPathEnabled:false,
            initialFrameHeight:483
        });

        //新增新闻
        this.addNewsData = {};
        this.addNews = function(){
            if(this.addNewsData.title === "" || this.addNewsData.title === undefined){
                this.titleShow = true;
                return;
            }
            this.addNewsData.infoId = 1;
            this.addNewsData.content =ue.getContent();
            if(this.addNewsData.content ===""){
                this.contentShow = true;
                return;
            }
            infoArticleService.addInfoArticle(this.addNewsData,function(data){
                if(data.status === "true"){
                    _this.pageInfoArticle();
                    _this.addReturn();
                }else{
                    console.log(data);
                }
            });

        };
        //-----------------------------------------------------------新增end---------------------------------------------------

        //----------------------------------------------------------修改-------------------------------------------------------
        //点击修改
        $("#updateShow").hide();
        this.checkUpdate = function (updateData) {
            this.modifyLeftLength = 100;
            this.titleShow = false;
            this.contentShow = false;
            this.modifyLeftLength = this.maxLength - updateData.title.length;
            $scope.updateData = angular.copy(updateData);
            ueModify.ready(function(){
                ueModify.setContent(updateData.content);
            });
            $("#updateShow").slideDown("slow");
            $("#listShow").slideUp("slow");
        };

        this.updateReturn = function(){
            $("#listShow").slideDown("slow");
            $("#updateShow").slideUp("slow");
        };

        UE.delEditor('updateContainer');
        var ueModify = UE.getEditor( 'updateContainer', {
            autoHeightEnabled: false,
            autoFloatEnabled: false,
            elementPathEnabled:false,
            initialFrameHeight:483
        });

        //确认修改
        this.updateNews = function(){
            if($scope.updateData.title === "" || $scope.updateData.title === undefined){
                this.titleShow = true;
                return;
            }
            $scope.updateData.content = ueModify.getContent();
            if($scope.updateData.content ===""){
                this.contentShow = true;
                return;
            }
            infoArticleService.updateInfoArticle($scope.updateData,function(data){
                if(data.status === "true"){
                    _this.pageInfoArticle();
                    _this.updateReturn();
                }else{
                    console.log(data);
                }
            });
        };


        //计算新增还可输入多少个字符
        this.maxLength = 100;
        this.leftLength = 100;
        this.calculateLength = function(){
            this.titleShow = false;
            if(this.addNewsData.title.length <= this.maxLength){
                this.leftLength = this.maxLength - this.addNewsData.title.length;
            } else{
                this.leftLength = 0;
            }
        };

        //计算修改还可输入多少个字符
        this.ModifycalculateLength = function(){
            this.titleShow = false;
            if($scope.updateData.title.length <= this.maxLength){
                this.modifyLeftLength = this.maxLength - $scope.updateData.title.length;
            } else{
                this.modifyLeftLength = 0;
                //return;
            }
        };

    });
});