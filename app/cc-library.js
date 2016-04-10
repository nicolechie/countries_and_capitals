angular.module('ccLibrary', [])

  .constant('CC_API_PREFIX', 'http://api.geonames.org/countryInfoJSON?username=nicolechie')
  .constant('CC_COUNTRIES_JSON_FILE', './cc-cities.json')
  .factory('ccRequest', ['$http', '$q', 'CC_API_PREFIX', function($http, $q, CC_API_PREFIX){
    return function(){
      return $http.get(CC_API_PREFIX)
        .then(function(response){
          console.log('success', data)
          return $q.when(response.data);
        });
    };
  }]) 
  .factory('ccCountries', ['$http', '$q', 'CC_COUNTRIES_JSON_FILE', function($http, $q, CC_COUNTRIES_JSON_FILE) {
    return function() {
      return $http.get(CC_COUNTRIES_JSON_FILE, {cache: true})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }])
  .factory('ccFindCountry', ['ccRequest', function(ccRequest) {
    return function(q) {
      var params;

        params = {
          q : q
        };
      };
      return ccRequest(params);
  }]);
