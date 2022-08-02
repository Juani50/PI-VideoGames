import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postVideogames, getGenres } from "../action";
import { useDispatch, useSelector } from "react-redux";
import "../stayle/VideoGameCre.css"

const urlImg = (url) => {
  return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
};
const validateForm = (input) => {
  const error = {};

  if (input.name.length < 3) {
    error.name = "El nombre tiene que tener al menos 3 caracteres";
  }
  if (input.name.length > 15) {
    error.name = "El nombre tiene que tener menos de 15 caracteres";
  } else if (!/^[A-Z][a-z_-]{3,19}$/.test(input.name)) {
    error.name ="El nombre debe ser en mayuscula"
  }
  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (!input.description) {
    error.description = "La descripción es requerida";
  } else if (!urlImg(input.image)) {
    error.image = "La URL no es valida";
  } else if (input.genres.length === 0) {
    error.genres = "Es requerido al menos un genero";
  } else if (input.parent_platforms.length === 0) {
    error.parent_platforms = "Es requerido al menos una plataforma";
  }
  return error;
};

export default function VideoGameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [error, setErrors] = useState({});
  // const videoJuegos = useSelector((state)=> state.allVideoames)

  const parent_platforms = [
    {
      id: 21,
      name: "Android",
    },
    {
      id: 26,
      name: "Game Boy",
    },
    {
      id: 24,
      name: "Game Boy Advance",
    },
    {
      id: 43,
      name: "Game Color",
    },
    {
      id: 105,
      name: "GameCub",
    },
    {
      id: 3,
      name: "iOS",
    },
    {
      id: 6,
      name: "Linux",
    },
    {
      id: 5,
      name: "macOS",
    },
    {
      id: 49,
      name: "NES",
    },
    {
      id: 8,
      name: "Nintendo 3Ds",
    },
    {
      id: 83,
      name: "Nintendo 64",
    },
    {
      id: 9,
      name: "Nintendo DS",
    },
    {
      id: 13,
      name: "Nintendo DSi",
    },
    {
      id: 4,
      name: "PC",
    },
    {
      id: 19,
      name: "PS Vita",
    },
    {
      id: 17,
      name: "PSP",
    },
    {
      id: 27,
      name: "PlayStation",
    },
    {
      id: 15,
      name: "PlayStation 2",
    },
    {
      id: 16,
      name: "PlayStation 3",
    },
    {
      id: 18,
      name: "PlayStation 4",
    },
    {
      id: 187,
      name: "PlayStation 5",
    },
    {
      id: 79,
      name: "SNES",
    },
    {
      id: 11,
      name: "Wii",
    },
    {
      id: 10,
      name: "Wii U",
    },
    {
      id: 80,
      name: "Xbox",
    },
    {
      id: 14,
      name: "Xbox 360",
    },
    {
      id: 1,
      name: "Xbox One",
    },
    {
      id: 186,
      name: "Xbox Series S",
    },
  ];

  const [input, setInput] = useState({
    name: "",
    description: "",
    parent_platforms: [],
    rating: 0,
    released: 0,
    image: "",
    genres: [],
  });

  const btnDisabled = !(
    input.name &&
    input.description &&
    input.image &&
    input.parent_platforms.length&&
    input.genres.length
  );

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  const handleInput = (event) => {
    if(!input.genres.includes(event.target.value) || !input.parent_platforms.includes(event.target.value)){
    if (
      event.target.name === "genres" ||
      event.target.name === "parent_platforms"
    ) {
      const array = input[event.target.name];
      setInput({
        ...input,
        [event.target.name]: array.concat(event.target.value),
      });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
      return
    }
    alert("No se pueden repetir las opciones")
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogames(input));
    alert("Se creo el videojuego!");
    setInput({
      name: "",
      description: "",
      parent_platforms: [],
      rating: 0,
      released: 0,
      image: "",
      genres: [],
    });
  }

  const handleDelete = (e, option) => {
    setInput({
      ...input,
      [option]: input[option].filter((data) => data !== e),
    });
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="todoForm">
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1 className="tituloForm">Crea el mejor Videojuego!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        {error.name && <span className="errorName">{error.name}</span>}
        <div className="form">
          <label>Descripción: </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {error.description && <span>{error.description}</span>}
        <div className="form" >
          <label>Rating: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form">
          <label>Lanzamiento: </label>
          <input
            type="text"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {error.released && <span>{error.released}</span>}
        <div className="form">
          <label>Imagen: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {error.image && <span>{error.image}</span>}
        <div className="form">
          <label htmlFor="parent_platforms">Plataformas: </label>
          <select name="parent_platforms" onChange={(e) => handleInput(e)}>
            <option disabled value="DEFAULT">
              Seleccionar
            </option>
            {parent_platforms.map((plt) => (
              <option key={plt.id} value={plt.name}>
                {plt.name}
              </option>
            ))}
          </select>
          <div>
            <div className="divX">
              {input.parent_platforms.map((e) => (
                <div key={e} className="divX2">
                  <p>{e}</p>
                  <button className="botonX" onClick={() => handleDelete(e, "parent_platforms")}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {error.parent_platforms && <span>{error.parent_platforms}</span>}
        <div className="form">
          <label>Generos: </label>
          <select name="genres" onChange={(e) => handleInput(e)}>
            <option disabled>Seleccionar</option>
            {genres.map((genres) => (
              <option value={genres.name}>{genres.name}</option>
            ))}
          </select>
          <div>
            <div className="divX">
              {input.genres.map((e) => (
                <div key={e} className="divX2">
                  <p>{e}</p>
                  <button className="botonX" onClick={() => handleDelete(e, "genres")}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="botonCre" disabled={btnDisabled} type="submit">
          Crear Vidoejuego
        </button>
      </form>
      <div className="form1"></div>
    </div>
    
  );
}
