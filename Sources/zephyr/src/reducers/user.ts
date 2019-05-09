import { createSlice, PayloadAction } from 'redux-starter-kit'
import { IUser } from '../api/user'

const userSlice: any = createSlice({
    slice: 'user',
    initialState: {
        user: {},
        dashboard: {
            data : {},
            classrooms: [],
            classroom: {},
            tour: {},
        }
    },
    reducers: {
        setUserState(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setData(state, action: PayloadAction<any>) {
            state.dashboard[action.payload.type] = action.payload.value;
        }
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice
// Extract and export each action creator by name
export const { setUserState, setData } = actions
// Export the reducer, either as a default or named export
export default reducer
