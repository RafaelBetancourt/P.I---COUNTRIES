import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_COUNTRY_DETAIL,
  GET_ACTIVITIES,
  RESET_SEARCH,
  GET_CONTINENT,
  GET_COUNTRY_BY_ORDER,
  GET_COUNTRY_BY_POPULATION,
  POST_ACTIVITY,
  FILTER_BY_ACTIVITY,
} from "./actions";

const initialState = {
  countries: [],
  search: [],
  countryDetail: {},
  getActivities: [],
  postActivity: [],
  getFilter: [],
  searchStatus: 'not loaded',
  filterStatus: 'not loaded',
  findActivities: []
};


function rootReducer(state = initialState, action) {

  switch (action.type) {
    case GET_COUNTRIES:
      return state = {
        ...state, countries: action.payload
      }
    case GET_COUNTRY:
      return state = {
        ...state, search: action.payload, searchStatus: 'success'
      }
    case GET_COUNTRY_DETAIL:
      return state = {
        ...state, countryDetail: action.payload
      }
    case GET_ACTIVITIES:
      return state = {
        ...state, getActivities: action.payload
      }
    case RESET_SEARCH:
      return state = {
        ...state, search: [], getFilter: [], filterStatus: 'not loaded', searchStatus: 'not loaded'
      }
    case GET_CONTINENT:
      console.log('reducer getcontinent')
      return state = {
        ...state, getFilter: action.payload, filterStatus: 'success'
      }
    case GET_COUNTRY_BY_ORDER:
      return state = {
        ...state, getFilter: action.payload, filterStatus: 'success'
      }
    case GET_COUNTRY_BY_POPULATION:
      return state = {
        ...state, getFilter: action.payload, filterStatus: 'success'
      }
    case POST_ACTIVITY:
      return state = {
        ...state,
        postActivity: state.postActivity.concat(action.payload)
        // postActivity : [...state.postActivity, action.payload]
      }
    case FILTER_BY_ACTIVITY:

      let filter = state.getActivities.filter(a => a.season === action.payload).reduce((a, e) => [...a, ...e.countries], [])

      return state = {
        ...state,
        getFilter: filter, filterStatus: 'success'
      }

    default:
      return { ...state }
  }
}

export default rootReducer;