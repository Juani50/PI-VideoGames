import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postVideogames, getGenres} from "../action";
import { useDispatch, useSelector } from "react-redux";
import "../stayle/VideoGameCre.css";

const urlImg = (url) => {
  return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
};
const rele = (rel) => {
  return /^([0-2][0-9,$]|3[0-1])(\/|-)(0[1-9,$]|1[0-2])\2(\d{4})$/.test(rel);
};
const validateForm = (e) => {
  const error = {};
  
  if (e.name.length > 15) {
    error.name = "El nombre tiene que tener menos de 15 caracteres";
  } else if (!/^[A-Z][a-z_-]{3,19}$/.test(e.name)) {
    error.name = "El nombre debe ser en mayuscula y tener mas de 3 caracteres";
  }
  if (!e.name) {
    error.name = "El nombre es requerido";
  }  if (!e.description) {
    error.description = "La descripción es requerida";
  }  if (e.description.length > 300) {
    error.description = "La descripcion deben ser menos de 100 caracteres";
  }  if (!urlImg(e.image)) {
    error.image = "La URL no es valida";
  }  if (!e.genres.length ) {
    error.genres = "Es requerido al menos un genero";
  }  if (!e.parent_platforms.length) {
    error.parent_platforms = "Es requerido al menos una plataforma";
  }  if (!e.rating) {
    error.rating = "El rating debe ser entre 1 y 5";
  } if (!rele(e.released)) {
    error.released = "La fecha no es valida";
  }
  console.log("error", error)
  console.log("genres", e.genres)
 
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
    released: "",
    image: "",
    genres: [],
  });

  const btnDisabled = !(
    input.name &&
    input.description &&
    input.rating &&
    input.released &&
    input.image &&
    input.parent_platforms.length &&
    input.genres.length
  );

  function handleChange(e) {
    if (!error.name || !error.released || !error.rating || !error.image) {
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
    console.log( "change",e.target.value );
  }
  const handleInput = (event) => {
    if (!input.genres.includes(event.target.value)) {
      if (event.target.name === "genres") {
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
      setErrors(
        validateForm({
          ...input,
          genres: [...input.genres, event.target.value],
        })
      );
      return;
    }
    alert("No se pueden repetir los generos");
  };
  const handlePlatforms = (e) => {
    if (
      e.target.value !== "DEFAULT" &&
      !input.parent_platforms.includes(e.target.value)
    ) {
      setInput({
        ...input,
        parent_platforms: [...input.parent_platforms, e.target.value],
      });
      setErrors(
        validateForm({
          ...input,
          parent_platforms:[...input.parent_platforms, e.target.value],
        })
      );
      return;
    }
    alert("No se pueden repetir las plataformas");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name && input.description && input.released && input.image && input.parent_platforms.length > 0 && input.genres.length > 0 ) {
      dispatch(postVideogames(input));
      alert("Se creo el videojuego!");
      setInput({
        name: "",
        description: "",
        parent_platforms: [],
        rating: 0,
        released: "",
        image: "",
        genres: [],
      });
    } else {
      alert("Faltan completar datos");
    }
    console.log(input)
  }
  const handleOnErrors = (e) => {
    console.log('val', e.target.value)
    e.preventDefault();
    setErrors(validateForm({
        ...input,
    }))
    handleSubmit(e)
};

  const handleDelete = (e, option) => {
    setInput({
      ...input,
      [option]: input[option].filter((data) => data !== e),
    });
    setErrors(
      validateForm({
        ...input,
        [option]: input[option].filter((data) => data !== e),
      })
    );
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="todoForm">
      <div>
        <div className="botonReg">
          <Link to="/home">
            <button className="botonVol">Regresar</button>
          </Link>
        </div>
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
          {error.description && (
            <span className="errorName">{error.description}</span>
          )}
          <div className="form">
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
          {error.rating && <span className="errorName">{error.rating}</span>}
          <div className="form">
            <label>Lanzamiento: </label>
            <input
              type="text"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error.released && (
            <span className="errorName">{error.released}</span>
          )}
          <div className="form">
            <label>Imagen: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error.image && <span className="errorName">{error.image}</span>}
          <div className="form">
            <label htmlFor="parent_platforms">Plataformas: </label>
            <select
              name="parent_platforms"
              onChange={(e) => handlePlatforms(e)}
            >
              <option default onFocus value="DEFAULT">
                Seleccionar
              </option>
              {parent_platforms.map((plt) => (
                <option key={plt.id} value={plt.name}>
                  {plt.name}
                </option>
              ))}
            </select>
            <div>
              <div className="divPlt">
                {input.parent_platforms.map((e) => (
                  <div key={e}>
                    <p className="plt">{e}</p>
                    <button
                      className="botonX"
                      onClick={() => handleDelete(e, "parent_platforms")}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {error.parent_platforms && (
            <span className="errorName">{error.parent_platforms}</span>
          )}
          <div>
            <label>Generos: </label>
            <select name="genres" onChange={(e) => handleInput(e)}>
              <option default onFocus value="DEFAULT">Seleccionar</option>
              {genres.map((genres) => (
                <option value={genres.name}>{genres.name}</option>
              ))}
            </select>
            <div>
              <div className="divPlt">
                {input.genres.map((e) => (
                  <div key={e}>
                    <p className="plt">{e}</p>
                    <button
                      className="botonX"
                      onClick={() => handleDelete(e, "genres")}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
                {error.genres && (
                  <span className="errorName">{error.genres}</span>
                )}
            </div>
          </div>
          <button className="botonCre" onClick={(e)=>handleOnErrors(e)}  type="submit">
            Crear Vidoejuego
          </button>
        </form>
      </div>
    </div>
  );
}
