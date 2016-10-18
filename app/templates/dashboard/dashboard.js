(function() {
    'use strict'
    angular.module("scriveApp")

    .config(function config($stateProvider) {
        $stateProvider
            .state('dashboard', {
                controller: 'DashboardCtrl as vm',
                templateUrl: './app/templates/dashboard/dashboard.html',
                data: {pageTitle: 'Dash'},
                resolve: {
                    position: function(ServerRequest) {
                        return ServerRequest.geolocate()
                            .then(function(resp) {
                                return resp;
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                    }

                }
            });
    })

    .controller('DashboardCtrl', function($state, $scope, $location, $localStorage, ServerRequest, position) {

        var vm = this;
        $('.button-collapse').sideNav();

        vm.close = close;
        function close(){
            $(function(){
                $('.button-collapse').sideNav('hide');
            })
        }


        function logout() {
            delete $localStorage.user;
             $state.go('login');
        }



        function getCourthouses(location) {
            c.log(location);
            ServerRequest.getCourthouses(location)
                .then(function(resp) {
                    c.log('resp', resp);
                    $scope.courthouses = resp.courthouses;
                    $scope.categories = vm.getCategories(resp.courthouses);
                })
                .catch(function(err) {
                    c.log(err);
                });
        }

        function getCategories(courthouses) {
            var returnCategories = [];
            angular.forEach(courthouses, function(value, key) {
                if (returnCategories.indexOf(value.category) < 0) {
                  returnCategories.push(value.category);
                }
            });
            c.log(returnCategories);
            return returnCategories;
        }

        function updateLocation(user, location) {
            var params = { emailAddress : user.emailAddress, lat : location.lat, lon : location.lon, userId : user._id, deviceToken : "" };

            ServerRequest.updateLocation(params)
                .then(function(resp) {
                    c.log('resp', resp);
                })
                .catch(function(err) {
                    c.log(err);
                });
        }




    });

}());
