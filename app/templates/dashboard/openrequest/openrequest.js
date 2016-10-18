(function() {
    'use strict'
    angular.module("scriveApp")

    .config(function config($stateProvider) {
        $stateProvider
            .state('dashboard.openrequest', {
                url: '/dashboard/openrequest',
                controller: 'OpenRequestCtrl as vm',
                templateUrl: './app/templates/dashboard/openrequest/openrequest.html',
                data: {pageTitle: 'All Open Requests'}


            });
    })

    .controller('OpenRequestCtrl', function($state, $scope, $location, $localStorage, ServerRequest) {

        var vm = this;
        $scope.users = [
               {
                  "firstName" : "Alfred",
                  "lastName" : "Hitchcock",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/3/",
                  "emailAddress" : "a.hitchcock@gmail.com",
                  "phoneNumber" : "6478970053"

                },{
                  "firstName" : "John",
                  "lastName" : "Snow",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/2/",
                  "emailAddress" : "snowy@gmail.com",
                  "phoneNumber" : "6474645357"
                },{
                  "firstName" : "Margret",
                  "lastName" : "Thatcher",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/6/",
                  "emailAddress" : "mthatcher@gmail.com",
                  "phoneNumber" : "6409760045"
                },{
                  "firstName" : "Kim",
                  "lastName" : "Jong Un",
                  "pictureUrl" : "http://lorempixel.com/100/100/people/5/",
                  "emailAddress" : "dprk@gmail.com",
                  "phoneNumber" : "4160680007"
                }
            ];


    });

}());
