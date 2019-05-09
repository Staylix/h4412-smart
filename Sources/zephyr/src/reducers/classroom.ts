import { createSlice, PayloadAction } from "redux-starter-kit";


const classroomSlice: any = createSlice({
    slice: 'classroom',
    initialState: {
        myClassrooms: [],
        currentClassroomId: "",
        classNameError: "",
        userEmailError: "",
    },
    reducers: {
        addClassroom(state, action: PayloadAction<any>) {
            // console.log("New class", action.payload)
            state.myClassrooms.push(action.payload);
        },

        initMyClassrooms(state, action: PayloadAction<any>) {
            state.myClassrooms = action.payload;
        },

        deleteClassroom(state, action: PayloadAction) {
            let classroom = state.myClassrooms.find((c) => c._id === action.payload);
            for (var i = 0; i < state.myClassrooms.length; i++) {
                if (state.myClassrooms[i]._id === classroom._id) {
                    state.myClassrooms.splice(i, 1);
                }
            }

        },
        setCurrentClassroom(state, action: PayloadAction<any>) {
            state.currentClassroomId = action.payload;
        },
        addStudentToClassroom(state, action: PayloadAction) {
            console.log("current", state.currentClassroomId);
            // console.log("class", state.myClassrooms);
            let classroomIndex = state.myClassrooms.findIndex((c) => c._id == state.currentClassroomId);
            console.log("index", classroomIndex)
            console.log(state.myClassrooms[classroomIndex])
            let classroom = state.myClassrooms[classroomIndex] as Array<any>
            classroom.push(action.payload);
            state.myClassrooms[classroomIndex] = classroom
        },
        setError(state: any, action: PayloadAction<{ errorType: string, errorContent: string }>) {
            state[action.payload.errorType] = action.payload.errorContent;
        }
    }
})

const { actions, reducer } = classroomSlice
// Extract and export each action creator by name
export const { initMyClassrooms, deleteClassroom, addClassroom, setCurrentClassroom, addStudentToClassroom, setError } = actions
// Export the reducer, either as a default or named export
export default reducer