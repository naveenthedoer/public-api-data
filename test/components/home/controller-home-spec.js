"use strict";

describe("controller: HomeCtrl", function(){

	var MainCtrl;
	var scope;
	var ApiService;
	var q;
	var deferred;
	var returnData = {testing : "anything"};
	
	beforeEach(function(){
		module("worldbankApp");
		
	});

	beforeEach(inject(function($controller, $rootScope, $q){
		ApiService = {
			getMoviesData: function () {
		        deferred = q.defer();
	            return deferred.promise;
		      }
		}

		spyOn(ApiService, 'getMoviesData').and.callThrough();
		q= $q;
		scope = $rootScope.$new();
		MainCtrl = $controller('HomeCtrl', {
			$scope: scope,
			ApiService : ApiService
		})

	}));

	describe("succesfully got data for movie", function(){
		it("should request the current status when search is called", function(){			
			
			scope.search();

			expect(ApiService.getMoviesData).toHaveBeenCalled();
		});

		it('should save the retrived status in current status on the search function', function(){

			scope.search();

			expect(scope.movieData).not.toBe(undefined);

		});

	});

});

