import * as actionTypes from './countrySelectActions';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  isFetched: false
};

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case actionTypes.COUNTRIES_REQUEST: return { ...state, isPending: true };
    case actionTypes.COUNTRIES_SUCCESS: return { data: action.data, isFetched: true, isPending: false };
    default: return state;
  }
}