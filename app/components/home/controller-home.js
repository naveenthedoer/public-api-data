'use strict';

worldbank.controller('HomeCtrl', 
	['$scope', 'ApiService', function($scope, ApiService){

	var searchStatus = false;
	$scope.titleEmpty = false;
	$scope.movieData = {};
	
	// get movie/series/episode data according to the params provided
	// TODO : add params to the url based on the params provided so that on reload load with the params free filled

	$scope.search = function(){

		
		if(searchStatus == true){			
			return;
		}

		searchStatus = true;

		//show warning if title is empty

		if(typeof $scope.title == "undefined" || $scope.title == ""){
			$scope.title = "";
			$scope.titleEmpty = true;
			searchStatus = false;
			return;
		}

		$scope.titleEmpty = false;

		if(typeof $scope.year == "undefined"){
			$scope.year = "";
		}

		if(typeof $scope.plot == "undefined"){
			$scope.plot = "";
		}

		if(typeof $scope.tomatoRatings == "undefined"){
			$scope.tomatoRatings = "";
		}

		if(typeof $scope.type == "undefined"){
			$scope.type = "";
		}

		// request call to the api service for the movie data
		var getMovieDatabase = ApiService.getMoviesData($scope.title, $scope.year, $scope.plot, $scope.tomatoRatings, $scope.type);
		getMovieDatabase.then(function(res){
			//success

			if(res.Response == "True"){
				$scope.movieData = res;
			}else if(res.Response == "False"){
				$scope.movieData = {};
			}

			searchStatus = false;
			
		}, function(err){

			//error
			console.log(err);
			if(err.Response == "False"){
				$scope.movieData = {};
			}
			searchStatus = false;
		});
	}
	
}])

