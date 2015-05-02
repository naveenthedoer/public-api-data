'use strict';

worldbank.directive("stockChart", function($window) {
  return{
    restrict: "EA",
    template: "<svg width='1000' height='500'></svg>",
    link: function(scope, elem, attrs){

    	var stocksDataToPlot=scope[attrs.chartData];
    	var d3 = $window.d3;
		var rawSvg = elem.find("svg")[0];
		var svg = d3.select(rawSvg);
	    var margin = {top: 30, right: 40, bottom: 30, left: 50},
   		 width = 1000 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

    	var parseDate = d3.time.format("%Y-%m-%d").parse;

	 	var x = d3.time.scale().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		var xAxis = d3.svg.axis().scale(x)
    		.orient("bottom").ticks(5);

    	var    yAxis = d3.svg.axis().scale(y)
    		.orient("left").ticks(5);

    	var valueline = d3.svg.line()
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.high); });

		stocksDataToPlot.forEach(function(d) {
	        d.date = parseDate(d.Date);
	        d.high = d.High;
	        d.low = d.Low;
	    });

		// Scale the range of the data
	    x.domain(d3.extent(stocksDataToPlot, function(d) {
	        return d.date; }));
	    y.domain([
	        d3.min(stocksDataToPlot, function(d) { return d.low; }), 
	        d3.max(stocksDataToPlot, function(d) { return d.high; })
	    ]);

	    svg.append("path")        // Add the valueline path.
	        .attr("class", "line")
	        .attr("d", valueline(stocksDataToPlot));

        svg.append("g")            // Add the X Axis
	        .attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")")
	        .call(xAxis);

	    svg.append("g")            // Add the Y Axis
        	.attr("class", "y axis")
        	.call(yAxis);

	    svg.append("text")          // Add the label
	        .attr("class", "label")
	        .attr("transform", "translate(" + (width+3) + "," 
	            + y(stocksDataToPlot[0].high) + ")")
	        .attr("dy", ".35em")
	        .attr("text-anchor", "start")
	        .style("fill", "steelblue")
	        .text("high");

	    svg.append("text")          // Add the title shadow
	        .attr("x", (width / 2))
	        .attr("y", margin.top / 2)
	        .attr("text-anchor", "middle")
	        .attr("class", "shadow")
	        .style("font-size", "16px")
	        .text("AAPL");
	        
	    svg.append("text")          // Add the title
	        .attr("class", "stock")
	        .attr("x", (width / 2))
	        .attr("y", margin.top / 2)
	        .attr("text-anchor", "middle")
	        .style("font-size", "16px")
	        .text("AAPL-2014");



    }
  };
});