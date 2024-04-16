import React from "react";
import { Route, Routes } from "react-router-dom";
import Quiz from "./Quiz";
import QuizList from "./List";

export default function Quizzes() {
    
    return(
        <div className="container">
            <Routes>
                <Route path="/" element={<QuizList />} />
                <Route path=":qid/*" element={<Quiz />} />
            </Routes>
        </div>
    )
};