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

console.log("what")
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
  var modalImageURL = response2.Poster;
  console.log(modalImageURL);
  $(".modalImage").attr("src", modalImageURL);
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
      omYear = response.Search[i].Year;
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
      ptag.text(omTitle);
      ptag.appendTo('#oResultTitle' + i)

      //Set the info
      var ptag = $('<p>')
      var infoText = "Year: " + omYear + ", " + "Type: " +omType ;
      ptag.text(infoText);
      ptag.appendTo('#oResultInfo' + i);
      
    }

 }

 function getOMB2Values(response2){
   
  console.log("getOMDB2Values");
  //set rating images
  var tomatopic = "assets/fresh-tomato.png";
  var imdpic = "assets/imdb-logo3.png";
  var greenpic= "assets/green-tomato2.png";
  var metapic= "assets/metacritic-logo2.png";
  $("#imdb-pic").attr("src",imdpic);
  $("#meta-pic").attr("src",metapic);
  $("#tomato-pic").attr("src",tomatopic);

  

   $("#imdb-rate").text("N/A");
   $("#rotten-rate").text("N/A");
   $("#meta-rate").text("N/A");

    console.log("getOMB2Values ratings length=" + response2.Ratings.length);
    if (response2.Ratings.length > 0){
      var imdbRating = response2.Ratings[0].Value;
      console.log("imdbrating" + imdbRating);
      $("#imdb-rate").text(imdbRating);
    }

     if (response2.Ratings.length > 1){
        var rottenRating = response2.Ratings[1].Value;
        console.log("rottenrating" + rottenRating);
        //Remove % and convert text to Integer
        var textRating= rottenRating.replace("%","");
        var intRating = parseInt(textRating);
        console.log("intRating= " + intRating);
        console.log("rottenRating=" + rottenRating);
        
        $("#rotten-rate").text(rottenRating);
        if (intRating > 60){
          $("#tomato-pic").attr("src",tomatopic);
        }else{
          $("#tomato-pic").attr("src",greenpic);
        }
     }

     if (response2.Ratings.length > 2){
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
      // $(".modalImage").attr("src", utellyImageURL);
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

function displayToFooter() {
  var retrievedData = localStorage.getItem("Recent");
  var recentMoviesArr = JSON.parse(retrievedData);
  for (let i = 0; i < recentMoviesArr.length; i++) {
    var recentMovieName = recentMoviesArr[i];
    recentMovieName = recentMovieName.replace(" ", "+");
    $.ajax({
      url:
        "https://www.omdbapi.com/?s=" +
        recentMovieName +
        "&y=&plot=short&apikey=trilogy",
      method: "GET"
    }).then(function(response) {
      var myImgSrc = response.Search[0].Poster;
      var sourceName = response.Search[0].Title;
      // posterSource = ;
      console.log(myImgSrc);
      var myImg = $("<img>");
      myImg.attr("src", myImgSrc);
      myImg.addClass("footerImg");
      myImg.attr("data-name", sourceName);
      $(".footerPosters").append(myImg);
    });
  }
}

function addToFooter(thisMovieName) {
  thisMovieName = thisMovieName.replace(" ", "+");
  $.ajax({
    url:
      "https://www.omdbapi.com/?s=" +
      thisMovieName +
      "&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    var myImgSrc = response.Search[0].Poster;
    var sourceName = response.Search[0].Title;
    // posterSource = ;
    console.log(myImgSrc);
    var myImg = $("<img>");
    myImg.attr("src", myImgSrc);
    myImg.addClass("footerImg");
    myImg.attr("data-name", sourceName);
    $(".footerPosters").append(myImg);
  });
}
    

if (localStorage.getItem("Recent") === null) {
  
}else{
  displayToFooter();
}

var footerImgNew = document.querySelectorAll(".footerImg");

// footerImgNew.click(function(){
//   console.log("hello");
  
// })

$(document).on("click",".footerImg",  function(){
  console.log("works", $(this));
  var titleStart = $(this).attr("data-name");
  getOMDB2(titleStart);
  getUtelly(titleStart);
  getYoutube(titleStart);
  $("#modal1").modal("open");
})

var clickedArr = [];

$("#oResult0").click(function(){
  modalMovie = $("#oResultTitle0").text();
  var modifiedTitle = modalMovie.replace("Title: ", "");
  console.log("ClicModal 1 Title" + modifiedTitle);
  getOMDB2(modifiedTitle);
  getUtelly(modifiedTitle);
  getYoutube(modifiedTitle);
  clickedArr.push(modifiedTitle);
  var mylocal=localStorage.getItem("Recent");
  localStorage.setItem("Recent", JSON.stringify(clickedArr));
  addToFooter(modifiedTitle);
})
$("#oResult1").click(function(){
  modalMovie = $("#oResultTitle1").text();
  var modifiedTitle = modalMovie.replace("Title: ", "");
  console.log("ClickModal 2 modifiedTitle=" + modifiedTitle);
  getOMDB2(modifiedTitle);
  getUtelly(modifiedTitle);
  getYoutube(modifiedTitle);
  clickedArr.push(modifiedTitle);
  var mylocal=localStorage.getItem("Recent");
  localStorage.setItem("Recent", JSON.stringify(clickedArr));
  debugger;
  addToFooter(modifiedTitle);
})
$("#oResult2").click(function(){
  modalMovie = $("#oResultTitle2").text();
  var modifiedTitle = modalMovie.replace("Title: ", "");
  console.log("ClickModal 3 modifiedTitle=" + modifiedTitle);
  getOMDB2(modifiedTitle);
  getUtelly(modifiedTitle);
  getYoutube(modifiedTitle);
  clickedArr.push(modifiedTitle);
  var mylocal=localStorage.getItem("Recent");
  localStorage.setItem("Recent", JSON.stringify(clickedArr));
  addToFooter(modifiedTitle);
})