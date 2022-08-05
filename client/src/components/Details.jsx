import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail} from "../action";
import { useEffect } from "react";
import "../stayle/Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(resetDetail())
    }
  }, [dispatch]);

  const gameDetail = useSelector((state) => state.detail);
  console.log(gameDetail.parent_platforms)

  return (
    <div className="containerDetail">
      <Link to="/home">
        <div>
          <button>Regresar</button>
        </div>
      </Link>
      <div>
        {Object.keys(gameDetail).length > 0 ? (
          <div className="detalle">
            <h1 >{gameDetail.name}</h1>
            <div className="columnas">
              <div>
                <img className="imagenDeta"
                  src={gameDetail.image}
                  alt="not found"
                  width="400px"
                  height="300px"
                ></img>
              </div>
              <div className="detalleLan">
                <h3 className="detalleLan">
                  Lanzamiento: {gameDetail.release_date || gameDetail.released}
                </h3>
                <h3 className="detalleLan">Rating: {gameDetail.rating}</h3>
                <h3 className="detalleplt">Plataformas: {gameDetail.parent_platforms.map((plt)=> plt + "-" )}</h3>
                <h3 className="detalleLan">
                  Generos:{" "}
                  {gameDetail.genres.map((gen) => " " + gen.name + "-")}{" "}
                </h3>
              </div>
            </div>

            <div className="description">
              <h5>Descripcion: {gameDetail.description}</h5>
            </div>
          </div>
        ) : (
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
  );
}



