/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('newsMainCtrl',function($resource,$scope,$rootScope,$timeout,$location,$routeParams,$sce){
        console.log("新闻詳情");

        var _this = this;
        $scope.nid = $routeParams.id;
        var infoArticleService = new InfoArticleService($resource);

        //获取新闻信息
        this.project = {};
        this.getByIdInfoArticle = function () {
            infoArticleService.getByIdInfoArticle($scope.nid,function(data){
                if(data.status == 'true') {
                    _this.project = data.message;
                    _this.trustedBody = $sce.trustAsHtml(data.message.content);
                }
                console.log(_this.project);
            });
        };
        this.getByIdInfoArticle();



    });
});