'use strict';

var worldbank = angular
	.module('worldbankApp', [
		'ui.router',
		])

	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
		function($stateProvider, $urlRouterProvider, $httpProvider){
			$httpProvider.defaults.withCredentials = true;
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

			$urlRouterProvider.otherwise("/stocks");

			$stateProvider
				.state('moviedb', {
					url: '/moviedb',
					templateUrl: '/components/home/home.html',
					controller: 'HomeCtrl'
				})
				.state('stocks', {
					url: '/stocks',
					templateUrl: '/components/worldbankdata/worldbankdata.html',
					controller: 'WorldbankdataCtrl'
				})
	}])
	
