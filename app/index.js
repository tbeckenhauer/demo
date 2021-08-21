'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * Main module of the application.
 */
angular
  .module('demoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    'ngMaterial',
    'ngMessages',

    'ui.grid',
    'ui.grid.expandable',
    'ui.grid.selection',
    'ui.grid.pinning'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/alerts', {
        templateUrl: 'pages/alerts.html',
        controller: 'AlertsCtrl',
        controllerAs: 'alerts'
      })
      .when('/game', {
        template: '<tmb-playmat></tmb-playmat>',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .when('/statemachine', {
        templateUrl: 'pages/car.html',
        controller: 'carController',
        controllerAs: 'car'
      })
      .when('/blog',{
        redirectTo: function() {
          window.location = 'https://soft-wa.re/'
        }
      })
      .when('/',{
        redirectTo: '/game'
      });
  });
