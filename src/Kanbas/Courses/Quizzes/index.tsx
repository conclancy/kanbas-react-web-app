import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "./client";
import * as client from "./client";

export default function Quizzes() {

    const navigate = useNavigate();

    const { cid } = useParams();

    // create state variables
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quiz, setQuiz] = useState<Quiz>();

    const fetchQuizzes = async() => {
        await client.findQuizByCourseId(cid);
    }

    useEffect(() => {
        client.findQuizByCourseId(cid)
          .then((quizzes) => setQuizzes(quizzes)
        );
    }, [cid]);
    
    return(
        <div className="container">
            <h1>Quizzes</h1>
        </div>
    )


};