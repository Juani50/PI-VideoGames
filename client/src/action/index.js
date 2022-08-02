import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}
export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}
export function getName(name) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({
      type: "GET_NAME",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function postVideogames(payload){
  return async function(dispatch){
    const json= await axios.post("http://localhost:3001/videogames", payload)
    return json
  }

}
export function getPlatforms (){
  return async function (dispatch){
      var json = await axios.get("http://localhost:3001/videogame")
      
      return dispatch({
          type : "GET_PLATFORMS",
          payload :json.data}
        )
  }
}
export function filterGenres(payload) {
  console.log(payload);
  return {
    type: "FILTER_GENRES",
    payload: payload,
  };
}

export function orderByGame(payload) {
  return {
    type: "ORDER_BY_GAME",
    payload,
  };
}
export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function filterDB(payload) {
  return {
    type: "FILTER_DB",
    payload,
  };
}
export function resetDetail(){
  return {
    type: "RESET_DETAIL",
    payload: []

  }
}

