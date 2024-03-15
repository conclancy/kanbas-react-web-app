import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
}

// add reducers to the store
const store = configureStore({
  reducer: {
    modulesReducer
  }
});


export default store;