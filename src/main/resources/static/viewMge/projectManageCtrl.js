/**
 * Created by 刘亚坤
 */
define(['../script/mge','jquery','ZeroClipboard','../script/service/infoArticleService',
    '../viewMge/myPagination','ajaxfileupload'],function(module, $, zeroClipboard, InfoArticleService){
    module.controller('projectManageCtrl',function($resource,$scope,$rootScope,$timeout,$location,mgeService){
        // console.log("news");
        window['ZeroClipboard'] = zeroClipboard;
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;
        $rootScope.stayUrl = 2;

        //--------------------------------------------------列表------------------------------------------------------
        //获取项目 列表
        this.projectList = [];
        $scope.objectPage = {
            currentPage : 1,
            totalPage : 0,
            pageSize : 10,
            pages : []
        };
        this.searchData = {};
        this.pageInfoArticle = function(){
            this.searchData.infoId = 2; //项目
            this.searchData.currentPage = $scope.objectPage.currentPage;
            this.searchData.pageSize = $scope.objectPage.pageSize
            infoArticleService.pageInfoArticle(this.searchData,function(data,headers){
                // console.log(data);
                $scope.objectPage.totalPage = headers('Page-Count');
                $scope.objectPage.pages = [];
                for(var i=1;i<=$scope.objectPage.totalPage;i++){
                    $scope.objectPage.pages.push(i);
                }
                _this.projectList = data.message;
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
            //---------------------清空file值---------------------------
            // $("#updatePreview_1").attr("src","");
            var obj = document.getElementById('doc_1') ;
            obj.outerHTML = obj.outerHTML;
            //---------------------------------end-----------------------
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
            initialFrameHeight:400
        });

        //新增项目
        this.addNewsData = {};
        this.addNews = function(){
            this.addNewsData.infoId = 2;
            this.addNewsData.content =ue.getContent();
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
            initialFrameHeight:400
        });

        //确认修改
        this.updateNews = function(){
            console.log($scope.updateData);
            $scope.updateData.content = ueModify.getContent();
            infoArticleService.updateInfoArticle($scope.updateData,function(data){
                if(data.status === "true"){
                    _this.pageInfoArticle();
                    _this.updateReturn();
                }else{
                    console.log(data);
                }
            });
        };

        //---------------------------------------------------上传图片-------------------------------------------------
        $scope.setImagePreviewList = function (num) {

            var docObj = document.getElementById("doc_1");

            var dd = document.getElementById("dd");

            dd.innerHTML = "";

            var fileList = docObj.files;

            for (var i = 0; i < fileList.length; i++) {



                dd.innerHTML += "<div style='float:left' > <img id='img" + i + "'  /> </div>";

                var imgObjPreview = document.getElementById("img"+i);

                if (docObj.files && docObj.files[i]) {

                    //火狐下，直接设img属性

                    imgObjPreview.style.display = 'block';

                    imgObjPreview.style.width = '150px';

                    imgObjPreview.style.height = '180px';

                    //imgObjPreview.src = docObj.files[0].getAsDataURL();

                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式

                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);

                }

                else {

                    //IE下，使用滤镜

                    docObj.select();

                    var imgSrc = document.selection.createRange().text;

                    alert(imgSrc)

                    var localImagId = document.getElementById("img" + i);

                    //必须设置初始大小

                    localImagId.style.width = "150px";

                    localImagId.style.height = "180px";

                    //图片异常的捕捉，防止用户修改后缀来伪造图片

                    try {

                        localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";

                        localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;

                    }

                    catch (e) {

                        alert("您上传的图片格式不正确，请重新选择!");

                        return false;

                    }

                    imgObjPreview.style.display = 'none';

                    document.selection.empty();

                }

            }
            return true;

        };


        //上传图片 num 1:add 2:update
        this.uploadFile = function (id, num) {
            var docObj = document.getElementById("doc_" + num);
            if (docObj.files[0] != undefined) {
                ajaxFileUpload(id);
            } else {
                alert("未选择上传文件，请选择后再上传！");
            }
            this.data = {id:id};
            function ajaxFileUpload(id) {
                $.ajaxFileUpload({
                    url: '/api/project/'+id+'/file',
                    type: 'post',
                    secureuri: false, //是否需要安全协议，一般设置为false
                    fileElementId: 'doc_' + num, // 上传文件的id、name属性名
                    dataType: 'Json', //返回值类型，一般设置为json、application/json
                    data: _this.data,//一同上传的数据
                    success: function (data,status) {
                        console.log(data);
                    },
                    error: function (data, status, e) {
                        alert(JSON.stringify(data));
                    }
                });
            }
        };

    });
});