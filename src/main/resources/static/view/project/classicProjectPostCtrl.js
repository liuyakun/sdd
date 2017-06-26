/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('classicProjectPostCtrl',function($resource,$scope,$rootScope,$timeout,$location,$routeParams){

        var _this = this;
        $scope.pid = $routeParams.id;
        var infoArticleService = new InfoArticleService($resource);

        //监控屏幕高度
        $("#projectcontent").height(document.body.offsetHeight-120);
        window.addEventListener("resize", function () {
            // 得到屏幕尺寸 (内部/外部宽度，内部/外部高度)
            $("#projectcontent").height(document.body.offsetHeight-120);
        }, false);



        //获取项目信息
        this.project = {};
        $scope.fileList = [];
        this.getByIdInfoArticle = function () {
            infoArticleService.getByIdInfoArticle($scope.pid,function(data){
                _this.project = data.message;
                $scope.fileList = _this.project.filePath.split("&");
                for (var i = 0; i < $scope.fileList.length; i++) {
                    $scope.fileList[i] = "/upload/" + $scope.fileList[i];
                }
                $timeout(function(){
                    $('#rightslider ul').bxSlider({pager:false,auto: false});
                },1000);
            });
        };

        this.getByIdInfoArticle();

        $scope.selectCarousel = function(index){
            var selectIndex = (index + 1) * 1240
            $("#rightsliderUl").css('transform','translate3d(-' + selectIndex + 'px, 0px, 0px)');
        };

    });
});