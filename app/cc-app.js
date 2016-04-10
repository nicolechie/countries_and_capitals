angular.module('ccApp', ['ccAppViews', 'ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    // $locationProvider.hashPrefix('!');
    $routeProvider
    .when('/', {
      templateUrl : 'home.html'
      // controller : ''
    })
    .when('/countries', {
      templateUrl : 'countries.html'
      // controller : 'WaitstaffController'
    })
    .otherwise({
      redirectTo : '/'
    });

  }])

.controller('CountryCtrl', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
$rootScope.getCountries = getCountries;
  
  function getCountries() {

    var params = {
        // method: 'geonames.country',
        // format: 'json',
        // nojsoncallback: 1
    }

    $http({
        url: 'http://api.geonames.org/countryInfoJSON?username=nicolechie',
        method: 'GET',
        params: params
    })
      .then(function(data, status, headers, config) {
        console.log('Success!', data.data.geonames);
        $rootScope.countries = data.data.geonames;
      })
  }

}]);

