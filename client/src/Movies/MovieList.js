import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  const getMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  };

  const sendToAddMovie = () => {
    history.push('/add-movie');
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="movie-list">
      <button onClick={sendToAddMovie} className='add-movie'>Add a Movie</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
      <button onClick={sendToAddMovie} className='add-movie'>Add a Movie</button>
    </div>
  );
}

export default MovieList;
