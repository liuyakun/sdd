define([], function () {
    return {
        routes: {
            '/mge/news':{
                templateUrl: '/viewMge/news.html',
                dependencies: ['../viewMge/newsCtrl']
            }
        }
    };
});

