/*
 Author: Elijah Krieger (A01241310)
*/
const { promiseImpl } = require("ejs");
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let moviesGiven = req.body;
  splitP(Object.values(moviesGiven))
  .then((moviesGiven) => res.render("pages/index", {listMovies: moviesGiven}))
});

const splitP = (moviesGiven) => {
  return new Promise((resolve, reject) => {
    resolve (moviesGiven[0].split(','))
    
  });
}

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movie1 = req.query.item1; 
  let movie2 = req.query.item2;// In the test URL (the hyperlink in the PDF), the given url uses item1 and item2, instead of movie1 and movie2 (despite the text showing movie, the hyperlink uses item). As such, I check for item in this code (and call it movie for the variable because it makes sense).
  res.render("pages/index", {listMovies: [movie1,movie2]})
});

const fs = require('fs/promises');
const { resolve } = require("path");

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieParam = req.params.movieName
  fs.readFile('movieDescriptions.txt','utf-8', (err, data) => {
    resolve(data)
  })
  .then((data) => {
    // console.log(data)
    let desFound = false
    movieData = data.split('\n')
    movieData.forEach(film => {
      film = film.split(':')
      if (film[0] == movieParam){
        res.render("pages/searchResult", {movieTitle: movieParam, movieDes: film[1]})
        desFound = true
      }
    });
    if (desFound == false){
      res.render("pages/searchResult", {movieTitle: movieParam, movieDes: 'Movie could not be found'})
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀 UwU");
});