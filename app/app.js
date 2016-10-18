(function () {
  angular.module("scriveApp", [
    'ui.router', 'ui.bootstrap', 'ngStorage', 'ngFileUpload'
  ])

    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login'); //default route?
        console.log('hit $urlRouterProvider otherwise on app.js - Sam');
        // $stateProvider
        //
        //   .state('login', {
        //     url: '/login',
        //     templateUrl: './app/templates/login/login.html',
        //     controller: 'LoginController as vm',
        //     data: { pageTitle: 'login' }
        //   })

    })

    .controller('AppCtrl', function AppCtrl($scope, $state) {
      console.log('activated AppCtrl');
      // $state.go('login');
      $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          //sets page title

          if (angular.isDefined(toState.data.pageTitle)) {
            console.log('angular was defined and title set');
              $scope.pageTitle = toState.data.pageTitle + " | Scrive";
          }
      })
  })
})();
