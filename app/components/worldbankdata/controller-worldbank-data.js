'use strict';

worldbank.controller('WorldbankdataCtrl', 
	['$scope', 'ApiService', function($scope, ApiService){

		$scope.salesData = [];
		$scope.loadingIsDone = false;
		var a= 5;
		//console.log(c);
		//console.log(b);
		$scope.init = function(){		
			var b=6;
			console.log(c);	
			if(b==6){
				var c= 7;
				console.log(b);
				console.log(c);
			}

			$scope.getStockDataofCompanies();

			$scope.getHistoricStockDataAAPL();
			
		}

		//to display stock prices of my selected companies
		//TODO : make user choice avaible
		$scope.getStockDataofCompanies = function(){

			// request call to the api service for the  stocks of companies
			var getpresentStockPriceOfCompanies = ApiService.getStockDataofBigCompanies();

			getpresentStockPriceOfCompanies.then(function(res){
				//success
				$scope.stocksInfo = res.data;
			}, function(err){
				//error
				console.log(err);
			});
		}

		$scope.getHistoricStockDataAAPL = function(){

			var getStockData = ApiService.getHistoricStockData();

			getStockData.then(function(res){
				//success
				//$scope.stockData = res;
				$scope.salesData = res.query.results.quote;
				$scope.loadingIsDone = true;
			}, function(err){
				//error
				console.log(err);
			});

		}

		$scope.init();
	}
])