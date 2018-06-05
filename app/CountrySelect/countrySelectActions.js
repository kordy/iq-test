import countries from './countries.json';

export const COUNTRIES_REQUEST = 'COUNTRIES_REQUEST';
export const COUNTRIES_SUCCESS = 'COUNTRIES_SUCCESS';
export const COUNTRIES_SET = 'COUNTRIES_SET';

const requestCountries = () => {
  return {
    type: COUNTRIES_REQUEST
  }
};

const receiveCountries = data => {
  return {
    type: COUNTRIES_SUCCESS,
    data: data
  }
};

export const fetchCountries = () => {
  return dispatch => {
    dispatch(requestCountries());
    return new Promise(resolve => resolve(countries))
      .then(data => dispatch(receiveCountries(data)))
  }
};

export const setCountry = id => {
  return {
    type: COUNTRIES_SET,
    id
  }
};
