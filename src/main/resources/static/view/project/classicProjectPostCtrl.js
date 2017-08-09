/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery','../../script/service/infoArticleService'],function(module,$,InfoArticleService){
    module.controller('classicProjectPostCtrl',function($resource,$scope,$rootScope,$timeout,$location,$routeParams,$sce){

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
        var sliderInfo = [];
        this.getByIdInfoArticle = function () {
            infoArticleService.getByIdInfoArticle($scope.pid,function(data){
                _this.project = data.message;
                $scope.fileList = _this.project.filePath.split("&");
                for (var i = 0; i < $scope.fileList.length; i++) {
                    $scope.fileList[i] = "/upload/" + $scope.fileList[i];
                }
                $timeout(function(){
                    sliderInfo = $('#rightslider ul').bxSlider({pager:false,auto: false,autoHover:false});
                },1000);
                _this.trustedBody = $sce.trustAsHtml(data.message.content);
            });
        };

        $scope.contentShow = false;

        this.getByIdInfoArticle();

        $scope.selectCarousel = function(index){
            var selectIndex = (index + 1) * 1180
            $("#rightsliderUl").css('transform','translate3d(-' + selectIndex + 'px, 0px, 0px)');
        };

        this.isFocus = false;
        $(document).click(function(){
            if(!_this.isFocus){
                $scope.contentShow = false;
            }
        });

        //滚动轮播
        $scope.sliderCarousel = function(index,count,type){
            // count = count -1;
            // console.log(index + "-------------" + count);
            var i = 0;
            if(type === 'up'){
                i = index - 1;
                if(i < 0){
                    i = count;
                }
            }else{
                i = index +1;
                if(i > count){
                    i = 0;
                }
            }
            var selectIndex = (i + 1) * 1180
            $("#rightsliderUl").css('transform','translate3d(-' + selectIndex + 'px, 0px, 0px)');
        };

        $scope.moveWheel1 = true;
        var scrollFunc = function (e) {
            if(!$scope.moveWheel1){
                return;
            }
            $scope.moveWheel1 = false;
            e = e || window.event;
            var type = '';
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    type = 'up';
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    type = 'down';
                }
            } else if (e.detail) {  //Firefox滑轮事件
                if (e.detail> 0) { //当滑轮向上滚动时
                    type = 'up';
                }
                if (e.detail< 0) { //当滑轮向下滚动时
                    type = 'down';
                }
            }
            var str = $("#rightsliderUl").css('transform');
            var index = -str.split(",")[4] / 1180 - 1;
            $scope.sliderCarousel(index,sliderInfo.getSlideCount(),type);
            setTimeout(function(){
                $scope.moveWheel1 = true;
            },200)
        }
        //给页面绑定滑轮滚动事件
        if (document.getElementById("rightsliderUl").addEventListener) {//firefox
            document.getElementById("rightsliderUl").addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法  //ie 谷歌
        document.getElementById("rightsliderUl").onmousewheel = document.getElementById("rightsliderUl").onmousewheel = scrollFunc;


    });
});