const createReducer = (funcMap, initialState) => (state = initialState, action) => (
  funcMap.hasOwnProperty(action.type) ? funcMap[action.type](state, action) : state
);
export default createReducer;
