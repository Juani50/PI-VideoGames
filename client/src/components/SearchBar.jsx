import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../action";
import { Link } from "react-router-dom";
import "../stayle/Nav.css"


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    dispatch(getName(name));
  }

  return (
    <nav>
      <div className="Nav">
        <Link to="/home">
          <h1 className="TituloNav">Henry Video Games</h1>
        </Link>
        <input
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="Busqueda por nombre..."
          className="Busqueda"
        />
        <button className="Busqueda2" type="submit" onClick={(e) => handleName(e)}>
          Search
        </button>
        <Link to="/createdvideogame">
          <button className="Created">Crear Videojuego</button>
        </Link>
      </div>
      </nav>
  );
}
