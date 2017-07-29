/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('classicProjectCtrl',function($resource,$scope,$rootScope,$timeout,$location){
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;

        $scope.checkTypeNow = 0;
        $scope.checkTypeNowTwo = 0;
        $scope.projectTypeList = [
            {id:0,typeName:'全部',childrenList:[]},
            {
                id:1,
                typeName:'建筑设计',
                childrenList:[
                    {id:11,typeName:'办公建筑'},
                    {id:12,typeName:'居住建筑'},
                    {id:13,typeName:'教育建筑'},
                    {id:14,typeName:'商业与服务建筑'},
                    {id:15,typeName:'酒店与休闲建筑'},
                    {id:16,typeName:'文化与体育建筑'},
                    {id:17,typeName:'医疗与科研建筑'},
                    {id:18,typeName:'工业与交通建筑'}
                ]
            },
            {id:2,typeName:'城市规划',childrenList:[]},
            {
                id:3,
                typeName:'室内设计',
                childrenList:[
                    {id:31,typeName:'建筑改造'},
                    {id:32,typeName:'装饰装修'}
                ]
            },
            {
                id:4,
                typeName:'景观设计',
                childrenList:[
                    {id:41,typeName:'市政绿化'},
                    {id:42,typeName:'景观园林'}
                ]
            },
        ];

        $scope.selectChange = function(){
            $scope.twoTypeList = [];
            for(var i = 0;i<$scope.projectTypeList.length;i++){
                if($scope.projectTypeList[i].id === $scope.checkTypeNow){
                    $scope.twoTypeList = $scope.projectTypeList[i].childrenList;
                    break;
                }
            }
        };

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
        this.pageInfoArticle = function(type){
            if(type === 1){
                $scope.selectChange();
            }

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

        $scope.pageInfoArticleByType = function(typeId,twoTypeId,type){
            if(type === 1 ){
                $scope.checkTypeNow = typeId;
            }
            if(typeId === 0){
                typeId = null;
            }
            if(twoTypeId === 0){
                twoTypeId = null;
            } else{
                    $scope.checkTypeNowTwo = twoTypeId;
            }
            _this.searchData.typeId = typeId;
            _this.searchData.twoTypeId = twoTypeId;
            _this.pageInfoArticle(type);
        };

    });
});