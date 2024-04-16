import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IQuiz, IQuestion } from "../../client";

export default function QuizPreview({quizData, questionData}: {quizData: IQuiz, questionData: IQuestion[]}) {

    const navigate = useNavigate();
    const { cid, qid, } = useParams<{ cid: string, qid: string, }>();
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

    return (
        <div className="container">
            <h2>Preview Quiz: {quizData.title}</h2>
            <div className="card">
                <div className="card-body">
                    {questionData !== null && (
                        <div className="container">
                            <div className="row">
                                <div className="col-10">
                                    <h3>Question {selectedQuestion + 1}</h3>
                                </div>
                                <div className="col-2">
                                    <h4>{questionData[selectedQuestion].points} pts</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>{questionData[selectedQuestion].question}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {questionData[selectedQuestion].choices.map((choice, index) => (
                                        <div key={index} className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id={`choice${index}`}
                                                name="choice"
                                                value={choice}
                                                checked={questionData[selectedQuestion].correctAnswerIndex === index}
                                                readOnly
                                            />
                                            <label htmlFor={`choice${index}`}>{choice}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>   
                        </div>
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
                    disabled={selectedQuestion === null || selectedQuestion === questionData.length - 1}
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