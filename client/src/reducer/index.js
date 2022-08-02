const initialState = {
  videoGames: [],
  allVideogames: [],
  genres: [],
  detail: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videoGames: action.payload,
        allVideogames: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "FILTER_GENRES":
      // if("all"){return state.allVideogames}
      let newArrFilter = state.allVideogames.filter((p) => {
        var flag = false;
        p.genres.forEach((element) => {
          if (element.name === action.payload) {
            flag = true;
          }
        });
        return flag;
      });

      return {
        ...state,
        videoGames: [...newArrFilter],
      };
    case "ORDER_BY_GAME":
      let sortedArr =
        action.payload === "AZ"
          ? state.videoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: sortedArr,
      };
    case "ORDER_BY_RATING":
      let sortedP =
        action.payload === "peor"
          ? state.videoGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videoGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: sortedP,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
      case "GET_PLATFORMS":
        return{
        ...state,
        platforms: action.payload 
        }
    case "FILTER_DB":
      const allVideogames = state.allVideogames;
      const dbFilter =
        action.payload === "db"
          ? allVideogames.filter((game) => game.createdInDb)
          : allVideogames.filter((game) => !game.createdInDb);
      return {
        ...state,
        videoGames: action.payload === "all" ? state.allVideogames : dbFilter,
      };
      case "GET_NAME":
        return{
          ...state,
          videoGames: action.payload
        }
        case "POST_VIDEOGAMES":
          return{
            ...state
          }
          case "RESET_DETAIL":
        return{
          ...state,
          detail: action.payload
        }

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
