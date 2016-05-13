'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
'ui.bootstrap', 'ngResource',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'angularUtils.directives.dirPagination',
  'angular-loading-bar'
],function($interpolateProvider){
  //$interpolateProvider.startSymbol('[[');
  //$interpolateProvider.endSymbol(']]');
});
angular.module('myApp', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
    cfpLoadingBarProvider.latencyThreshold = 100;
  }]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/test',{
        templateUrl:'partials/test.html',
        controller:'testCtrl'
      }).
      when('/test/:phoneId',{
        templateUrl:'partials/test-detail.html',
        controller:'testDetailCtrl'
      }).
      when('/meter',{
        templateUrl:'partials/meter-data.html',
        controller:'meterCtrl'
      }).
      when('/exam',{
        templateUrl:'partials/exam-data.html',
        controller:'examCtrl'
      }).
      when('/exercise',{
        templateUrl:'partials/exercise-data.html',
        controller:'exerciseCtrl'
      }).
      when('/patient',{
        templateUrl:'partials/patient-data.html',
        controller:'patientCtrl'
      }).
      when('/logs/:logs/:meterid',{
        templateUrl:'partials/patient-details.html',
        controller:'patientLogCtrl'
      }).
      when('/ ',{
        templateUrl:'partials/ngfn.html',
        controller:'ngfnCtrl'
      }).
      otherwise({
        redirectTo: '/test'
      });
  }]);
