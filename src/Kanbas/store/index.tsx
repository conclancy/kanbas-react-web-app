import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/reducer"

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  }
}

// add reducers to the store
const store = configureStore({
  reducer: {
    modulesReducer, 
    assignmentsReducer,
  }
});


export default store;