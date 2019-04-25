var express = require("express");
var exhbs = require("express-handlebars");
var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs");

var app = express();

//initializing the routes in the routes folder
app.use('/api', require('./routes/apiRoutes'));
app.use(express.static("public"));

var PORT = process.env.PORT || 4000;

var databaseUrl = "scienceDB";
var collections = ["scrapedArticle"];


var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
	console.log("Database Error:", error);
});

// app.use(express.static("public"));
// require("./routes/apiRoutes.js")

// app.get("/all", function (req, res) {
// 	db.scrapedArticle.find({}, function (error, found) {
// 		// Throw any errors to the console
// 		if (error) {
// 			console.log(error);
// 		}
// 		// If there are no errors, send the data to the browser as json
// 		else {
// 			res.json(found);
// 		}
// 	});
// });
app.get("/saved", function (req, res) {
	// Go into the mongo collection, and find all docs where "read" is true
	db.scrapedArticle.find({ saved: true }, function (error, found) {
		// Show any errors
		if (error) {
			console.log(error);
		}
		else {
			// Otherwise, send the books we found to the browser as a json
			console.log(found)
			res.json(found);

		}
	});
});

app.get("/scrape", function (req, res) {

	// db.scrapedArticle.remove({}, function(error, response) {
	// 	// Log any errors to the console
	// 	if (error) {
	// 	  console.log(error);
	// 	  res.send(error);
	// 	}
	// 	else {
	// 	  // Otherwise, send the mongojs response to the browser
	// 	  // This will fire off the success function of the ajax request
	// 	  console.log(response);
	// 	//   res.send(response);
	// 	}
	//   });


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
					link: link,
					saved: false
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

//==================================//
//DELETING THE ARTICLES
//==================================//

app.delete("/deleteArticle/:id", function (req, res) {
	db.scrapedArticle.remove(
		{
			_id: mongojs.ObjectId(req.params.id)

		},
		function (error, edited) {
			// show any errors
			if (error) {
				console.log(error);
				res.send(error);
			}
			else {
				// Otherwise, send the result of our update to the browser
				console.log(edited);
				res.send(edited);
			}
		}
	);
});

app.put("/savedArticle/:id", function (req, res) {
	// Remember: when searching by an id, the id needs to be passed in
	// as (mongojs.ObjectId(IdYouWantToFind))

	// Update a doc in the books collection with an ObjectId matching
	// the id parameter in the url
	db.scrapedArticle.update(
		{
			_id: mongojs.ObjectId(req.params.id)
		},
		{
			// Set "read" to true for the book we specified
			$set: {
				saved: true
			}
		},
		// When that's done, run this function
		function (error, edited) {
			// show any errors
			if (error) {
				console.log(error);
				res.send(error);
			}
			else {
				// Otherwise, send the result of our update to the browser
				console.log(edited);
				res.send(edited);
			}
		}
	);
});


app.get("/", function (req, res) {
	res.render("public/index.html");
});



app.listen(PORT, function () {
	console.log("listening on port 4000, http://localhost:" + PORT)
});