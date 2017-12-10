// Grab the articles as a json
$.getJSON("/", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
  	console.log(data.length);
    // Display the data from mongo on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

  }
});