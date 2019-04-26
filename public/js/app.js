//==========Grab Scraped data and create saved button dynamically===========//
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
//===========Remove From Scraped into Saved Article Changing the DB of value false to true when clicked on saved button==============//
$(document).on("click", ".markedSave", function () {
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


//=========Get All Saved Articles that was saved================//
$(document).on("click", "#saved", function () {
  // alert("clicked saved")
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/savedArticle/" + thisId
  });
  $(this).parents("tr").remove();
  getSaved();
});

//====Will make delete button and comment button calling for each article that was saved=====//
function getSaved() {
  $("#save").empty();
  $.getJSON("/saved", function (data) {
    for (var i = 0; i < data.length; i++) {
      $("#save").prepend(
        "<tr><td>" + data[i].title + "</td><td>" + "<a href='" + data[i].link + "'>Links to Articles</a>" + "</td><td><button type='button' class='btn btn-info comment' data-id='" + data[i]._id + "' id='viewnotes'>Comment</button></td><td><button class='deleteArticle btn btn-danger' data-id='" + data[i]._id + "'>Delete Article</button></td></tr>");

     
    }
  });
  // console.log(data);
}



//===========Delete Articles from DB when clicked on Delete button====================//
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
// $(document).on("click", ".comment", function () {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {

//       // Value taken from note textarea
//       body: $("#inputfield").val()
//     }
//   })
//     // With that done
//     .then(function (data) {
//       // Log the response
//       console.log(data);
//        //$(".modal-title").text("helloooo");
//       // Empty the notes section
//       // $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry

//   $("#inputfield").val("");
//   createComment()
// });

//===============================//
//Creating new COMMENT//

//===================================//

$("#scraper").on("click", function () {

  getUnsaved();
});

function createComment() {
  // $.postJSON("/saved", function (data) {
  //   for (var i = 0; i < data.length; i++) {
  //     $("#save").prepend("<tr><td>" + data[i].title + "</td><td>" + "<a href='" + data[i].link + "'>Links to Articles</a>" + "</td><td><button type='button' class='btn btn-info comment' data-toggle='modal' data-target='#myModal' data-id='" + data[i]._id + "'>Comment</button></td><td><button class='deleteArticle btn btn-danger' data-id='" + data[i]._id + "'>Delete Article</button></td></tr>");

      

  //   }

    $.postJSON("/saved", function (data) {
      for (var i = 0; i < data.length; i++) {
        $("#save").prepend("<tr><td>" + data[i].title + "</td><td>" + "<a href='" + data[i].link + "'>Links to Articles</a>" + "</td><td><button type='button' class='btn btn-info comment'  data-id='" + data[i]._id + "' id='viewnotes'>Comment</button></td><td><button class='deleteArticle btn btn-danger' data-id='" + data[i]._id + "'>Delete Article</button></td></tr>");
  
        
  
      }
    // $("#unsave").prepend
    // ("<tr><th>Title</th><th>Link</th><th>Saved Article</th></tr>");
  });
}




///////

//$("#mymodal").modal("show")

// $(document).on("click", "#openmodal", function () {
//   console.log(".......openmmodal")
//   var id = $(this).attr("data-id");
//   console.log("id: ", id)

//       $("#modal-title").text("hello")
//       $("#mymodal").modal("show")

//     });


    //


    $(document).on("click", "#viewnotes", function () {
      console.log(".......viewnotes")
      var id = $(this).attr("data-id");
      console.log(("id:", id))
      // $.ajax({
      //   method: "GET",
      //   url: "/articlenote/" + id,
      // })
      //   .then(function (data) {
      //     console.log(data);
      //     $("#modalnote").find("#thenotes").empty();
    
         // console.log(data.notes)
         // for (let i = 0; i < data.notes.length; i++) {
            let title = id
           // let comment = data.notes[i].comment
           // let idNote = data.notes[i]._id
            console.log(title)
            let idNote = 2
          let comment = "hi this is a test"
            let tempNote = `<dic class="list-group-item list-group-item-action  mb-1">
            <div class="justify-content-between">
              <h5 class="mb-1">${title}</h5>
              <div class="row">
              <div class="col-11">
              <small>${comment}</small>
              </div>
              <div class="col-1">
              <button class="btn-sm btn-danger deletenote" data-toggle="modal" data-target="#modalnote" data-idNote="${idNote}" data-idArticle="${id}">X</button>
              </div>
            </div></div>`
    
            console.log(tempNote)
    
            $("#modalnote").find("#thenotes").append(tempNote);
          //}
    
    
          let tempButton = (`<button class="btn-sm btn-success" id="savenote" data-toggle="modal" data-target="#modalnote" data-id="${id}">Add to Saved!</button>`)
          $("#modalnote").find("#buttonsaved").empty();
          $("#modalnote").find("#buttonsaved").append(tempButton);
    
          $("#modalnote").modal("show")
    
        });
    // })