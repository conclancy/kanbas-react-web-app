import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Quiz, Question } from "../client";
import * as client from "../client";

export default function QuizEditor() {

    // create state and variables
    const navigate = useNavigate();
    const { cid, qid }  = useParams<{ cid: string, qid: string }>();
    const [activeTab, setActiveTab] = useState("details");
    const [quiz, setQuiz] = useState<Quiz>(
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
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    // handle page load 
    useEffect(() => {
        client.findQuizById(qid)
          .then((quiz: Quiz) => {
            setQuiz(quiz) 
            client.findQuestionsByQuizId(quiz._id)
            .then((questions: Question[]) => {
                setQuestions(questions)
            })
        });
    }, [qid]);

    // handle quiz save 
    const handleSave = async() => {
        await client.updateQuiz(quiz).then((status) => {
          navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        });
    };

    // handle new question creation 
    const handleNewQuestion = async() => {
        
        const newQuestion = {
            quizId: quiz._id,
            questionType: "MULTI",
            title: "New Question",
            points: 0,
            question: "",
            choices: [],
            correctAnswerIndex: -1,
        }

        client.createQuestion(newQuestion).then((question) => {
            setQuestions([...questions, question]);
        })
    }

    // handle update questions
    const handleUpdateQuestion = async(question: Question) => {
        setSelectedQuestion(question);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/${question._id}`);
    }

    return(
        <div className="container">
            <h2>Quiz Editor</h2>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Quiz Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('questions')}
                    >
                        Quiz Questions
                    </button>
                </li>
            </ul>
            {activeTab === 'details' && (
                <form>
                    <div className="form-group">
                        <label htmlFor="quizTitle">Quiz Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="quizTitle" 
                            placeholder="Enter quiz title" 
                            value={quiz.title} 
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectQuizType">Quiz Type</label>
                        <select 
                            id="selectQuizType"
                            className="form-control" 
                            value={quiz.quizType}
                            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                        >
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quizPoints">Points</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="quizPoints" 
                            placeholder="0" 
                            value={quiz.points} 
                            onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) || -1 })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectAssignmentGroup">Assignment Group</label>
                        <select 
                            id="selectAssignmentGroup"
                            className="form-control" 
                            value={quiz.assignmentGroup}
                            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                        >
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Projects">Projects</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="shuffleAnswersCheck" 
                            checked={quiz.shuffleAnswers} 
                            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="shuffleAnswersCheck">
                            Shuffle Answers?
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quizTime">Time Limit</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="quizTime" 
                            placeholder="0" 
                            value={quiz.timeLimit} 
                            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || -1 })} />
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="multipleAttemptsCheck" 
                            checked={quiz.multipleAttempts} 
                            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="multipleAttemptsCheck">
                            Multiple Attempts?
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="showCorrectCheck" 
                            checked={quiz.showCorrectAnswers} 
                            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="showCorrectCheck">
                            Show Correct Answers?
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="accessCode">Access Code</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="accessCode" 
                            placeholder="(Optional) Enter access code" 
                            value={quiz.accessCode} 
                            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} 
                        />
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="oneQuestionCheck" 
                            checked={quiz.oneQuestionAtATime} 
                            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="oneQuestionCheck">
                            One Question at a Time?
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="webcamRequiredCheck" 
                            checked={quiz.webcamRequired} 
                            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="webcamRequiredCheck">
                            Webcam Required?
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="lockQuestionCheck" 
                            checked={quiz.lockQuestionsAfterAnswering} 
                            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="lockQuestionCheck">
                            Lock Questions after Answering?
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="dueDate" 
                            value={new Date (quiz.dueDate).toISOString().split('T')[0]}
                            onChange={(e) => setQuiz({ ...quiz, dueDate: new Date(e.target.value) })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableDate">Available Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="availableDate" 
                            value={new Date (quiz.availableDate).toISOString().split('T')[0]}
                            onChange={(e) => setQuiz({ ...quiz, availableDate: new Date(e.target.value) })} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="untilDate">Until Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="untilDate" 
                            value={new Date (quiz.untilDate).toISOString().split('T')[0]}
                            onChange={(e) => setQuiz({ ...quiz, untilDate: new Date(e.target.value) })} 
                        />
                    </div>
                </form>
            )}
            {activeTab === 'questions' && (
                <div>
                    <button className="btn btn-primary" onClick={handleNewQuestion}>
                        New Question
                    </button>
                    <div className="container">
                    <ul className="list-group">
                        {questions.map((question) => (
                        <li className="list-group-item" 
                            key={question._id} 
                            onClick={() => setSelectedQuestion(question)}
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                    {question._id}
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="quizTitle">Quiz Title</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="quizTitle" 
                                        placeholder="Enter quiz title" 
                                        value={question.title} 
                                        readOnly
                                        />
                            </div>
                            <button className="btn btn-secondary" onClick={ () => handleUpdateQuestion(question)}>Edit</button>
                            </div>
                        </li>))}
                    </ul>
                    </div>
                </div>
            )}
            <button
                className="btn btn-primary"
                onClick={handleSave}>
                Save
            </button>
            <button
                className="btn btn-secondary"
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)}>
                Preview
            </button>
        </div>
    )
};