import produce from 'immer'

const TOURS_HEAD_LIST_LOADED = 'TOURS_HEAD_LIST_LOADED'
const STEP_LOADED = 'STEP_LOADED'
const TOGGLE_STEP = 'TOGGLE_STEP'
const STEP_UNMOUNT = 'STEP_UNMOUNT'

export function toursHeadListLoaded(tours) {
    return {
        type: TOURS_HEAD_LIST_LOADED,
        payload: { tours }
    }
}
export function stepLoaded(step) {
    return {
        type: STEP_LOADED,
        payload: { step }
    }
}

export function toggleStep() {
    // console.log("toggleStep")
    return {
        type: TOGGLE_STEP,
        payload: { }
    }
}
export function stepUnmount() {
    return {
        type: STEP_UNMOUNT,
        payload: { }
    }
}

const initialState = {
    tours: [],
    idCurrentStep: -1
}

export default function tourReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case TOURS_HEAD_LIST_LOADED:
            nextState = {
                ...state,
                tours: action.payload.tours
            }
            return nextState

        case STEP_LOADED:
            nextState = produce(state, draft => {
                draft.steps[action.payload.step.id] = action.payload.step;
                draft.idCurrentStep = action.payload.step.id
            })
            return nextState

        case TOGGLE_STEP:
            nextState = produce(state, draft => {
                draft.steps[state.idCurrentStep].completed = !state.steps[state.idCurrentStep].completed;
            })
            return nextState

        case STEP_UNMOUNT:
            nextState = produce(state, draft => {
                draft.idCurrentStep = -1;
            })
            return nextState

        default:
            return state
    }
}
