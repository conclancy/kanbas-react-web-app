import { createSlice } from "@reduxjs/toolkit";

// create type interfaces since I am working in a tsx file
interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
}

interface Module {
    _id: string;
    name: string;
    description: string;
    course: string
    lessons: Lesson[];
}

// create reducer initial state with default values
interface InitialStateType {
    modules: Module[]; // Define modules as an array of Module interfaces
    module: Module;
}

// create slice and set initial state
const initialState: InitialStateType = {
    modules: [],
    module: { _id:"", name: "New Module 123", description: "New Description", course: "", lessons: [] },
};

// create slice and set initial state
const modulesSlice = createSlice({

    //name the slice
    name: "modules",

    //set initial state 
    initialState,

    // declare reducer function
    reducers: {

        // add a new module via an action
        addModule: (state, action) => {

            // add action as a new module to the begining of the modules state
            state.modules = [
                { 
                    ...action.payload, // new module is in the payload field 
                    _id: new Date().getTime().toString() // override the ID with a new timestamp
                },
                ...state.modules,
            ];
        },

        // delete a module via an action
        deleteModule: (state, action) => {

            // remove the module matching the action's payload
            state.modules = state.modules.filter(
                (module) => module._id !== action.payload
            );
        },

        // update a module via an action
        updateModule: (state, action) => {

            // update the module matching the action's payload
            state.modules = state.modules.map((module) => {
                if (module._id === action.payload._id) {
                return action.payload;
                } else {
                return module;
                }
            });
        },

        // set the module to edit via action payload
        setModule: (state, action) => {
            state.module = action.payload;
        },

        // set all of the modules
        setModules: (state, action) => {
            state.modules = action.payload;
        },
      
    },
});


export const { addModule, deleteModule,
  updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;