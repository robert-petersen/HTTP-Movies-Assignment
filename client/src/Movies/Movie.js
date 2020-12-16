import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleUpdateClick = (evt) => {
    evt.preventDefault();
    history.push(`/update-movie/${params.id}`);
  }

  const handleDeleteClick = (evt) => {
    evt.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then (res=>{
      axios
        .get("http://localhost:5000/api/movies")
        .then(res => setMovieList(res.data))
        .catch(err => console.log(err.response));
      history.push('/');
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleUpdateClick} >Update</button>
      <button onClick={handleDeleteClick} >Delete</button>
    </div>
  );
}

export default Movie;
