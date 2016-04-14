angular.module('ccApp', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
      templateUrl : 'home.html'
    })
    .when('/countries', {
      templateUrl : 'countries.html'
    })
    .when('/countries/:country/capital', {
      templateUrl : 'capital.html'
    })
    .otherwise({
      redirectTo : '/'
    });

  }])
.constant('CC_API_PREFIX', 'http://api.geonames.org/countryInfoJSON?')
.constant('CC_API_USERNAME', 'nicolechie')
.factory('ccRequest', ['$http', '$q', 'CC_API_PREFIX', 'CC_API_USERNAME', function($http, $q, CC_API_PREFIX, CC_API_USERNAME){
    return function ccRequest(params) {
      var reqParams = angular.extend({}, params, {username: CC_API_USERNAME});
    return $http.get(CC_API_PREFIX, {cache: true, params: reqParams});
      };
}])

.factory('getCountry', ['ccRequest', '$route', function(ccRequest, $route) {
    return function getCountry(country) {
      var params;
      var countryCode = $route.current.params.country;
      console.log(countryCode);
        params = {
          country: countryCode
        };
      return ccRequest(params);
    };
  }])   

.controller('CountryCtrl', ['ccRequest', '$scope', 'CC_API_PREFIX', function(ccRequest, $scope, CC_API_PREFIX){
ccRequest()
  .then(function(data, status, headers, config) {
        console.log('Success!');
        $scope.countries = data.data.geonames;
  });
}])

.controller('CapitalCtrl', ['getCountry', '$scope', '$http', '$q', '$route', '$timeout', function(getCountry, $scope, $http, $q, $route, $timeout){
var countryCode = $route.current.params.country;
$scope.isSearching = true;
console.log(countryCode);
getCountry(countryCode)
  .then(function(data, status, headers, config) {
        console.log('Success!');
        $scope.country = data.data.geonames[0];
        var countryCapital = data.data.geonames[0].capital;
        return getCapital(countryCapital);
  })
  .then(function(data, status, headers, config) {
        console.log('Success!', data);
        var countryId = data.data.geonames[0].countryId;
        return getNeighbors(countryId);
  })
  .then(function(data) {
    $timeout(function() {
      $scope.isSearching = false;
        }, 0);
        console.log('Success!', data);
  })
  .catch(function(data) {
        console.log('Failed');
  });

$scope.countryCode = countryCode;
  
  function getCapital(countryCapital) {
    return new Promise(function(resolve, reject){
    var params = {
        q: countryCapital,
        country: countryCode,
        name_equals: countryCapital,
        isNameRequired: 'true'
    }

    $http({
        url: 'http://api.geonames.org/searchJSON?username=nicolechie',
        method: 'GET',
        params: params,
        responseType: 'json'
    })
      .then(function(data, status, headers, config) {
        console.log('Success Capital!', data);
        $scope.capital = data.data.geonames[0];
        resolve(data);
      })
      .catch(function(data) {
        reject(data);
      });
    });
  }

  function getNeighbors(countryId) {
    return new Promise(function(resolve, reject){
    var params = {
        geonameId: countryId,
        username: 'nicolechie'
    }

    $http({
        url: 'http://api.geonames.org/neighboursJSON?',
        method: 'GET',
        params: params,
        responseType: 'json'
    })
      .then(function(data, status, headers, config) {
        console.log('Success!', data);
        $scope.neighbors = data.data.geonames;
        $scope.results = data.data.totalResultsCount;
        resolve(data);
      })
      .catch(function(data) {
      reject(data);
      });
    });
  }
}]);


