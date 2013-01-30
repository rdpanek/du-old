'use strict';

var du = angular.module('du', ['duServices']); 

// Declare app level module which depends on filters, and services
du.config(function($routeProvider) {
    $routeProvider.when('/types', {templateUrl: 'partials/types.html', controller: TypesCtrl});
    $routeProvider.when('/movements', {templateUrl: 'partials/movements.html', controller: MovementsCtrl});
    $routeProvider.otherwise({redirectTo: '/movements'});
  });

    
du.config(function($locationProvider) {
  $locationProvider.html5Mode(true)
});