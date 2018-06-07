import * as actionTypes from './countrySelectActions';
import createReducer from '../createReducer';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  isFetched: false
};

export default createReducer({
  [actionTypes.COUNTRIES_REQUEST]: (state) => ({ ...state, isPending: true }),
  [actionTypes.COUNTRIES_SUCCESS]: (state, { data }) => ({ data, isFetched: true, isPending: false }),
}, INITIAL_STATE)
