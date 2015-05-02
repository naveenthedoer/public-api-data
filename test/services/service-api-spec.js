"use strict";

describe("api service", function () {
  var apiService, httpBackend;

  beforeEach(module("worldbankApp"));

  beforeEach(inject(function (_ApiService_, _$httpBackend_) {

    apiService = _ApiService_;
    httpBackend = _$httpBackend_;
  }));

      afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
      });

  it("should do something", function () {    

    var returnData = { testing: 'anything'};

    httpBackend.expectJSONP('http://www.omdbapi.com/?t=interstellar&y=2014&plot=short&tomatoes=true&type=movie&r=json&callback=JSON_CALLBACK').respond(returnData); 

    apiService.getMoviesData('interstellar', '2014', 'short', 'true', 'movie').then(function(user) {
      expect(user.testing).toEqual('anything');
    });

     httpBackend.flush();

  });

});