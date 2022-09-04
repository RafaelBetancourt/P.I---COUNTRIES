import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_COUNTRY_DETAIL = 'GET_COUNRTY_DETAIL';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const RESET_SEARCH = 'RESET_SEARCH';
export const GET_CONTINENT = 'GET_CONTINENT';
export const GET_COUNTRY_BY_ORDER = 'GET_COUNTRY_BY_ORDER';
export const GET_COUNTRY_BY_POPULATION = 'GET_COUNTRY_BY_POPULATION';
export const POST_ACTIVITY = 'POST_ACTIVITY'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';


export function getCountries() {
  return function (dispatch) {
    return fetch('http://localhost:3001/countries')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRIES, payload: json });
      });
  };
}

export function getCountryByName(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/countries?name=${name}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRY, payload: json })
      });
  };
}

export function getCountryByOrder(order) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/countries?nameOrder=${order}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRY_BY_ORDER, payload: json })
      });
  };
}

export function getCountryByPopulation(popuOrder) {
  return function (dispatch) {

    return fetch(`http://localhost:3001/countries?popuOrder=${popuOrder === 'MIN' ? 'ASC' : 'DESC'}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRY_BY_POPULATION, payload: json })
      });
  };
}

export function getCountryByContinent(continent) {
  console.log('actions getcontinents')
  return function (dispatch) {
    return fetch(`http://localhost:3001/countries?continent=${continent}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_CONTINENT, payload: json })
      });
  };
}

export function getCountryByActivities(season) {
  return { type: FILTER_BY_ACTIVITY, payload: season }
};

export function resetSearch() {
  return { type: RESET_SEARCH }
};

export function getCountryDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/countries/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRY_DETAIL, payload: json })
      });
  };
}

export function postActivity(payload) {
  return function (dispatch) {
    return axios.post(`http://localhost:3001/countries/activities`,
      payload)
      .then(response => response.data)
      .then(json => {
        dispatch({ type: POST_ACTIVITY, payload: json })
      })
  }
}

export function getActivities() {
  return function (dispatch) {
    return fetch('http://localhost:3001/activities')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_ACTIVITIES, payload: json })
      });
  };
}


