'use strict';

var du = angular.module('du', ['duServices']); 

// Declare app level module which depends on filters, and services
du.config(function($routeProvider) {
    $routeProvider.when('/types', {templateUrl: 'partials/types.html', controller: TypesCtrl});
    $routeProvider.when('/movements', {templateUrl: 'partials/movements.html', controller: MovementsCtrl});
    $routeProvider.when('/new-movement', {templateUrl: 'partials/new-movement.html', controller: NewMovementCtrl});
    $routeProvider.when('/new-type', {templateUrl: 'partials/new-type.html', controller: NewTypeCtrl});
    $routeProvider.when('/edit-type/:id', {templateUrl: '/partials/edit-type.html', controller: EditTypeCtrl});
    $routeProvider.when('/view-movement/:id', {templateUrl: '/partials/view-movement.html', controller: EditMovementCtrl});
    $routeProvider.when('/edit-movement/:id', {templateUrl: '/partials/edit-movement.html', controller: EditMovementCtrl});
    $routeProvider.otherwise({redirectTo: '/movements'});
  });

    
du.config(function($locationProvider) {
  $locationProvider.html5Mode(true)
});