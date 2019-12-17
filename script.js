var OMDBresponse;
var omTitle;
var omPosterUrl;
var omType;
var omYear;
var displayLength= 3;
var modalMovie;
var movieList = {
  title: "",
  year:"",
  type:"",
  poster: "",
  imdbId: "",
 };


 $("#findbtn").on("click", function(){
  clearResults();
  console.log($("#autocomplete-input").val());
  let userSearch=$("#autocomplete-input").val().trim();
  getOMDB(userSearch);
})



function getOMDB(someMovie){
    someMovie=someMovie.replace(" ","+");
    $.ajax({
    //  url: "https://www.omdbapi.com/?t=the+dark+night&y=&plot=short&apikey=trilogy",
     url: "https://www.omdbapi.com/?s="+someMovie+"&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    getOMDBValues(response);
    // return response;
  });
  
}

function getOMDB2(someMovie){
  console.log("getOMDB2 title="+ someMovie);
  someMovie=someMovie.replace(" ","+");
  $.ajax({
  //  url: "https://www.omdbapi.com/?t=the+dark+night&y=&plot=short&apikey=trilogy",
  url: "https://www.omdbapi.com/?t="+someMovie + "&plot=full&apikey=trilogy",
  // url: "https://www.omdbapi.com/?t="+someMovie+"&y=&plot=short&apikey=trilogy",
  method: "GET"
}).then(function(response2) {
  console.log("getOMDB2");
  console.log( response2);
  console.log
  getOMB2Values(response2);
 
  // return response;
});

}

function clearResults(){
  console.log("clearResults");
  for(var i =0; i < displayLength; i++){
     $('#oResultTitle' + i).text("");
    //display Results

     // Remove the poster images
    $("#omResPoster"+i).remove();
     
    // Remove the Title;
    $("oResultTitle"+i).text("");
    
        //Set the info
    $('#oResultInfo'+i).text("");
    
  }


}
function getOMDBValues(response){
   console.log("getOMBDBVal");
   omTitle = response.Search[0].Title;
   console.log("omTitle = " + omTitle);
   omPosterUrl= response.Search[0].Poster;
   console.log("OmPosterURl="+ omPosterUrl );
   omYear=response.Search[0].Year;
   console.log(response.Search.length);
  //calculate if displayLength is greater than length of resultarry
   var resplength =  response.Search.length;
   if (resplength < displayLength){
      displayLength = resplength;
   }
    // console.log(displayLength);
    
    //loop for getting the values.
  for(var i =0; i < displayLength; i++){
      console.log("getOMDBVal i=" + i);
      omPosterUrl= response.Search[i].Poster;
      console.log("OmPosterURl="+ omPosterUrl );
      omTitle = response.Search[i].Title;
      console.log("omTitle = " + omTitle);
      omType = response.Search[i].Type;
      console.log("omType = " + omType);
      $('#oResult' + i).text("");
      //display Results
      var newImgTag= $("<img />")

      // Set the poster images
      var img = $('<img />').attr({
        'id': 'omResPoster'+i,
        'src': omPosterUrl,
        'alt': omTitle,
        // 'title': 'JSFiddle logo',
        // 'width': '25%',
        // 'height' : auto,
         'class': 'resultImage'
       }).appendTo('#oResult' + i);
  
      // Set the title;
      var ptag = $('<p>')
      // ptag.attr("id", "oResultTitle"+i);
      ptag.text("Title: " + omTitle);
      ptag.appendTo('#oResultTitle' + i)

      //Set the info
      var ptag = $('<p>')
      var infoText = "Year: " + omYear + "                    Type: " +omType ;
      ptag.text(infoText);
      ptag.appendTo('#oResultInfo' + i);
      
    }

 }

 function getOMB2Values(response2){
  //set rating images
  var tomatopic = "../assets/fresh-tomato.png";
  var imdpic = "../assets/imdb-logo.png";
  var greenpic= "../assets/imdb-logo.png";
  var metapic= "../assets/metacritic-logo.png"

   console.log("getOMDB2Values");
   $("#imdb-rate").text("--");
   $("#rotten-rate").text("--");
   $("meta-rate").text("--");

    if (response2.Ratings.length < 2){
      var imdbRating = response2.Ratings[0].Value;
      console.log(imdbRating);
      $("#imdb-rate").text(imdbRating);
    }else if (response2.Ratings.length < 3){
      var rottenRating = response2.Ratings[1].Value;
      console.log(rottenRating);
      $("#rotten-rate").text(rottenRating);
    } else if(response2.Ratings.length < 4){
      var metaRating = response2.Ratings[2].Value;
      console.log(metaRating);
      $("meta-rate").text(metaRating);
    }


   var omTitle2 = response2.Title;
   console.log(omTitle2);
   $("h4").text(omTitle2);
   omYear = response2.Year;
   $(".year").text(omYear);
   console.log(omYear);
   //set the rating
   var omRated= response2.Rated;
   $(".MPAA").text(omRated);
   console.log(omRated);
 }


//****************************************************************************  UTELLY SECITON *********************************************************************************************** */
function getUtelly(userSearch){
  $(".streamLinks").empty();
 var settings = {
  "async": true,
  "crossDomain": true,
  url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + userSearch +"&country=us",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    "x-rapidapi-key": "7dc19fa4d2msh8aed653ea90430cp188de1jsnbb205bece2f5"
  }
    }

    $.ajax(settings).done(function (response) {
      console.log("Utelly" + response);
      console.log(response);
      //gets image url of result from uTelly
      var utellyImageURL = response.results[0].picture;
      console.log(utellyImageURL);
      // sets modal image source to utelly image
      $(".modalImage").attr("src", utellyImageURL);
      //gets a varying number of site sources from uTelly
      for (let i = 0; i < response.results[0].locations.length; i++) {
        var siteName = response.results[0].locations[i].display_name;
        var siteURL = response.results[0].locations[i].url;
        console.log(siteName + ": " + siteURL);
        var siteDisplay = $("<a>");
        siteDisplay.text(siteName);
        siteDisplay.attr("href", siteURL);
        siteDisplay.addClass("siteLinks");
        $(".streamLinks").append(siteDisplay);
      }
    });
}

// getUtelly();

//YOUTUBE section

function getYoutube(userSearch){
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+ userSearch + "+official+trailer&type=video&key=AIzaSyC-JojAakkhpwq-_QbOwSZscB93_RgrT2A";
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {
    console.log(response);
    //gets video ID from youtube
    var videoId = response.items[0].id.videoId;
    console.log(videoId);
    //creates the full video URL utilizing the video ID
    var videoURL = "https://www.youtube.com/embed/" + videoId;
    console.log(videoURL);
    //sets the modal video url to the youtube video responce
    $(".iframe").attr("src", videoURL);
  })
}
// getYoutube();

$("#oResult0").click(function(){
  modalMovie = $("#oResultTitle0").text();
  var modifiedTitle = modalMovie.replace("Title: ", "");
  console.log("ClicModal 1 Title" + modifiedTitle);
  getOMDB2(modifiedTitle);
  getUtelly(modifiedTitle);
  getYoutube(modifiedTitle);
})
$("#oResult1").click(function(){
  modalMovie = $("#oResultTitle1").text();
  var modifiedTitle = modalMovie.replace("Title: ", "");
  console.log("ClickModal 2 modifiedTitle=" + modifiedTitle);
  getOMDB2(modifiedTitle);
  getUtelly(modifiedTitle);
  getYoutube(modifiedTitle);
})
$("#oResult2").click(function(){
  modalMovie = $("#oResultTitle2").text();
  var modifiedTitle = modalMovie.replace("Title: ", "");
  console.log("ClickModal 3 modifiedTitle=" + modifiedTitle);
  getOMDB2(modifiedTitle);
  getUtelly(modifiedTitle);
  getYoutube(modifiedTitle);
})