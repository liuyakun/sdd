/**
 * Created by 刘亚坤
 */
define(['../../script/sdd','jquery'],function(module,$){
    module.controller('joinUsCtrl',function($resource,$scope,$rootScope,$timeout,$location){
        var map = new AMap.Map("map", {
            resizeEnable: true,
            center: [116.2751475403, 39.9563204304],//地图中心点
            zoom: 14 //地图显示的缩放级别

        });
        new AMap.Marker({
            map: map,
            /*icon: new AMap.Icon({
               size: new AMap.Size(40, 50),  //图标大小
               image: "../images/marker.png",
               // imageOffset: new AMap.Pixel(0, -60)
            }),*/
            size: new AMap.Size(40, 50),  //图标大小
            position: [116.2751475403, 39.9563204304],
            offset: new AMap.Pixel(0, -60)
        });

    });
});