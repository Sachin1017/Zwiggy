import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers';

const rootReducer = combineReducers({Reducers});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
