import { Mongoose, model } from "mongoose";

Mongoose.connect("mongodb://localHost3000/badMovies",{ useNewUrlParser: true })

var myMovies = Mongoose.model('badMovies',new Schema ({
  name: String,
  url: String,
}))

var storeMovie = function (movie,callback) {
  var newFavorite = new myMovies ({
    name: movie.name,
    url: movie.url
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
  myMovies.deleteOne({url: movie.url},function (err,success){
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