// function getUnsaved() {
//     $("#unsave").empty();
//     $.getJSON("/scrape", function (data) {
//         for (var i = 0; i < data.length; i++) {
//             $("#unsave").prepend("<p class='savedArticle'>" + data[i].title + "</p><p class='savedArticle'>" + data[i].link +
//                 "</p><p class='savedArticle'><button class='markedSave' data-id='" + data[i]._id + "'>Mark Save</button></p>");
//         }
//         $("#save").prepend("<tr><th>Title</th><th>Author</th><th>Newly Scraped Article</th></tr>");
//     });
// }

//=====================//
function getUnsaved() {
    $("#unsave").empty();
    $.getJSON("/scrape", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#unsave").prepend("<tr><td>" + data[i].title + "</td><td>" + "<a href='" +data[i].link +"'>Links to Articles</a>"+
          "</td><td class='savedArticle'><button class='markedSave' data-id='" + data[i]._id + "'>Mark Save</button></td></tr>");
      }
      $("#save").prepend("<tr><th>Title</th><th>Link</th><th>Saved Article</th></tr>");
    });
  }
  //=========================//
$(document).on("click", ".markedSave", function() {
    // alert("clicked saved")
    var thisId = $(this).attr("data-id");
    $.ajax({
      type: "PUT",
      url: "/savedArticle/" + thisId
    });
    $(this).parents("tr").remove();
    getSaved();
  });
//===============================//

// function displayResults(articles) {
//     // First, empty the table
//     $(".tbody").empty();

//     // Then, for each entry of that json...
//     articles.forEach(function (article) {
//         // Append each of the animal's properties to the table
//         var tr = $("<div>").append(
//             $("<p>").text(article.title),
//             $("<p>").text(article.link),

//         );

//         $(".tbody").append(tr);
//     });
// }
$("#scraper").on("click", function () {

    // // Do an api call to the back end for json with all animals sorted by weight
    // $.getJSON("/scrape", function (data) {
    //     // Call our function to generate a table body
    //     displayResults(data);
    // });
    getUnsaved();
});


function getSaved() {
    $("#save").empty();
    $.getJSON("/saved", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#save").prepend("<tr><td>" + data[i].title + "</td><td>" +"<a href='" +data[i].link +"'>Links to Articles</a>"+
          "</td><td><button class='deleteArticle' data-id='" + data[i]._id + "'>Delete Article</button></td></tr>");
      }
      // $("#unsave").prepend
      // ("<tr><th>Title</th><th>Link</th><th>Saved Article</th></tr>");
    });
    // console.log(data);
  }
 