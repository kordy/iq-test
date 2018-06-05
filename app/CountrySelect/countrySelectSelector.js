import { createSelector } from 'reselect';

const getCountrySelect = state => state.countrySelect;

export const getSortedCountries = createSelector([getCountrySelect], countries => countries.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
export const getIsFetched = (state) => getCountrySelect(state).isFetched;
