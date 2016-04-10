viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/countries", {
    templateUrl : "countries.html",
    controller : 'CountryCtrl',
    resolve : {
      countryDetails : ['ccFindCountry', '$route', function(ccFindCountry, $route) {
        return ccFindCountry(data.data.geonames);
      }]}
    });
}]);
viewsModule.controller('CountryCtrl', ['$scope', 'countryDetails', function($scope, countryDetails) {

  $scope.country = countryDetails.countryName;
}]);
// viewsModule.controller('CountryCtrl', ['$scope', '$http', '$q', function($scope, $http, $q){

// $scope.getCountries = getCountries;
//   // $scope.countries = 
  
//   function getCountries() {

//     var params = {
//         // method: 'geonames.country',
//         format: 'json',
//         nojsoncallback: 1
//     }

//     $http({
//         url: 'http://api.geonames.org/countryInfo?username=nicolechie',
//         method: 'GET',
//         params: params,
//     })
//       .then(function(data, status, headers, config) {
//         console.log('Success!', data);
//       })
//   }

// }]);
