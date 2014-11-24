'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myControllers',
  'myServices',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
      when('/main-console', {
          templateUrl: 'views/airTrafficControlSystem.html',
          controller: 'controllerMainConsole'
      }).
      otherwise({redirectTo: '/main-console'});
}]);
