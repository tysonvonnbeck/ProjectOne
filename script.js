//Click Button Event 


//**********************************************OMBDB Section ****************************************/




//***********************Declare Global variables for OMDB****************************************************
var myMovie= "Star Trek";
var OMDBresponse;
var omTitle;
var omPosterUrl;
var omType;
var omYear;
var displayLength= 3;
var movieList = {
  title: "",
  year:"",
  type:"",
  poster: "",
  imdbId: "",
 };


//
myMovie= myMovie.replace(" ","+");  //create string to insert into url request
console.log("OMDB:myMovie = " + myMovie);


getOMDB();

function getOMDB(){
 $.ajax({
    //  url: "https://www.omdbapi.com/?t=the+dark+night&y=&plot=short&apikey=trilogy",
     url: "https://www.omdbapi.com/?s="+myMovie+"&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    getOMDBValues(response);
    // return response;
  });
  
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
    console.log(displayLength);
    
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

//****************************************************************************  UTELLY SECITON *********************************************************************************************** */
function getUtelly(){
 var settings = {
  "async": true,
  "crossDomain": true,
  url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + myMovie +"&country=us",
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
      //gets a varying number of site sources from uTelly
      for (let i = 0; i < response.results[0].locations.length; i++) {
        var siteName = response.results[0].locations[i].display_name;
        var siteURL = response.results[0].locations[i].url;
        console.log(siteName + ": " + siteURL);
      }
    });
}

getUtelly();

//YOUTUBE section

function getYoutube(){
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+ myMovie + "+official+trailer&type=video&key=AIzaSyC4cWs_v0qBgmvKpBHqAsFIePVg_p9uuHY";
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {
    console.log(response);
    //gets video ID from youtube
    var videoId = response.items[0].id.videoId;
    console.log(videoId);
    //creates the full video URL utilizing the video ID
    var videoURL = "https://www.youtube.com/watch?v=" + videoId;
    console.log(videoURL);
  })
}
getYoutube();