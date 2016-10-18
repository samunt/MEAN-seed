(function() {
  console.log('login.js loaded')
  'use strict';
  angular.module('scriveApp')

  .config(function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/login');
      console.log('here');
      $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: './app/templates/login/login.html',
          controller: 'LoginController as vm',
          data: { pageTitle: 'login' }
        })
  })

  .controller('LoginController', function LoginController($state, $scope, ServerRequest, $localStorage){
    var vm = this;

    vm.register = register;

    function register() {
      console.log('signupbutton hit')
      ServerRequest.createAccount(vm.signUpInfo)
      .then(function(resp) {
                    console.log(resp);
                    if (resp.success === 1) {
                        $localStorage.user = resp.user;
                        console.log('successfully created user')
                        $state.go('onboarding');
                    } else {
                        console.log('account was not created successfully')
                        // $state.go('onboarding', {}); //take this out once backend connected
                        // vm.registerError = resp.error.responseText;
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
    }
  });
})();
