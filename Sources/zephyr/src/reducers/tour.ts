
import { createSlice, PayloadAction } from 'redux-starter-kit'

export const TOUR_HOME = "TOUR_HOME"
export const TOUR_DISPLAY = "TOUR_DISPLAY"
export const TOUR_CREATE = "TOUR_CREATE"
export const TOUR_EDIT = "TOUR_EDIT"
export const TOUR_STEPS_EDIT = "TOUR_STEPS_EDIT"


const tourSlice: any = createSlice({
    slice: 'tour',
    initialState: {
        myTours: [],
        currentTour: "",
        tourPage: TOUR_HOME,
        poiIsLoading: false
    },
    reducers: {
        setMyTours(state, action: PayloadAction<any>) {
            state.myTours = action.payload;
        },
        addTour(state, action: PayloadAction<any>) {
            let indexTour = state.myTours.findIndex((t) => t._id == action.payload._id);
            if (indexTour != -1) {
                state.myTours[indexTour] = action.payload;
            } else {
                state.myTours.push(action.payload);
            }
        },
        setCurrentTour(state, action: PayloadAction<any>) {
            state.currentTour = action.payload;
        },
        setTourPage(state, action: PayloadAction<any>) {
            state.tourPage = action.payload;
        },
        setPoiIsLoading(state, action: PayloadAction<any>) {
            state.poiIsLoading = action.payload;
        },
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = tourSlice
// Extract and export each action creator by name
export const { setMyTours, setCurrentTour, setTourPage, setPoiIsLoading, addTour } = actions
// Export the reducer, either as a default or named export
export default reducer
