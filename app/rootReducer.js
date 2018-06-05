import { combineReducers } from 'redux';

import countrySelect from './CountrySelect/countrySelectReducer';

const rootReducer = combineReducers({
  isMobile: (state = {}) => state,
  countrySelect
});

export default rootReducer;
