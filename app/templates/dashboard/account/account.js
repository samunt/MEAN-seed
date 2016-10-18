(function() {
    'use strict'
    angular.module("scriveApp")

    .config(function config($stateProvider) {
        $stateProvider
            .state('dashboard.account', {
                url: '/dashboard/account',
                controller: 'AccountCtrl as vm',
                templateUrl: './app/templates/dashboard/account/account.html',
                data: {pageTitle: 'Account'}


            });
    })

    .controller('AccountCtrl', function($state, $scope, $location, $localStorage, ServerRequest) {

        var vm = this;
        $scope.users = [
               {
                  "firstName" : "Alfred",
                  "lastName" : "Hitchcock",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/5/",
                  "emailAddress" : "a.hitchcock@gmail.com",
                  "phoneNumber" : "6474680057"

                },{
                  "firstName" : "Niccolo",
                  "lastName" : "Machiavelli",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/2/"
                },{
                  "firstName" : "Steve",
                  "lastName" : "Jobs",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/3/"
                },{
                  "firstName" : "Warren",
                  "lastName" : "Buffet",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/6/"
                }
            ];

            // materialize jquery
            Materialize.updateTextFields();
            $('select').material_select();
    });

}());
