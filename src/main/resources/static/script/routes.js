define([], function () {
    return {
        routes: {

            //-------------------------------------------关于大地-------------------------------------------------
            '/web/aboutSdd/gmSpeech': {
                templateUrl: '/view/aboutSdd/gmSpeech.html',
                dependencies: ['../view/aboutSdd/gmSpeedCtrl']
            },
            '/web/aboutSdd/companyOverview': {
                templateUrl: '/view/aboutSdd/companyOverview.html',
                dependencies: ['../view/aboutSdd/companyOverviewCtrl']
            },
            '/web/aboutSdd/coreIdea': {
                templateUrl: '/view/aboutSdd/coreIdea.html',
                dependencies: ['../view/aboutSdd/coreIdeaCtrl']
            },
            '/web/aboutSdd/serviceCategory': {
                templateUrl: '/view/aboutSdd/serviceCategory.html',
                dependencies: ['../view/aboutSdd/serviceCategoryCtrl']
            },
            '/web/aboutSdd/skillSpecialty': {
                templateUrl: '/view/aboutSdd/skillSpecialty.html',
                dependencies: ['../view/aboutSdd/skillSpecialtyCtrl']
            },
            '/web/aboutSdd/honor': {
                templateUrl: '/view/aboutSdd/honor.html',
                dependencies: ['../view/aboutSdd/honorCtrl']
            },

            //-------------------------------------------经典项目-------------------------------------------------
            '/web/project/classicProject': {
                templateUrl: '/view/project/classicProject.html',
                dependencies: ['../view/project/classicProjectCtrl']
            },
            '/web/project/classicProject/info': {
                templateUrl: '/view/project/classicProjectInfo.html',
                dependencies: ['../view/project/classicProjectInfoCtrl']
            },
            '/web/project/classicProject/post': {
                templateUrl: '/view/project/classicProjectPost.html',
                dependencies: ['../view/project/classicProjectPostCtrl']
            },

            //-------------------------------------------新闻列表-------------------------------------------------
            '/web/news/newsList': {
                templateUrl: '/view/news/newsList.html',
                dependencies: ['../view/news/newsListCtrl']
            },

        }
    };
});


