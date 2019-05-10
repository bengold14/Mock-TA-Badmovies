//run mongod and mongo

var Mongoose = require('mongoose')

Mongoose.connect("mongodb://localHost/badMovies",{ useNewUrlParser: true })

var myMovies = Mongoose.model('badMovies',new Mongoose.Schema ({
  title: String,
  poster_path: String,
  release_date: String,
  popularity: String,
  overview: String
}))

var storeMovie = function (movie,callback) {
  var newFavorite = new myMovies ({
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    popularity: movie.popularity,
    overview: movie.overview
  })
  newFavorite.save(function (err,success){
    if (err) {
      console.log('we errored in storing movie (index.js)',err)
      callback(err,null)
    } else {
      console.log('we succeeded in storing movie (index.js)')
      callback(null,success)
    }
  })
}

var deleteMovie = function (movie,callback) {
  myMovies.deleteOne({title:movie.title},function (err,success){
    if (err) {
      console.log('we errored in removing movie (index.js)',err)
      callback(err,null)
    } else {
      console.log('we succeeded in removing movie (index.js)')
      callback(null,success)
    }
  })
}

var retrieveFavorites = function (callback) {
  myMovies.find({},function (err,data){
    if (err) {
      console.log('we errored in retrieving all movies (index.js)',err)
      callback(err,null)
    } else {
      console.log('we succeeded in retrieving all movies (index.js)')
      callback(null,data)
    }
  })
}

module.exports.storeMovie = storeMovie
module.exports.deleteMovie = deleteMovie
module.exports.retrieveFavorites = retrieveFavorites