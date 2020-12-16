import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function UpdateMovie(props){
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res)=>{
        console.log("UpdateMovie GET Res: ", res);
        setMovie(res.data);
      })
      .catch((err)=>{
        console.log("UpdateMovie GET Error: ", err);
      });
  }, []);

  const handleChanges = (evt) => {
    setMovie({
      ...movie,
      [evt.target.name]: evt.target.value
    });
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((putres)=>{
        // console.log("UpdateMovie PUT Res: ", putres);
        axios
        .get("http://localhost:5000/api/movies")
        .then(res => props.setMovieList(res.data))
        .catch(err => console.log(err.response));

        history.push(`/movies/${id}`);
      })
      .catch((err)=>{
        console.log("UpdateMovie PUT Error: ", err);
      });
  }

  return(
    <div>
      <h1>Update Movie Info:</h1>
      <form onSubmit={handleSubmit} >
        <label>Title:
          <input 
            name="title"
            type="text"
            value={movie.title}
            onChange={handleChanges}
          />
        </label>
        <label>Director:
          <input 
            name="director"
            type="text"
            value={movie.director}
            onChange={handleChanges}
          />
        </label>
        <label>Metascore:
          <input 
            name="metascore"
            type="number"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
}