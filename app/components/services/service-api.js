'use strict';

worldbank.service('ApiService', 
  [       '$http', '$q', function($http, $q){    

    var task = this;

    task.getStockDataofBigCompanies = function(){
        var defer = $q.defer();      
         
          return $http.jsonp("http://finance.google.com/finance/info?client=ig&q=NASDAQ:GOOG,NASDAQ:YHOO,NASDAQ:MSFT,NASDAQ:AAPL,NASDAQ:FB,NASDAQ:EBAY,NASDAQ:TWTR&callback=JSON_CALLBACK")

    }

    task.getHistoricStockData = function(){
        var defer = $q.defer();
        var url = 'http://query.yahooapis.com/v1/public/yql';
        var startDate = '2014-01-01';
        var endDate = '2014-05-01';
        var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("AAPL") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
        // $.getJSON(url, 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", callback);
        //url+'&q ='+data+'&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json&callback=JSON_CALLBACK'

        $http.jsonp(url+'?q='+ data + '&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json&callback=JSON_CALLBACK')
        .success(function(response){

            defer.resolve(response);           

        }, function(error){
            defer.reject(error);   
        });

        return defer.promise;
    }

    task.getMoviesData = function(title, year, plot, tomatoRatings, type){
    	var defer = $q.defer();
    	var url = 'http://www.omdbapi.com/?t='+ title + '&y='+ year + '&plot=' + plot + '&tomatoes=' + tomatoRatings + '&type=' + type + '&r=json&callback=JSON_CALLBACK'
		
        //jsonp request to omdb api for movies/tv series/episodes
        $http.jsonp(url)
		.success(function(response){

        	defer.resolve(response);           

		}, function(error){
        	defer.reject(error);   
		});

		return defer.promise;
    }

    return task;

}
]);