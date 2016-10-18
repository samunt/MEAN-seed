
(function () {
    "use strict";
    angular.module('scriveApp')

        .factory('ServerRequest', ServerRequest);

    function ServerRequest($http, $q, $localStorage) {

        var API_URL = '/';

        var headers = {
            'x-access-token': $localStorage.token || '',
        };
        return {
            login: login,
            createAccount: createAccount,
            createProfile: createProfile,
            geolocate: geolocate,
            forgotPassword: forgotPassword,


        };
///////////////////////////////////////////////////////////////////////



        function login(dataObj) {
            return httpPOST("login", dataObj)
        }

        function createAccount(dataObj) {
          console.log('createAccount function')
            return httpPOST("register", dataObj)
        }

        function createProfile(dataObj) {
          console.log('complete signup function')
            return httpPOST("createProfile", dataObj)
        }

        function forgotPassword(dataObj) {
            return httpPOST("forgotPassword", dataObj)
        }



        function geolocate() {
           if (navigator.geolocation) {
               var deferred = $q.defer();
               navigator.geolocation.getCurrentPosition(function (position) {
                       var geolocation = {
                           lat: position.coords.latitude,
                           lng: position.coords.longitude
                       };
                       deferred.resolve(geolocation);
                   },
                   function (err) {
                       deferred.reject(err);
                   });

               return deferred.promise;
           }
       }

        function revGeocode(lat, lng) {
            var deferred = $q.defer();
            $http({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng,
                method: 'GET'
            })
                .then(function (successPayload) {
                    deferred.resolve(successPayload.data.results);
                },
                function (errorPayload) {
                    deferred.reject(errorPayload);
                });
            return deferred.promise;
        }


        function httpPOST(url, dataObj) {
            if (!dataObj) {
                dataObj = {}
            }
            //if ($localStorage.token){ dataObj['token'] = $localStorage.token }

            return $q(function (resolve, reject) {
              console.log('q function in httppost')
                $http({
                    url: encodeURI(API_URL + url),
                    method: 'POST',
                    headers: headers,
                    data: dataObj
                })
                    .then(function (response) {
                        resolve(response.data);
                        console.log('$q success function');
                    },
                    function (response) {
                        reject(response.data);
                        console.log('$q fail function');
                    });
            })
        }


    }
}());
