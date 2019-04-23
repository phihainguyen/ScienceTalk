var express = require("express");
var exhbs = require("express-handlebars");
var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs");

var app = express();
var PORT = process.env.PORT || 3000;

var databaseUrl = "scienceDB";
var collections = ["scrapedArticle"];


var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
	console.log("Database Error:", error);
});

// app.use(express.static("public"));
// require("./routes/apiRoutes.js")

app.get("/all", function (req, res) {
	db.scrapedArticle.find({}, function (error, found) {
		// Throw any errors to the console
		if (error) {
			console.log(error);
		}
		// If there are no errors, send the data to the browser as json
		else {
			res.json(found);
		}
	});
});
app.get("/scrape", function (req, res) {
	axios.get("https://www.sciencemag.org/").then(function (response) {
		var $ = cheerio.load(response.data);

		// var results = [];

		$("h2.hero__headline").each(function (i, element) {

			var title = $(element).text();

			var link = $(element).children().attr("href");

			if (title && link) {
				// Insert the data in the scrapedArticle db
				db.scrapedArticle.insert({
					title: title,
					link: link
				},
					function (err, inserted) {
						if (err) {
							// Log the error if one is encountered during the query
							console.log(err);
						}
						else {
							// Otherwise, log the inserted data
							console.log(inserted);
						}
					});
			}
		});

	});
	res.send("Scrape Complete");
});



app.get("/", function (req, res) {
	res.send("hello mother fucker");
});
app.listen(PORT, function () {
	console.log("listening on port 3000, http://localhost:" + PORT)
});