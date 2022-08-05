import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getVideogames,
  orderByGame,
  orderByRating,
  filterGenres,
  filterDB,
} from "../action";
import Card from "./Card";
import Paginado from "./Paginado";
import "../stayle/Home.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);
  const allGenres = useSelector((state) => state.genres);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame);
  console.log(allVideoGames);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if(!allVideoGames.length){
    dispatch(getVideogames())};
    }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleFilterGenres(e) {
    dispatch(filterGenres(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByGame(e.target.value));
    setOrder(`${e.target.value}`);
  }
  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setOrder(`${e.target.value}`);
  }
  function handleFilterDb(e) {
    dispatch(filterDB(e.target.value));
  }

  return (
    <div className="TodoHome">
      <SearchBar />

      <div>
        <div className="Filtros">
          <div className="Filtros">
            <a className="filtroApi">Filter By: </a>
            <select defaultValue="DEFAULT" onChange={(e) => handleSort(e)}>
              <option disabled onFocus value="DEFAULT">
                Ordenado por...
              </option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
            </select>
          </div>
          <div className="Filtros">
            <a className="filtroApi">Filter By: </a>
            <select
              
              onChange={(e) => handleSortRating(e)}
            >
              <option default onFocus value="DEFAULT">
                Ordenado por...
              </option>
              <option value="mej">Mejores reatings</option>
              <option value="peor">Peores reatings</option>
            </select>
          </div>
          <div className="Filtros">
            <a className="filtroApi">Filter By:</a>
            <ul>
              <select onChange={(e) => handleFilterGenres(e)}>
                <option value="all">Generos</option>

                {allGenres.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </ul>
          </div>
          <div className="Filtros">
            <a className="filtroApi">Filter By: </a>
            <select onChange={(e) => handleFilterDb(e)}>
              <option value="all">Todos</option>
              <option value="api">Api</option>
              <option value="db">DB</option>
            </select>
          </div>
        </div>
        <div className="Paginado">
          <Paginado
            gamesPerPage={gamesPerPage}
            allVideogames={allVideoGames.length}
            paginado={paginado}
          />
        </div>
        <div className="container-container">
          {currentGames ? (
            currentGames.map((game) => {
              return (
                <div key={game.id}>
                  <Card
                    image={game.image}
                    name={game.name}
                    genres={game.genres}
                    key={game.id}
                    id={game.id}
                  />
                </div>
              );
            }
           )): (
            <div className="loader">
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
