import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddMovie(props){
  const history = useHistory();
  const [newMovie, setNewMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const handleChanges = (evt) => {
    setNewMovie({
      ...newMovie,
      [evt.target.name]: evt.target.value
    });
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    newMovie.id = Date.now();
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then((res)=>{
        console.log("UpdateMovie Post Res: ", res);
        props.setMovieList(res.data)
        history.push(`/`);
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
            value={newMovie.title}
            onChange={handleChanges}
          />
        </label>
        <label>Director:
          <input 
            name="director"
            type="text"
            value={newMovie.director}
            onChange={handleChanges}
          />
        </label>
        <label>Metascore:
          <input 
            name="metascore"
            type="text"
            value={newMovie.metascore}
            onChange={handleChanges}
          />
        </label>
        <button>Add Movie</button>
      </form>
    </div>
  );
}