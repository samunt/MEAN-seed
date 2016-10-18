(function() {
  console.log('home.js loaded')
  'use strict';
  angular.module('scriveApp')

  .config(function config($stateProvider) {
      // $urlRouterProvider.otherwise('/login');
      $stateProvider

        .state('dashboard.home', {
          url: '/dashboard/home',
          templateUrl: './app/templates/dashboard/home/home.html',
          controller: 'HomeController as vm',
          data: { pageTitle: 'home' }
        })
  })

  .controller('HomeController', function($state, $scope, ServerRequest, $localStorage){
    var vm = this;

    $scope.users = [
           {
              "firstName" : "Alfred",
              "lastName" : "Hitchcock",
              "pictureUrl" : "http://lorempixel.com/40/40/people/5/"
            },{
              "firstName" : "Niccolo",
              "lastName" : "Machiavelli",
              "pictureUrl" : "http://lorempixel.com/40/40/people/2/"
            },{
              "firstName" : "Steve",
              "lastName" : "Jobs",
              "pictureUrl" : "http://lorempixel.com/40/40/people/3/"
            },{
              "firstName" : "Warren",
              "lastName" : "Buffet",
              "pictureUrl" : "http://lorempixel.com/40/40/people/6/"
            }
        ];

      $scope.dropDown = dropDown;
      $scope.userModal = userModal;

      function dropDown(){
        console.log("dropdown");
        $(function() {
          console.log("function called");
          $('.dropdown-button').dropdown({
           inDuration: 300,
           outDuration: 225,
           constrain_width: false, // Does not change width of dropdown to that of the activator
           hover: true, // Activate on hover
           gutter: 0, // Spacing from edge
           belowOrigin: false, // Displays dropdown below the button
           alignment: 'left' // Displays dropdown with edge aligned to the left of button
         });
       })
      } //end of dropdown functino

      function userModal() {
        console.log('user modal activated');
        $(function(){
          $('#modalDetails').openModal();
        });
      } //end of usermodal function


  }); //end of controller

})();
