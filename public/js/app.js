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
  $.getJSON("/scrape", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#unsave").prepend("<tr><td>" + data[i].title + "</td><td>" + "<a href='" + data[i].link + "'>Links to Articles</a>" +
        "</td><td class='savedArticle'><button class='markedSave btn btn-success' data-id='" + data[i]._id + "'>Mark Save</button></td></tr>");
    }
    $("#unsave").prepend("<tr><th>Title</th><th>Link</th><th>Saved Article</th></tr>");
  });
}
//=========================//
$(document).on("click", ".markedSave", function () {
  // alert("clicked saved")
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/savedArticle/" + thisId
  });
  $(this).parents("tr").remove();
  // getSaved();
});
//===============================//
//=========================//
$(document).on("click", "#saver", function () {
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
$(document).on("click", ".deleteArticle", function () {
  // alert("clicked saved")
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "DELETE",
    url: "/deleteArticle/" + thisId
  });
  $(this).parents("tr").remove();

});

//===============================//
//RETIREVING PAST COMMENT//
$(document).on("click", ".comment", function () {
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      // Value taken from note textarea
      body: $("#exampleFormControlTextarea1").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry

  $("#exampleFormControlTextarea1").val("");

});

//===============================//
//Creating new COMMENT//

// $(document).on("click", "#closeBtn", function () {
//   var thisId = $(this).val().trim();
//   console.log(thisId)
//   $.ajax({
//     type: "POST",
//     url: "/comment/" +
//       selected.attr("data-id"),
//     dataType: "json",
//     data: {
//       note: $("#exampleFormControlTextarea1").val()
//     },
//     // On successful call
//     success: function (data) {
//       $("#exampleFormControlTextarea1").val("");
//       $.ajax({
//         type: "GET",
//         url: "/find/" + selected.attr("data-id"),
//         // On a successful call, clear the #results section
//         success: function(data) {
//     var notesmsgnew = $("<div>");
//     notesmsgnew.attr("class", "notesmsgnew")
//     notesaveddiv.prepend(notesmsgnew);
//     notesmsgnew.text(data.note);
//     });
//   createComment();
// })
//===================================//
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

function createComment() {
  $.postJSON("/saved", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#save").prepend("<tr><td>" + data[i].title + "</td><td>" + "<a href='" + data[i].link + "'>Links to Articles</a>" + "</td><td><button type='button' class='btn btn-info comment' data-toggle='modal' data-target='#myModal' data-id='" + data[i]._id + "'>Comment</button></td><td><button class='deleteArticle btn btn-danger' data-id='" + data[i]._id + "'>Delete Article</button></td></tr>");

      $(".modal-title").text(data[i].title);

    }
    // $("#unsave").prepend
    // ("<tr><th>Title</th><th>Link</th><th>Saved Article</th></tr>");
  });
}

function getSaved() {
  $("#save").empty();
  $.getJSON("/saved", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#save").prepend("<tr><td>" + data[i].title + "</td><td>" + "<a href='" + data[i].link + "'>Links to Articles</a>" + "</td><td><button type='button' class='btn btn-info comment' data-toggle='modal' data-target='#myModal' data-id='" + data[i]._id + "'>Comment</button></td><td><button class='deleteArticle btn btn-danger' data-id='" + data[i]._id + "'>Delete Article</button></td></tr>");

      $(".modal-title").text(data[i].title);

    }
    // $("#unsave").prepend
    // ("<tr><th>Title</th><th>Link</th><th>Saved Article</th></tr>");
  });
  // console.log(data);
}
