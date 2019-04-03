import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import orgReducers from './reducers/home/org-reducers'
import polReducers from './reducers/home/pol-reducers'
import celebReducers from './reducers/home/celeb-reducers'
import authReducer from './reducers/auth'
import modal from './reducers/home/modal'
import feedback from './reducers/feedback'
import {setAuthToken, refreshAuthToken} from './actions/auth';
import {loadAuthToken} from './local-storage';


const reducers = combineReducers({orgReducers, polReducers, celebReducers, modal, auth: authReducer, feedback});
const store = createStore(reducers, applyMiddleware(thunk));

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;