import React, { useState, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IQuestion } from "../../client";
import * as client from "../../client";
import {
    addQuestion, 
    deleteQuestion,
    updateQuestion,
    setQuestion,
    setQuestions,
} from "../reducer"
import { KanbasState } from "../../../../store";

export default function QuestionEditor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cid, qid, questionId } = useParams<{ cid: string, qid: string, questionId: string }>();
    const questions = useSelector((state: KanbasState) => state.questionsReducer.questions)
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);

    // handles changes to quiz fields 
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(setQuestion({ ...question, [name]: value }));
    };

    // add choice
    const handleAddChoice = () => {
        const updatedChoices = [...question.choices, ""];
        dispatch(setQuestion({ ...question, choices: updatedChoices }));
    };

    // remove choice
     const handleRemoveChoice = (index: number) => {
        const updatedChoices = question.choices.filter((_:any, i: number) => i !== index);
        dispatch(setQuestion({ ...question, choices: updatedChoices }));
    };

    // handle selecting correct answer
     const handleSelectCorrectAnswer = (index: number) => {
        dispatch(setQuestion({ ...question, correctAnswerIndex: index }));
    };

    // handle select question type
    const handleChangeQuestionType =(e: string) => {
        const selectedQuestionType = e;
        let updatedChoices: string[] = [];

        // prompt the user to confirm if choices data will be deleted
        if (question.choices.length > 0 && selectedQuestionType !== question.questionType) {
            const confirmed = window.confirm("Changing the question type will clear the current choices list. Are you sure you want to proceed?");
            if (!confirmed) {
                // if the user cancels, don't update the question type
                return;
            }
        }

        // logic to reset choices when question is changed
        if (selectedQuestionType === question.questionType) {
            // don't clear questions if the type is unchanged
            updatedChoices = question.choices;
        } else if (selectedQuestionType === "TRUEFALSE") {
            // automatically add True/False answers
            updatedChoices = ["True", "False"]
        } else {
            // clear the list when going to MULTI or BLANKS
            updatedChoices = [];
        }

        dispatch(setQuestion({
            ...question,
            questionType: selectedQuestionType,
            choices: updatedChoices, 
            correctAnswerIndex: -1
        }));
    }

    // handles saving quiz 
    const handleSubmit = async () => {
        
        console.log("Handling Submit for " + question._id)

        await client.updateQuestion(question).then((status) => {
            
            // update questions state
            const updatedQuestions = questions.map((q) =>
                q._id === question._id ? question : q
            );
            dispatch(setQuestions(updatedQuestions));

            // navigate back to the quiz editor
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
        });
    };


    return (
        <div className="container">
            <h2>Edit Question</h2>
            <form>
                <div className="row form-group">
                    <label htmlFor="selectQuestionType">Question Type</label>
                    <select 
                        id="selectQuestionType"
                        className="form-control" 
                        value={question.questionType}
                        onChange={(e) => handleChangeQuestionType(e.target.value)}
                    >
                        <option value="MULTI">Multiple Choice</option>
                        <option value="TRUEFALSE">True / False</option>
                        <option value="BLANKS">Fill in the Blank</option>
                    </select>
                </div>
                <div className="row form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control" 
                        id="title"
                        name="title"
                        value={question.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="row form-group">
                    <label htmlFor="question">Question:</label>
                    <textarea
                        className="form-control" 
                        id="question"
                        name="question"
                        value={question.question}
                        onChange={handleChange}
                    />
                </div>
                <div className="row form-group">
                    <label htmlFor="points">Points:</label>
                    <input
                        type="text"
                        className="form-control" 
                        id="points"
                        name="points"
                        value={question.points}
                        onChange={handleChange}
                    />
                </div>
                <div className="row form-group">
                    <label>Choice List</label>     
                    <ul className="list-group">
                        {question.choices.map((choice: any, index: number) => (
                            <li className="list-group-item" key={index}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="choice" 
                                                placeholder="Insert answer here"
                                                value={choice}
                                                onChange={(e) => {
                                                    const updatedChoices = [...question.choices];
                                                    updatedChoices[index] = e.target.value;
                                                    dispatch(setQuestion({ ...question, choices: updatedChoices }));
                                                }}
                                            />
                                        </div>
                                        {question.questionType !== "BLANKS" && (
                                            <div className="col-2 form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id={`correct${index}`}
                                                    name="correctAnswer"
                                                    checked={question.correctAnswerIndex === index}
                                                    onChange={() => handleSelectCorrectAnswer(index)}
                                                />
                                                <label className="form-check-label" htmlFor={`correct${index}`}>Correct?</label>
                                            </div>
                                        )}
                                        <div className="col-2">
                                            <button className="btn btn-danger" onClick={() => handleRemoveChoice(index)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    <button className="btn btn-success me-2" onClick={handleAddChoice}>Add Choice</button>
                </div>
            </div>
            
        </div>
    );
}
