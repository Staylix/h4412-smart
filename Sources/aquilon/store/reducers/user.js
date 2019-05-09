const SET_USER_STATE = 'SET_USER_STATE';
const SET_USER_LOCATION = 'SET_USER_LOCATION';

export function setUserState(user) {
    return {
        type: SET_USER_STATE,
        payload: { user }
    }
}

export function setUserLocation(location) {
    console.log(location);
    return {
        type: SET_USER_LOCATION,
        payload: { location }
    }
}

const initialState = {
    user: {},
    userLocation: null,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_STATE: {
            return {...state, user: action.payload.user}
        }
        case SET_USER_LOCATION: {
            return {...state, userLocation: action.payload.location}
        }
        default:
            return state
    }
}
