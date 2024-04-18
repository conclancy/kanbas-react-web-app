import React from "react";
import { useNavigate, useParams, } from "react-router-dom";
import { IQuiz } from "../../client";
import * as client from "../../client";
import { FaBan, FaCheckCircle, FaPencilAlt, FaSave, FaSearch } from "react-icons/fa";
import "../../index.css"

export default function QuizDetails({quiz}: {quiz: IQuiz}) {

    // create state and variables
    const navigate = useNavigate();
    const { cid, qid }  = useParams<{ cid: string, qid: string }>();

    const handleSave = async () => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    // handle quiz publish
    const handlePublishQuiz = (quiz: IQuiz) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        client.updateQuiz(updatedQuiz).then(() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        })
    }

    // handle quiz editing
    const handleEditQuiz = (quiz: IQuiz) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Edit`);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Quiz Details</h2>
                </div>
            </div>
            <div className="row btn-row">
                <div className="col">
                    { quiz.published === true ? (
                        <button className="btn btn-warning me-2" onClick={() => handlePublishQuiz(quiz)}>
                            <FaBan/> Unpublish
                        </button>
                    ) : (
                        <button className="btn btn-info me-2" onClick={() => handlePublishQuiz(quiz)}>
                            <FaCheckCircle /> Publish
                        </button>
                    )}
                    <button className="btn btn-success" onClick={() => handleEditQuiz(quiz)}><FaPencilAlt/> Edit</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="quizTitle">Quiz Title: </label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control-plaintext text-secondary" 
                                    id="quizTitle" 
                                    value={quiz.title} 
                                    readOnly/>
                            </div>
                        </div>
                        <div className=" row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="selectQuizType">Quiz Type: </label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control-plaintext text-secondary" 
                                    id="selectQuizType" 
                                    placeholder="Enter quiz title" 
                                    value={quiz.quizType} 
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="quizPoints">Points:</label>  
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="number" 
                                    className="form-control-plaintext text-secondary" 
                                    id="quizPoints" 
                                    value={quiz.points} 
                                    readOnly/>
                            </div>
                            
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="selectAssignmentGroup">Assignment Group:</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control-plaintext text-secondary" 
                                    id="selectAssignmentGroup" 
                                    value={quiz.assignmentGroup} 
                                    readOnly/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="shuffleAnswersCheck">Shuffle Answers:</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="shuffleAnswersCheck" 
                                    checked={quiz.shuffleAnswers} 
                                    disabled/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="quizTime">Time Limit</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="number" 
                                    className="form-control-plaintext text-secondary" 
                                    id="quizTime" 
                                    placeholder="0" 
                                    value={quiz.timeLimit} 
                                    readOnly />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="shuffleAnswersCheck">Multiple Attempts:</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="multipleAttemptsCheck" 
                                    checked={quiz.multipleAttempts} 
                                    disabled/>
                            </div>   
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="shuffleAnswersCheck">Show Correct Answers:</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="showCorrectCheck" 
                                    checked={quiz.showCorrectAnswers} 
                                    disabled/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="accessCode">Access Code:</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control-plaintext text-secondary" 
                                    id="accessCode" 
                                    placeholder="" 
                                    value={(quiz.accessCode === "" ? "[Access Code Not Set]" : quiz.accessCode)} 
                                    readOnly />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="oneQuestionCheck">One Question at a Time?</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="oneQuestionCheck" 
                                    checked={quiz.oneQuestionAtATime} 
                                    disabled />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="webcamRequiredCheck">Webcam Required?</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="webcamRequiredCheck" 
                                    checked={quiz.webcamRequired} 
                                    disabled />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="lockQuestionCheck">Lock Questions after Answering?</label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="lockQuestionCheck" 
                                    checked={quiz.lockQuestionsAfterAnswering} 
                                    disabled />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="dueDate">Due Date: </label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="date" 
                                    className="form-control-plaintext text-secondary" 
                                    id="dueDate" 
                                    value={new Date (quiz.dueDate).toISOString().split('T')[0]}
                                    readOnly />
                            </div>
                            
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="availableDate">Available Date: </label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="date" 
                                    className="form-control-plaintext text-secondary" 
                                    id="availableDate" 
                                    value={new Date (quiz.availableDate).toISOString().split('T')[0]}
                                    readOnly />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-lg-3 col-sm-4 col-form-label text-end" htmlFor="untilDate">Until Date: </label>
                            <div className="col-lg-9 col-sm-8">
                                <input 
                                    type="date" 
                                    className="form-control-plaintext text-secondary" 
                                    id="untilDate" 
                                    value={new Date (quiz.untilDate).toISOString().split('T')[0]}
                                    readOnly />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row btn-row">
                <div className="col">
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}>
                        <FaSave /> Save
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)}>
                        <FaSearch /> Preview
                    </button>
                </div>
            </div>
        </div>
    )
}