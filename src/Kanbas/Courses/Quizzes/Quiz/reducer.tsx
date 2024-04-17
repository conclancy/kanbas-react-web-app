import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../client";

// create reducer initial state with default values
interface InitialQuestionType {
    questions: IQuestion[]; // Define modules as an array of Module interfaces
    question: IQuestion;
}

// create slice and set initial state
const initialState: InitialQuestionType = {
    questions: [],
    question: {
        _id: "",
        quizId: "",
        questionType: "",
        title: "New Question",
        points: "0",
        question: "",
        choices: [],
        correctAnswerIndex: -1,
    },
};

const questionSlice = createSlice({

    // name the slice
    name: "questions",

    //set initial state 
    initialState,

    // declare reducer function
    reducers: {

        // add a new module via an action
        addQuestion: (state, action) => {

            // add action as a new module to the end of the modules state
            state.questions = [
                ...state.questions,
                action.payload,
            ];
        },

        // delete a module via an action
        deleteQuestion: (state, action) => {

            // remove the module matching the action's payload
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload
            );
        },

        // update a module via an action
        updateQuestion: (state, action) => {

            // update the module matching the action's payload
            state.questions = state.questions.map((question) => {
                if (question._id === action.payload._id) {
                return action.payload;
                } else {
                return question;
                }
            });
        },

        // set the module to edit via action payload
        setQuestion: (state, action) => {
            state.question = action.payload;
        },

        // set all of the modules
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
      
    },
});


export const { addQuestion, deleteQuestion,
  updateQuestion, setQuestion, setQuestions } = questionSlice.actions;
export default questionSlice.reducer;