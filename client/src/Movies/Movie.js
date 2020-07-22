import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movies, setMovies }) {
  const params = useParams();
  const history = useHistory();
  const movie = movies.find(mov => {
    return mov.id === parseInt(params.id);
  })

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const sendToEdit = () => {
    history.push(`/update-movie/${params.id}`);
  }

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res); //res.data => id
        setMovies(movies.filter(mov => mov.id !== res.data));
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={sendToEdit}>Edit</button>&nbsp;
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
