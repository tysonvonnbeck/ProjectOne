//Click Button Event 


//**********************************************OMBDB Section ****************************************/




//***********************Declare Global variables for OMDB****************************************************
var myMovie= "Star Trek";
var OMDBresponse;
var omTitle;
var omPosterUrl;
var omType;
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
      ptag.attr("id", "omResTitle"+i);
      ptag.text("Title: " + omTitle);
      // ptag.appendTo('#oResult' + i)
        
    }

 }