(function(){
  console.log('onboarding.js loaded');
  'use strict';
  angular.module('scriveApp')

  .config(function config($stateProvider) {
      // $urlRouterProvider.otherwise('/login');
      console.log('config method of onboarding.js');
      $stateProvider

        .state('onboarding', {
          url: '/onboarding',
          templateUrl: './app/templates/onboarding/onboarding.html',
          controller: 'OnboardingController as vm',
          data: { pageTitle: 'onboarding' }
        })
  })

  .controller('OnboardingController', function OnboardingController($state, $scope, ServerRequest, $localStorage, Upload){
    var vm = this;

    vm.user = $localStorage.user;
    vm.actionName = "CREATE PROFILE";
    vm.selectedUserType = "lawyer";
    vm.submitForm = submitForm;

    function submitForm() {
          console.log('update account hit')
          ServerRequest.createProfile(vm.signUpInfo)
          .then(function(resp) {
                        console.log(resp);
                        if (resp.success === 1) {
                            $localStorage.user = resp.user;
                            console.log('successfully created user')
                            $state.go('dashboard.home');
                        } else {
                            console.log('account was not created successfully')
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
        }
  }); //end of controller
})();
