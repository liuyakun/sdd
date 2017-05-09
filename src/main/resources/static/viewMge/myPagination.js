define(['../script/mge','jquery'],function(module,$){

    module.factory('myPaginationService',function(){

        //get page data function
        var getPageData = function(pageObject,page){
            pageObject.currentPage = page;
            if(pageObject.totalPage==0||pageObject.totalPage==null){
                pageObject.totalPage=1;
            }
            if (pageObject.currentPage > 1 && pageObject.currentPage < pageObject.totalPage) {
                pageObject.pages = [
                    pageObject.currentPage - 1,
                    pageObject.currentPage,
                    pageObject.currentPage + 1
                ];
            } else if (pageObject.currentPage == 1 && pageObject.totalPage == 1) {
                pageObject.pages = [
                    1
                ];
            } else if (pageObject.currentPage == 1 && pageObject.totalPage == 2) {
                pageObject.pages = [
                    1,2
                ];
            } else if (pageObject.currentPage == 1 && pageObject.totalPage > 2) {
                pageObject.pages = [
                    pageObject.currentPage,
                    pageObject.currentPage + 1,
                    pageObject.currentPage + 2
                ];
            } else if (pageObject.currentPage == pageObject.totalPage && pageObject.totalPage == 1) {
                pageObject.pages = [
                    1
                ];
            } else if (pageObject.currentPage == pageObject.totalPage && pageObject.totalPage == 2) {
                pageObject.pages = [
                    1,2
                ];
            } else if (pageObject.currentPage == pageObject.totalPage && pageObject.totalPage > 2) {
                pageObject.pages = [
                    pageObject.currentPage - 2,
                    pageObject.currentPage - 1,
                    pageObject.currentPage
                ];
            }
        };

        var service = {
            //click to the last page
            upPageClick: function(pageObject,page){
                if(pageObject.currentPage == 1){
                    return;
                };
                pageObject.currentPage --;
                getPageData(pageObject,page);
            },
            //click to the next page
            downPageClick: function(pageObject,page){
                if(pageObject.currentPage >= pageObject.totalPage){
                    return;
                };
                pageObject.currentPage ++;
                getPageData(pageObject,page);
            },
            //show the first page content
            showFirstPageContent: function(pageObject,page){
                pageObject.currentPage = 1;
                getPageData(pageObject,page);
            },
            //show the last page content
            showLastPageContent: function(pageObject,page){
                pageObject.currentPage = pageObject.totalPage;
                getPageData(pageObject,page);
            },
            //show the current page content
            showCurrentPageContent: function(pageObject,page){
                pageObject.currentPage = page;
                getPageData(pageObject,page);
            }
        };
        return service;
    });


    module.directive('myPagination',function(myPaginationService){
        return {
            restrict: 'A',
            replace: true,
            scope: {
                pageObject:'='
            },
            templateUrl: '../viewMge/myPagination.html',
            link: function(scope,element,attrs){
                //选择页
                scope.selectPage = function(page){
                    scope.pageObject.currentPage = page;
                };

                //上下翻页
                scope.changePage = function(operation){
                    if(operation == 'next'){
                        scope.pageObject.currentPage = (scope.pageObject.currentPage+1) > scope.pageObject.totalPage ? scope.pageObject.currentPage : (scope.pageObject.currentPage+1);
                    } else if(operation == 'prev'){
                        scope.pageObject.currentPage = (scope.pageObject.currentPage-1) < 1 ? scope.pageObject.currentPage : (scope.pageObject.currentPage-1);
                    }
                };

                scope.pageSelector = {
                    show : false,
                    focus: false
                };

                $(document).click(function(){
                    if(!scope.pageSelector.focus){
                        scope.$apply(function(){
                            scope.pageSelector.show = false;
                        });
                    }
                });

                //选择页
                scope.selectPage = function(page){
                    scope.pageObject.currentPage = page;
                };

            }
        };
    });

});