import { createStore, combineReducers } from 'redux'
import tourReducer from './reducers/tour.js'
import userReducer from './reducers/user.js'

const reducers = combineReducers({
    tour: tourReducer,
    user: userReducer,
})

export default createStore(reducers)
