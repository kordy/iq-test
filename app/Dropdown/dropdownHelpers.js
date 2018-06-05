import memoize from 'lodash/memoize';

export const getFilteredList = memoize(
    (list, value) => list.filter(({ name }) => name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === 0),
    (list, value) => ({ list, value })
);