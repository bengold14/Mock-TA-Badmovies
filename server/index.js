var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var database = require('../db/mongodb/index.js')
var app = express();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/favorites', function (req,res) {
  apiHelpers.retrieveFavorites((err,data)=>{
    if (err) {
      console.log('error happened getting the favorites',err)
      res.status(500).send()
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/genres', function(req, res) {
  apiHelpers.getGenres((err,data)=>{
    if (err) {
      console.log('error happened getting the genres',err)
      res.status(500).send()
    } else {
      res.status(200).send(data)
    }
  })  
});

app.get('/search', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  apiHelpers.getWorstMovies((err,data)=>{
    if (err) {
      console.log('error happened getting the genres',err)
      res.status(500).send()
    } else {
      res.status(200).send(data)
    }
  })
});


app.post('/save', function(req, res) {
  //save movie as favorite
  var movie = req.body.movie
  database.storeMovie(movie,(err,success) => {
    if (err) {
      console.log('error happened saving the movie',err)
      res.status(500).send()
    } else {
      res.status(200).send()
    }
  })



});

app.post('/delete', function(req, res) {

  var movie = req.body.movie
  database.deleteMovie(movie,(err,success) => {
    if (err) {
      console.log('error happened deleting the movie',err)
      res.status(500).send()
    } else {
      res.status(200).send()
    }
  })

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
