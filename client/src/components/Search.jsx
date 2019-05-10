import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: {data:[]},
      currentGenreId: 1
    };
    this.updateGenre = this.updateGenre.bind(this)
  }

  getGenres() {
    axios.get('/genres')
    .then( (data) =>{
      this.setState({genres:data})
    })
    .catch((err) =>{
      console.log('error getting genres Search.jsx',err)
    })
  }

  componentWillMount(){
    this.getGenres()
  }

  updateGenre (e) {
    this.setState({currentGenreId: e.target.value})
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select value={this.state.currentGenreId} onChange={this.updateGenre}>
          {this.state.genres.data.map((genre,index)=>{
            return (
              <option value={genre.id} key={index}>{genre.name}</option>
            )
          })}
        </select>
        <br/><br/>

        <button onClick={()=>{this.props.getMovies(this.state.currentGenreId)}}>Search</button>

      </div>
    );
  }
}

export default Search;