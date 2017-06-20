/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery'],function(module,$){
    module.controller('classicProjectPostCtrl',function($resource,$scope,$rootScope,$timeout,$location){

        $(function(){
            $('#rightslider ul').bxSlider({pager:false,auto: true});
        });

        //监控屏幕高度
        $("#projectcontent").height(document.body.offsetHeight-120);
        window.addEventListener("resize", function () {
            // 得到屏幕尺寸 (内部/外部宽度，内部/外部高度)
            $("#projectcontent").height(document.body.offsetHeight-120);
        }, false);

    });
});