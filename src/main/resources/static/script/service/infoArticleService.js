/**
 * Created by 刘亚坤
 */
define([], function() {
    function InfoArticleService($resource) {
        this.addApi = $resource('/api/infoArticle');//新增
        this.updateApi = $resource("/api/infoArticle",null,{update:{method:"put"}}); //修改
        this.deleteInfoArticleApi = $resource('/api/infoArticle/:aid'); //删除
        this.getByIdInfoArticleApi = $resource("/api/infoArticle/:id"); //查询单个
        this.pageInfoArticleApi = $resource("/api/infoArticle/page"); //分页查询
    }

    //新增
    InfoArticleService.prototype.addInfoArticle = function(infoArticleData,cb){
        this.addApi.save(infoArticleData,function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })
    };

    //修改
    InfoArticleService.prototype.updateInfoArticle = function(infoArticleData,cb){
        this.updateApi.update(infoArticleData,function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        });
    };

    //删除
    InfoArticleService.prototype.deleteInfoArticle = function(aid,cb){
        this.deleteInfoArticleApi.remove({aid:aid},function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })
    };

    //查询单个
    InfoArticleService.prototype.getByIdInfoArticle = function(id,cb){
        this.getByIdInfoArticleApi.get({id:id},function(data){
            cb(data);
        },function(errData){
            cb(errData.data.error);
        })
    };

    //分页查询
    InfoArticleService.prototype.pageInfoArticle = function(infoArticleData,cb){
        this.pageInfoArticleApi.get(infoArticleData,function(data,headers){
            cb(data,headers);
        },function(errData){
            cb(errData.data.error);
        })
    }


    return InfoArticleService;

});