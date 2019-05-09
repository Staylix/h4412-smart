
import { configureStore, createAction } from 'redux-starter-kit';
import { combineReducers } from 'redux'

import user from './reducers/user';
import nav from './reducers/nav';
import tour from './reducers/tour';
import classroom from './reducers/classroom';
import editTour from './reducers/editTour';

export const resetStore = createAction("RESET_STORE");

const app = combineReducers({
    user,
    nav,
    tour,
    classroom,
    editTour,
})

const root = (state, action) => {
    if (action.type === resetStore.type) {
        state = undefined
    }

    return app(state, action)
}

const store = configureStore({
    reducer: {
        root
    },
    middleware: []
});

export default store;