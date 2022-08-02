const { Router } = require("express");
const axios = require("axios");

const { Videogame, Genres } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res, next) => {
  try {
    let nombre = req.query.name;

   if(nombre){
    const respuestaAPi = await axios.get(
      `https://api.rawg.io/api/games?search=${nombre}&key=f439a0ce73734df19bcff643b05e69a9`
    );
    const prueba = respuestaAPi.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        parent_platforms: game.parent_platforms?.map(
          (plt) => plt.platform.name
        ),
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((g) => {
          return {
            id: g.id,
            name: g.name,
          };
        }),
        image: game.background_image,
      };
    });
    // base de datos
    const resDbVideogames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    let pepe = resDbVideogames.filter((n) =>
      n.name.toLowerCase().includes(nombre.toLowerCase())
    );

    let resultadoFinal = [...pepe, ...prueba];
    return res.json(resultadoFinal.slice(0, 16));}
    // api
    const res1 = await axios.get(
      `https://api.rawg.io/api/games?key=f439a0ce73734df19bcff643b05e69a9&page_size=33`
    );

    const res2 = await axios.get(
      `https://api.rawg.io/api/games?key=f439a0ce73734df19bcff643b05e69a9&page=2&page_size=33`
    );

    const res3 = await axios.get(
      `https://api.rawg.io/api/games?key=f439a0ce73734df19bcff643b05e69a9&page=3&page_size=34`
    );

    const respuesta = res1;
    const pepe = res1.data.results.concat(res2.data.results, res3.data.results);

    // base de datos
    const DbVideogames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    if (respuesta) {
      let apiResp = pepe?.map((game) => {
        return {
          id: game.id,
          name: game.name,
          parent_platforms: game.parent_platforms?.map(
            (plt) => plt.platform.name
          ),
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((g) => {
            return {
              id: g.id,
              name: g.name,
            };
          }),
          image: game.background_image,
        };
      });
 
      let resultFinal = [...DbVideogames, ...apiResp];
      return res.send(resultFinal);
    } else {
      res.status(200).json({ message: "Error en respuesta(api)" });
    }
  } catch (error) {
    console.log(error.message);
    next(error)
  }
});

router.get("/genres", async (req, res, next) => {
  try {
    const apiG = await axios.get(
      "https://api.rawg.io/api/genres?key=37658995918847f888356d006d410dd8"
    );
    const apiGeneros = await apiG.data.results.map((gener) => gener.name);
    apiGeneros.forEach((gen) => {
      Genres.findOrCreate({
        where: { name: gen },
      });
    });
    const allGeneros = await Genres.findAll();
    return res.status(200).send(allGeneros);
  } catch (error) {
    next(error);
    res.status(404).send(error);
  }
});

router.post("/videogames", async (req, res) => {
  const {
    name,
    image,
    parent_platforms,
    description,
    rating,
    released,
    genres,
  } = req.body;
  try {
    let createVideo = await Videogame.create({
      name,
      image,
      parent_platforms,
      description,
      rating,
      released,
      genres
    });
    let arrGenres = await Genres.findAll({ where: { name: genres } });
    // let arrayGen = await arrGenres.filter((g) =>
    //   genres.includes(g.dataValues.name)
    // );
    await createVideo.addGenres(arrGenres);
    return res.send(createVideo);
  } catch (error) {
    console.log(error);
  }
});
router.get("/videogames/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id.length < 10) {
      let videoAPI = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=37658995918847f888356d006d410dd8`
      );
      videoAPI = videoAPI.data;
      let game = {
        id: videoAPI.id,
        name: videoAPI.name,
        description: videoAPI.description.replace(/<[^>]*>?/gm, ''),
        rating: videoAPI.rating,
        parent_platforms: videoAPI.parent_platforms?.map(
          (plt) => plt.platform.name
        ),
        genres: videoAPI.genres.map((g) => {
          return {
            name: g.name,
          };
        }),
        
        image: videoAPI.background_image,
        release_date: videoAPI.released,
      };
      return res.send(game);
    } else {
      const videoDB = await Videogame.findByPk(id, {
        include: { model: Genres },
      });
      if (videoDB)
        return res.send({
          id: videoDB.id,
          name: videoDB.name,
          description: videoDB.description,
          released: videoDB.released,
          rating: videoDB.rating,
          parent_platforms: videoDB.parent_platforms,
          genres: videoDB.genres,
          image: videoDB.image,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
