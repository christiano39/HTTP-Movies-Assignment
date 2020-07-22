import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditForm from './Movies/EditForm';
import AddForm from './Movies/AddForm';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movies}/>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movies={movies} setMovies={setMovies}/>
      </Route>

      <Route path="/update-movie/:id">
        <EditForm setMovies={setMovies} movies={movies} />
      </Route>

      <Route path='/add-movie'>
        <AddForm setMovies={setMovies} movies={movies} />
      </Route>
    </>
  );
};

export default App;
