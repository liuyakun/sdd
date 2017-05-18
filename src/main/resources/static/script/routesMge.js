define([], function () {
    return {
        routes: {
            '/mge/news':{
                templateUrl: '/viewMge/news.html',
                dependencies: ['../viewMge/newsCtrl']
            },
            '/mge/modifyPwd':{
                templateUrl: '/viewMge/modifyPwd.html',
                dependencies: ['../viewMge/modifyPwdCtrl']
            },
            '/mge/projectManage':{
                templateUrl: '/viewMge/projectManage.html',
                dependencies: ['../viewMge/projectManageCtrl']
            }
        }
    };
});

