import { createStore, combineReducers } from 'redux';

import choresReducer from './reducers/chores';

const rootReducer = combineReducers({
    chores: choresReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;