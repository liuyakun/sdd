define([], function () {
    return {
        routes: {

            //-------------------------------------------关于大地-------------------------------------------------
            '/web/aboutSdd/gmSpeech': {
                templateUrl: '/view/aboutSdd/gmSpeech.html',
                dependencies: ['../view/aboutSdd/gmSpeedCtrl']
            },
            '/web/aboutSdd/serviceCategory': {
                templateUrl: '/view/aboutSdd/serviceCategory.html',
                dependencies: ['../view/aboutSdd/serviceCategoryCtrl']
            },
            '/web/aboutSdd/skillSpecialty': {
                templateUrl: '/view/aboutSdd/skillSpecialty.html',
                dependencies: ['../view/aboutSdd/skillSpecialtyCtrl']
            },
            '/web/joinUs': {
                templateUrl: '/view/aboutSdd/joinUs.html',
                dependencies: ['../view/aboutSdd/joinUsCtrl']
            },

            // 新的五個栏目
            '/web/aboutSdd/companyOverview': {
                templateUrl: '/view/aboutSdd/companyOverview.html',
                dependencies: ['../view/aboutSdd/companyOverviewCtrl']
            },
            '/web/aboutSdd/boardMember': {
                templateUrl: '/view/aboutSdd/boardMember.html',
                dependencies: ['../view/aboutSdd/boardMemberCtrl']
            },
            '/web/aboutSdd/org': {
                templateUrl: '/view/aboutSdd/org.html',
                dependencies: ['../view/aboutSdd/orgCtrl']
            },
            '/web/aboutSdd/cream': {
                templateUrl: '/view/aboutSdd/cream.html',
                dependencies: ['../view/aboutSdd/creamCtrl']
            },
            '/web/aboutSdd/enterpriseQuality': {
                templateUrl: '/view/aboutSdd/enterpriseQuality.html',
                dependencies: ['../view/aboutSdd/enterpriseQualityCtrl']
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
            '/web/project/classicProject/post/:id': {
                templateUrl: '/view/project/classicProjectPost.html',
                dependencies: ['../view/project/classicProjectPostCtrl']
            },

            //-------------------------------------------新闻列表-------------------------------------------------
            '/web/news/newsList': {
                templateUrl: '/view/news/newsList.html',
                dependencies: ['../view/news/newsListCtrl']
            },
            '/web/news/main/:id': {
                templateUrl: '/view/news/newsMain.html',
                dependencies: ['../view/news/newsMainCtrl']
            },

        }
    };
});


