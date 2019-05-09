import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.post('/search', {"genreId":genreId})
    .then((data)=>{
      this.setState({movies:data.data.results})
      console.log(this.state.movies)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentWillMount() {
    this.getMovies(18)
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));