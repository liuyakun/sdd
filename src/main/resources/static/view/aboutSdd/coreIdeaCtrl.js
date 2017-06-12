/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery'],function(module,$){
    module.controller('coreIdeaCtrl',function($resource,$scope,$rootScope,$timeout,$location){
        $(function(){
            $('#rightslider ul').bxSlider({pager:false,auto: true});
        });
    });
});