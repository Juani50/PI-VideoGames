import React from "react";
import "../stayle/Paginado.css"

export default function Paginado({ gamesPerPage, allVideogames, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="listPages">
        {pageNumber &&
          pageNumber.map((number) => (
            <li className="listPage2" key={number}>
              <a className="aPag" onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
