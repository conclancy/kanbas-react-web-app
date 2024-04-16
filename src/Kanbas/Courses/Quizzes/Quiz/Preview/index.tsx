import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IQuiz, IQuestion } from "../../client";
import * as client from "../../client";

export default function QuizPreview({quizData, questionData}: {quizData: IQuiz, questionData: IQuestion[]}) {

    const navigate = useNavigate();
    const { cid, qid, } = useParams<{ cid: string, qid: string, }>();

    console.log(quizData);
    console.log(questionData);

    const [quiz, setQuiz] = useState<IQuiz>(quizData);

    const [questions, setQuestions] = useState<IQuestion[]>(questionData);
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

    

    return (
        <div className="container">
            <h2>Preview Quiz: {quiz.title}</h2>
            <div className="card">
                <div className="card-body">
                    {questions !== null && (
                        <>
                            <h3>Question {selectedQuestion + 1}</h3>
                            <p>{questions[selectedQuestion].question}</p>
                            {questions[selectedQuestion].choices.map((choice, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        id={`choice${index}`}
                                        name="choice"
                                        value={choice}
                                        checked={questions[selectedQuestion].correctAnswerIndex === index}
                                        readOnly
                                    />
                                    <label htmlFor={`choice${index}`}>{choice}</label>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="btn-group mt-3" role="group" aria-label="Question Navigation">
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={selectedQuestion === null || selectedQuestion === 0}
                    onClick={() => {setSelectedQuestion(selectedQuestion - 1)}}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={selectedQuestion === null || selectedQuestion === questions.length - 1}
                    onClick={() => {setSelectedQuestion(selectedQuestion + 1)}}
                >
                    Next
                </button>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`)}
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}