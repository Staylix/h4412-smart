import { createSlice, PayloadAction } from 'redux-starter-kit';
import { IStep } from '../models/step';
import { v4 as uuid } from 'uuid';
import { Quizz } from '../models/quizz';

const initialState = {
    editingTour: {
        name: '',
        idsStep: [],
        description: '',
        idAuthor: null,
        isPublic: true,
        duration: 0,
        dates: null
    },
    isEditing: true,
    focusedPoI: null,
    keyword: null,
    center: [4.836324, 45.764052],
    zoom: 12,
    focusedStep: null,
    quizzLoaded: false,
    focusedStepChanging: false,
}

const editTourSlice: any = createSlice({
    slice: 'editTour',
    initialState: initialState,
    reducers: {
        setEditingTour(state, action: PayloadAction<any>) {
            state.editingTour = action.payload
        },
        setIsEditing(state, action: PayloadAction<any>) {
            state.isEditing = action.payload
        },
        resetEditingTour(state, action: PayloadAction<any>) {
            console.log("RESET")
            state = initialState;
            return state;
        },
        addStep(state, action: PayloadAction<any>) {
            let step: IStep = {
                _id: uuid(),
                idPoi: action.payload, // JSON.parse(JSON.stringify(
                idQuizz: JSON.parse(JSON.stringify(new Quizz())),
                comment: "",
            }
            // TODO: check if already there
            state.editingTour.idsStep.push(step);
            return state;
        },
        setValue(state, action: PayloadAction<any>) {
            state.editingTour[action.payload.type] = action.payload.value;
            return state;
        },
        setStepValue(state, action: PayloadAction<any>) {
            let newStep = action.payload.step
            const index = state.editingTour.idsStep.findIndex((s) => s._id == newStep._id);
            newStep[action.payload.type] = action.payload.value;
            state.editingTour.idsStep[index] = newStep;
            return state;
        },
        setStepCommentValue(state, action: PayloadAction<any>) {
            const index = state.editingTour.idsStep.findIndex((s) => s._id == state.focusedStep._id);
            state.focusedStep[action.payload.type] = action.payload.value;
            state.editingTour.idsStep[index] = state.focusedStep;
            return state;
        },
        setQuizzValue(state, action: PayloadAction<any>) {
            const index = state.editingTour.idsStep.findIndex((s) => s._id == state.focusedStep._id);
            state.focusedStep.idQuizz[action.payload.type] = action.payload.value;
            state.editingTour.idsStep[index] = state.focusedStep;
            return state;
        },
        setQuizzResponseValue(state, action: PayloadAction<any>) {
            const index = state.editingTour.idsStep.findIndex((s) => s._id == state.focusedStep._id);
            state.focusedStep.idQuizz.responses[action.payload.index] = action.payload.value;
            state.editingTour.idsStep[index] = state.focusedStep;
            return state;
        },
        // Used to order step
        shiftStepLeft(state, action: PayloadAction<any>) {
            let index = state.editingTour.idsStep.findIndex((s) => s._id == action.payload._id);
            let ordered = state.editingTour.idsStep.slice();
            if (index !== 0) {
                ordered[index] = state.editingTour.idsStep[index - 1];
                ordered[index - 1] = state.editingTour.idsStep[index];
            }
            state.editingTour.idsStep = ordered;
            return state;
        },

        shiftStepRight(state, action: PayloadAction<any>) {
            let index = state.editingTour.idsStep.findIndex((s) => s._id == action.payload._id);
            let ordered = state.editingTour.idsStep.slice();
            if (index !== state.editingTour.idsStep.length - 1) {
                ordered[index] = state.editingTour.idsStep[index + 1];
                ordered[index + 1] = state.editingTour.idsStep[index];
            }
            state.editingTour.idsStep = ordered;
            return state;
        },

        removeStep(state, action: PayloadAction<any>) {
            let index = state.editingTour.idsStep.findIndex((s) => s._id == action.payload._id);
            state.editingTour.idsStep.splice(index, 1);
            return state;
        },

        editStep(state, action: PayloadAction<any>) {
            const index = state.editingTour.idsStep.findIndex((s) => s._id == action.payload._id);
            state.editingTour.idsStep[index] = action.payload
            return state;
        },

        submitTour(state, action: PayloadAction<any>) {

        },
        onPOIFocus(state, action: PayloadAction<any>) {
            state.focusedPoI = action.payload;
            state.center = [action.payload.position.longitude, action.payload.position.latitude];
            state.zoom = 14;
            return state;
        },
        onStepFocus(state, action: PayloadAction<any>) {
            state.focusedStep = action.payload;
            state.quizzLoaded = false;
            state.focusedStepChanging = true
            return state;
        },
        changeQuizzLoaded(state, action: PayloadAction<any>) {
            state.quizzLoaded = action.payload;
            return state;
        },
        changeFocusedStepChanging(state, action: PayloadAction<any>) {
            state.focusedStepChanging = action.payload;
            return state;
        },
        setKeyword(state, action: PayloadAction<any>) {
            state.keyword = action.payload;
            return state;
        }
    }
})
const { actions, reducer } = editTourSlice;
// Extract and export each action creator by name
export const {
    setEditingTour,
    setIsEditing,
    resetEditingTour,
    addStep,
    setValue,
    setStepValue,
    setStepCommentValue,
    setQuizzValue,
    setQuizzResponseValue,
    shiftStepLeft,
    shiftStepRight,
    removeStep,
    editStep,
    submitTour,
    onPOIFocus,
    onStepFocus,
    changeQuizzLoaded,
    changeFocusedStepChanging,
    setKeyword,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
