//function to parse the moviename and replace spaces with +

//Declare Global variables
var myMovie= "Star+Wars";

var myODMBMovieURL = "Star+Wars";

SearchOMDB();

function SearchOMDB(){
 $.ajax({
    // url: "https://www.omdbapi.com/?t=the+dark+night&y=&plot=short&apikey=trilogy",
    url: "https://www.omdbapi.com/?t="+myMovie+"&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

}