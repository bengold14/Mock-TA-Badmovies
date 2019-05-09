const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
exports.getGenres = function(callback) {
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`) //try to refactor this using params
    .then((list)=> {
      callback(null,list.data.genres)
    })
    .catch((err)=> {
      callback(err,null)
    })
}

exports.getWorstMovies = function(genreId,callback) {
  console.log('genre id is',genreId)
  axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.asc&api_key=${API_KEY}&language=en-US`) //try to refactor this using params
    .then((list)=> {
      console.log('got here',list.data)
      callback(null,list.data)
    })
    .catch((err)=> {
      callback(err,null)
    })
}
