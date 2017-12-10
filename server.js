// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Scraping modules
var request = require('request');
var cheerio = require('cheerio');
// setting up models
var db = require('./models');
// establishing a port
var PORT = ('3000');

// initialize express
var app = express();
// setting up bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// using the public folder for static directory
app.use(express.static('public'));

// Hook our mongoose config to the db var
mongoose.connect("mongodb://localhost/cnnScraper_db", {
  useMongoClient: true
});

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Connect to the Mongo DB

// Main Route
app.get('/', function(req, res) {
	res.send("I've got news for you...");
});

// Set a GET Route for scraping cnn's website
app.get('/scrape', function (req, res) {
	request('http://www.cnn.com/specials/last-50-stories', function(error, response, html) {
		var $ = cheerio.load(html);
		var results = [];

		$('h3.cd__headline').each(function(i, element) {
			
			// grabs the elements from the website
			var title = $(element).text();
			var link = $(element).children('a').attr('href');
			

			if (title && link) {
				db.Article.create({
					title: title,
					link: link
				},
				function(err, inserted) {
					if (err) {
						console.log(err);
					} else {
						console.log(inserted);
					}
				});
			}
			results.push({
				title: title,
				link: link
			});

		})
		console.log(results);
	});
	res.send('Scrape Successful')
});





// Listening on PORT 8080
app.listen(3000, function() {
	console.log("listening on PORT 3000");
});