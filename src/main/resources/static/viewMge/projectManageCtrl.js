/**
 * Created by 刘亚坤
 */
define(['../script/mge','jquery','ZeroClipboard','../script/service/infoArticleService',
    '../viewMge/myPagination','ajaxfileupload'],function(module, $, zeroClipboard, InfoArticleService){
    module.controller('projectManageCtrl',function($resource,$scope,$rootScope,$timeout,$location,mgeService,$route){
        // console.log("news");
        window['ZeroClipboard'] = zeroClipboard;
        var infoArticleService = new InfoArticleService($resource);
        var _this = this;
        $rootScope.stayUrl = 2;

        $scope.projectTypeList = [
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

        //--------------------------------------------------列表------------------------------------------------------
        //获取项目 列表
        this.projectList = [];
        $scope.objectPage = {
            currentPage : 1,
            totalPage : 0,
            pageSize : 5,
            pages : []
        };
        this.searchData = {};
        $scope.layPageInit = true;
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
                if($scope.layPageInit){
                    $scope.layPageInit = false;
                    layui.use(['laypage', 'layer'], function(){
                        var laypage = layui.laypage
                                ,layer = layui.layer;
                        laypage({
                            cont: 'demo1'
                            ,pages: $scope.objectPage.totalPage //总页数
                            ,groups: 5 //连续显示分页数
                            ,jump: function(obj, first){
                                  if(!first){
                                    layer.msg('第'+ obj.curr +'页');
                                    $scope.$apply(function(){
                                        $scope.objectPage.currentPage = obj.curr;
                                    });
                                  }
                                }
                          });
                    });
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
            $('#deleteShow').show();
        };
        //取消删除
        this.cancelDelete = function(){
            this.deleteId = "";
            $('#deleteShow').hide(200);
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


        //loading
        $('#loadShow').hide();
        this.loadIsShow = function(){
            $('#loadShow').show();
        };
        this.loadIsHide = function(){
            $('#loadShow').hide(200);
        };

        //--------------------------------------------新增-------------------------------------------------------
        //点击新增
        $("#addShow").hide();
        this.checkAdd = function(){
            this.titleShow = false;
            this.typeIdShow = false;
            this.contentShow = false;
            //---------------------清空file值---------------------------
            // $("#updatePreview_1").attr("src","");
            var obj = document.getElementById('doc_1') ;
            obj.outerHTML = obj.outerHTML;
            //---------------------------------end-----------------------

            var dd = document.getElementById("dd1");
            dd.innerHTML = "";

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
            if(this.addNewsData.title === "" || this.addNewsData.title === undefined){
                this.titleShow = true;
                return;
            }
            if($("#addSelect").val() == "?"){
                this.typeIdShow = true;
                return;
            }
            this.addNewsData.typeId = Number($("#addSelect").val()) + 1;
            this.addNewsData.infoId = 2;
            this.addNewsData.content =ue.getContent();
            if(this.addNewsData.content ===""){
                this.contentShow = true;
                return;
            }
            $('#loadShow').show();
            infoArticleService.addInfoArticle(this.addNewsData,function(data){
                if(data.status === "true"){
                    _this.uploadFile(data.message,1);
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
            this.modifyLeftLength = 100;
            this.titleShow = false;
            this.typeIdShow = false;
            this.contentShow = false;
            this.modifyLeftLength = this.maxLength - updateData.title.length;
            $scope.updateData = angular.copy(updateData);
            $scope.pathArray = [];
            $scope.pathArray = updateData.filePath.split("&");
            var dd2 = document.getElementById("dd2");
            dd2.innerHTML = "";
            console.log($scope.updateData);
            for (var i = 0; i < $scope.pathArray.length; i++) {
                dd2.innerHTML += "<div style='float:left;padding-right: 20px;' ><img style='width: 180px;height: 210px;' src='/upload/" + $scope.pathArray[i] + "'  /> </div>";
            }

            for(var i = 0;i<$scope.projectTypeList.length;i++){
                if($scope.projectTypeList[i].id === $scope.updateData.typeId){
                    $scope.twoTypeList = $scope.projectTypeList[i].childrenList;
                    break;
                }
            }

            ueModify.ready(function(){
                ueModify.setContent(updateData.content);
            });
            $("#updateShow").slideDown("slow");
            $("#listShow").slideUp("slow");
        };



        this.updateReturn = function(){
            $("#listShow").slideDown("slow");
            $("#updateShow").slideUp("slow");

//            $route.reload();
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
            if($scope.updateData.title === "" || $scope.updateData.title === undefined){
                this.titleShow = true;
                return;
            }
            $scope.updateData.content = ueModify.getContent();
            if($scope.updateData.content ===""){
                this.contentShow = true;
                return;
            }
            $('#loadShow').show();
            infoArticleService.updateInfoArticle($scope.updateData,function(data){
                if(data.status === "true"){
                    var docObj2 = document.getElementById("doc_2");
                    if(docObj2.files.length !== 0){
                        _this.uploadFile($scope.updateData.id,2);
                    }
                    _this.pageInfoArticle();
                    _this.updateReturn();
                }else{
                    console.log(data);
                }
                $('#loadShow').hide(200);
            });
        };

        //---------------------------------------------------上传图片-------------------------------------------------
        $scope.setImagePreviewList = function (num) {

            var docObj = document.getElementById("doc_"+num);

            var dd = document.getElementById("dd"+num);

            dd.innerHTML = "";

            var fileList = docObj.files;

            for (var i = 0; i < fileList.length; i++) {



                dd.innerHTML += "<div style='float:left;padding-right: 20px;' > <img id='img" + i + "'  /> </div>";

                var imgObjPreview = document.getElementById("img"+i);

                if (docObj.files && docObj.files[i]) {

                    //火狐下，直接设img属性

                    imgObjPreview.style.display = 'block';

                    imgObjPreview.style.width = '180px';

                    imgObjPreview.style.height = '210px';

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

                    localImagId.style.width = "180px";

                    localImagId.style.height = "210px";

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
                        if(num === 1){
                            _this.addReturn();
                        }else{
                            _this.updateReturn();
                        }
                        $('#loadShow').hide(200);
                        _this.pageInfoArticle();
                    },
                    error: function (data, status, e) {
                        alert(JSON.stringify(data));
                    }
                });
            }
        };


        //计算新增还可输入多少个字符
        this.maxLength = 100;
        this.leftLength = 100;
        this.calculateLength = function(){
            this.titleShow = false;
            if(this.addNewsData.title.length <= this.maxLength){
                this.leftLength = this.maxLength - this.addNewsData.title.length;
            } else{
                this.leftLength = 0;
            }
        };

        //计算修改还可输入多少个字符
        this.ModifycalculateLength = function(){
            this.titleShow = false;
            if($scope.updateData.title.length <= this.maxLength){
                this.modifyLeftLength = this.maxLength - $scope.updateData.title.length;
            } else{
                this.modifyLeftLength = 0;
                //return;
            }
        };


        $scope.twoTypeList = [];
        $scope.selectChange = function(type){
            var oneCaseId = null;
            if(type == "add"){
                oneCaseId = _this.addNewsData.typeId;
            }else{
                oneCaseId = $scope.updateData.typeId;
            }
            $scope.twoTypeList = [];
            for(var i = 0;i<$scope.projectTypeList.length;i++){
                if($scope.projectTypeList[i].id === oneCaseId){
                    $scope.twoTypeList = $scope.projectTypeList[i].childrenList;
                    break;
                }
            }
        };

    });
});