import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import isMobile from 'ismobilejs';

function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

const store = configureStore({
  isMobile: isMobile.any
});

export default store;
