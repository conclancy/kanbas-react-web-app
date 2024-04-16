import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate, useParams, Navigate, useLocation } from "react-router-dom";

import { Quiz } from "./client";
import * as client from "./client";
import QuizDetails from "./Details";
import QuizEditor from "./Editor";
import QuestionEditor from "./QuestionEditor";
import QuizPreview from "./Preview";
import QuizList from "./List";

export default function Quizzes() {
    
    return(
        <div className="container">
            <Routes>
                <Route path="/" element={<QuizList />} />
                <Route path=":qid" element={<QuizDetails />} />
                <Route path=":qid/Edit" element={<QuizEditor />} />
                <Route path=":qid/:questionId/Edit" element={<QuestionEditor />} />
                <Route path=":qid/Preview" element={<QuizPreview />} />
            </Routes>
        </div>
    )
};