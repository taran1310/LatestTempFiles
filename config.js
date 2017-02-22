app.controller('myController', ['$scope','$http','$state','$rootScope', myController]);

app.controller('dashboardController', ['$scope','$http','$rootScope', dashboardController]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        /*.state('home', {
            url: '/home',
            templateUrl: 'index.html',
            controller: homePageCtrl
        })*/

        .state('main', {
            url: '/main',
            templateUrl: 'loginPage.html',
            controller: myController
        })


        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboardPage.html',
            controller: dashboardController
        });

}]);
