
import { createSlice, PayloadAction, Slice } from 'redux-starter-kit'

// Pages names
export const DASHBOARD = 'DASHBOARD';
export const MANAGETOUR = 'managetour';
export const SIGNUP = 'signup';
export const SIGNIN = 'signin';
export const HOMEPAGE = 'homepage';
export const CREATETOUR = 'createtour';
export const MANAGECLASSROOM = 'manageclassroom';
export const CREATECLASSROOM = 'createclassroom';
export const NEWPOI = 'NewPOI';


interface INavState { [key: string]: any }

const navSlice: any = createSlice({
    slice: 'nav',
    initialState: {
        page: MANAGETOUR,
        signUpError: "",
        signInError: "",
    },
    reducers: {
        changePage(state, action: PayloadAction<any>) {
            state.page = action.payload;
            console.log("[Change Page]: ", action.payload);
        },
        setError(state: INavState, action: PayloadAction<{ errorType: string, errorContent: string }>) {
            state[action.payload.errorType] = action.payload.errorContent;
        }
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = navSlice
// Extract and export each action creator by name
export const { changePage, setError } = actions
// Export the reducer, either as a default or named export
export default reducer
