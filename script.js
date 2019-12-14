//Click Button Event 


//**********************************************OMBDB Functions Section ****************************************/
//function to parse the moviename and replace spaces with +



//***********************Declare Global variables for OMDB****************************************************
var myMovie= "Star Wars";
var OMDBresponse;
var omTitle;
var omPosterUrl;


//
myMovie= myMovie.replace(" ","+");  //create string to insert into url request
console.log("OMDB:myMovie = " + myMovie);


OMDBresponse = getOMDB();

function getOMDB(){
 $.ajax({
    // url: "https://www.omdbapi.com/?t=the+dark+night&y=&plot=short&apikey=trilogy",
    url: "https://www.omdbapi.com/?t="+myMovie+"&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    return response;
  });
  
}


function getOMDBValues(){
    omTitle = OMDBresponse.Title;
   console.log("omTitle = " + omTitle);
    omPosterUrl= OMDBresponse.Poster;
   console.log("OmPosterURl="+ omPosterUrl );
    $("img").attr("url",omPosterUrl);




}