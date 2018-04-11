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
      .when('/',{
        redirectTo: '/game'
      });
  });