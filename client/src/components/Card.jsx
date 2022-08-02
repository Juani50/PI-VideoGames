import React from "react";
import  "../stayle/Card.css"
import { Link } from "react-router-dom";

export default function Card({ id, name, image, genres}) {
  return (
    <div className= "card">
      <img src={image} alt="img not found" width="350" heigth="400" />
      <Link to= {`/detail/${id}`}>
         <h3>{name}</h3>
         </Link>
      <h3 className="nameGenres">{genres.map(g=>" " + g.name + " ")}</h3>
    </div>
  );
}
