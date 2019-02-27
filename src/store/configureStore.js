import { createStore, combineReducers } from 'redux';

import choresReducer from './reducers/chores';

const appReducer = combineReducers({
    chores: choresReducer
});

const rootReducer = (state, action) => {
    console.log(action.type)
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;