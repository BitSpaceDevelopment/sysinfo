$(document).ready(function() {

	// Example URL
	// http://api.winnipegtransit.com/trip-planner.json?origin=addresses/136589&destination=monuments/3911&date=2013-11-12&time=17:00&mode=arrive-before&api-key=BEeQlLtJ10kIrLkKyAXa
    
	api = "api-key=BEeQlLtJ10kIrLkKyAXa";                     // Winnipeg Transit API KEY for Daniel Blair
	root = "http://api.winnipegtransit.com/trip-planner.json" // Root of the website

	$("#wptForm").submit(function(event) {
		var start       = "136590";
		var destination = "123172";

		// http://api.winnipegtransit.com/trip-planner.json?origin=addresses/136590&destination=addresses/136591&&api-key=BEeQlLtJ10kIrLkKyAXa

		// Create the url
		json_url = root + "origin=address/" + start + "destination=address/" + destination + "&&" + api;

		// Get the JSON
		$.ajax({
		  dataType: "json",
		  url: json_url,
		  data: data,
		  success: success
		});

		$.getJSON( "ajax/test.json", function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
		    items.push( "<li id='" + key + "'>" + val + "</li>" );
		  });
		 
		  $( "<ul/>", {
		    "class": "my-new-list",
		    html: items.join( "" )
		  }).appendTo( "output" );
		});

		event.preventDefault();
	});

});