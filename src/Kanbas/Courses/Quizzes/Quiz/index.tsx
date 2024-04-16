import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Routes, Route } from "react-router-dom";
import { IQuestion, IQuiz } from "../client";
import * as client from "../client";
import QuizEditor from "./Editor";
import QuestionEditor from "./QuestionEditor";
import QuizPreview from "./Preview";
import QuizDetails from "./Details";

export default function Quiz() {

    // create state and variables
    const navigate = useNavigate();
    const { cid, qid }  = useParams<{ cid: string, qid: string }>();
    const [quiz, setQuiz] = useState<IQuiz>(
        {
            _id: "",
            title: "",
            quizType: "Graded Quiz",
            points: 0,
            assignmentGroup: "Quizzes",
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            showCorrectAnswers: false,
            accessCode: "",
            oneQuestionAtATime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: new Date(),
            availableDate: new Date(),
            untilDate: new Date(),
            courseId: cid || "",
            published: false,
        }
    );
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    // handle page load 
    useEffect(() => {
        client.findQuizById(qid).then((quiz) => {
            setQuiz(quiz)
            client.findQuestionsByQuizId(quiz._id).then((questions) => {
                setQuestions(questions)
            })
        })
    }, [qid]);

    return(
        <div className="container">

            <Routes>
                <Route path="/" element={<QuizDetails quiz={quiz} />} />
                <Route path="Edit" element={<QuizEditor quizData={quiz} setParentQuiz={setQuiz}/>} />
                <Route path=":questionId/Edit" element={<QuestionEditor />} />
                <Route path="Preview" element={<QuizPreview quizData={quiz} questionData={questions} />} />
            </Routes>
        </div>
    )
};