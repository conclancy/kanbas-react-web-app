import { createSlice } from "@reduxjs/toolkit";

// create assignment interface since working in tsx
interface Assignment {
    _id: string;
    title: string;
    course: string
}

// create reducer initial state with default values
interface InitialStateType {
    assignments: Assignment[]; // Define modules as an array of Module interfaces
    assignment: Assignment;
}

// create reducer initial state with default values
const initialState: InitialStateType = {
  assignments: [],
  assignment: { _id:"", course: "AA123", title: "New Assignment", },
};

// create slice and set initial state
const assignmentsSlice = createSlice({

    // name the slice
    name: "assignments",

    // set initial state 
    initialState,

    // declare reducer function
    reducers: {

        // add a new assignment via an action
        addAssignment: (state, action) => {

            // add action as a new assignment to the begining of the assignment state
            state.assignments = [
                { 
                    ...action.payload, // new assignment is in the payload field 
                },
                ...state.assignments,
            ];

        },

        // delete a assignment via an action
        deleteAssignment: (state, action) => {

            // remove the assignment matching the action's payload
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },

        // update a assignment via an action
        updateAssignment: (state, action) => {

            // update the assignment matching the action's payload
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                return action.payload;
                } else {
                return assignment;
                }
            });
        },

        // set the assignment to edit via action payload
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },

        // set the assignments variables 
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        }
    },
});


export const { addAssignment, deleteAssignment,
  updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;