/**
 * Created by Administrator on 2016/2/25.
 */
define(['../mge'],function(module){
    module.filter('sexType',function(){
        return function(input) {
            var sexType = "";
            if (input == 1) sexType = "男";
            else if (input == 2) sexType = "女";
            return sexType;
        }
    });

     module.filter('typeId',function(){
        return function(input) {
            var sexType = "";
            if (input == 1) sexType = "办公建筑";
            else if (input == 2) sexType = "城市规划";
            else if (input == 3) sexType = "工业与交通建筑";
            else if (input == 4) sexType = "建筑改造及装饰装修";
            else if (input == 5) sexType = "教育建筑";
            else if (input == 6) sexType = "酒店与休闲建筑";
            else if (input == 7) sexType = "居住建筑";
            else if (input == 8) sexType = "绿化与景观";
            else if (input == 9) sexType = "商业与服务建筑";
            else if (input == 10) sexType = "文化与体育建筑";
            else if (input == 11) sexType = "医疗与科研建筑";
            return sexType;
        }
    });
    
});