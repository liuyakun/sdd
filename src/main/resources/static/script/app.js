requirejs.config({
    paths:{
        angular:"/script/lib/angular/angular.min",
        jquery:'/script/js/jquery.min',
        angularResource: "/script/lib/angular-resource/angular-resource.min",
        angularRoute:"/script/lib/angular-route/angular-route.min",
        bootstrap: "/script/lib/bootstrap/dist/js/bootstrap.min",
        ajaxfileupload: "/script/lib/ajaxfileupload/ajaxfileupload.min",
        md5:"/script/lib/js-md5/js/md5.min",
        bootstrapDateTimePicker:"/script/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
        bootstrapDateTimePickerCN:"/script/lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        flot:"/script/lib/flot/jquery.flot",
        org : "/script/js/org"
    },
    shim:{
        jquery: { exports: '$' },
        bootstrap: ['jquery'],
        angular: { exports: 'angular',deps:['jquery']},
        angularResource: ['angular'],
        angularRoute:['angular'],
        ajaxfileupload:['jquery'],
        bootstrapDateTimePicker:['bootstrap'],
        bootstrapDateTimePickerCN:['bootstrapDateTimePicker'],
        flot:['jquery'],
        org:['jquery']
    }
});

require
(
    [
        'angular','../view/indexCtrl','../script/service/commonService','../script/filter/filter'
    ],
    function(angular)
    {
        angular.bootstrap(document, ['sdd']);
    }
);

