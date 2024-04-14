import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBan, FaCalendar, FaCheckCircle, FaEllipsisV, FaPlusCircle, FaRocket, FaStickyNote, FaTrash  } from "react-icons/fa";
import { Quiz } from "./client";
import * as client from "./client";

export default function Quizzes() {

    const navigate = useNavigate();
    const { cid } = useParams();
    const currentDate = new Date();

    // state
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizzesExist, setQuizzesExist] = useState<boolean>(false);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const handleNewQuiz = () => {

        const courseDateDefault = new Date().getDate()

        const newQuiz = {
            title: "New Quiz",
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
            dueDate: courseDateDefault,
            availableDate: courseDateDefault,
            untilDate: courseDateDefault,
            courseId: cid,
            published: false, 
        }

        // call the client createAssignment function 
        client.createQuiz(newQuiz).then((q) => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${q._id}/Edit`);
        });
    };

    // handle quiz editing
    const handleEditQuiz = (quiz: Quiz) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Edit`);
    };

    // handle quiz deletion
    const handleDeleteQuiz = (quiz: Quiz) => {
        client.deleteQuiz(quiz).then(() => {
            setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
        });
    };

    // handle quiz publish
    const handlePublishQuiz = (quiz: Quiz) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        client.updateQuiz(updatedQuiz).then(() => {
            setQuizzes(prevQuizzes => prevQuizzes
                .map(q => q._id === updatedQuiz._id ? updatedQuiz : q));
            setMenuVisible(!menuVisible);
        })
    }

    // set state for quiz menu
    const toggleMenu = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setMenuVisible(!menuVisible);
    };

    // load quizzes when page loads
    useEffect(() => {
        client.findQuizByCourseId(cid)
          .then((quizzes) => setQuizzes(quizzes)
        );
    }, [cid]);

    // if there are no quizzes, update state
    useEffect(() => {
        const quizzesExist = quizzes.length > 0;
        setQuizzesExist(quizzesExist);
    }, [quizzes]);

    
    return(
        <div className="container">
            <h1>Quizzes</h1>
            <button className="btn btn-primary" onClick={handleNewQuiz}>
                + Quiz
            </button>
            {quizzesExist ? (
                <div className="container">
                    <ul className="list-group">
                        {quizzes.map((quiz) => (
                            <li className="list-group-item d-flex align-items-center" key={quiz._id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-1">
                                            <FaEllipsisV className="me-2" onClick={() => toggleMenu(quiz)}/>
                                        </div>
                                        <div className="col-11">
                                            <div className="row">
                                                <div className="col-11"> 
                                                    { quiz.published === true ? (
                                                            <FaRocket className="me-2 text-success" />
                                                        ) : (
                                                            <FaRocket className="me-2 text-secondary" />
                                                    )}
                                                    
                                                    <Link className="me-auto" to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>{quiz.title}</Link>
                                                </div>
                                                <div className="col-1">
                                                    { quiz.published === true ? (
                                                                <FaCheckCircle className="text-success"/>
                                                            ) : (
                                                                <FaBan className="text-danger"/>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                {new Date(quiz.availableDate) > currentDate ? (
                                                        ("Not available until " + new Date(quiz.availableDate).toLocaleDateString())
                                                    ) : new Date(quiz.dueDate) > currentDate ? (
                                                        "Available"
                                                    ) : (
                                                        "Closed"
                                                )}
                                                </div>
                                                <div className="col-4">
                                                    <FaCalendar className="text-secondary"/>
                                                    {" Due Date: " + new Date(quiz.dueDate).toLocaleDateString()}
                                                </div>
                                                <div className="col-4">
                                                    {quiz.points + " pts" + " | 0 Questions"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                {menuVisible && selectedQuiz === quiz && (
                                                    <div className="ms-auto">
                                                        <button className="btn btn-sm btn-success me-2" onClick={() => handleEditQuiz(quiz)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteQuiz(quiz)}>
                                                            Delete
                                                        </button>
                                                        { quiz.published === true ? (
                                                                <button className="btn btn-sm btn-warning me-2" onClick={() => handlePublishQuiz(quiz)}>
                                                                    Unpublish
                                                                </button>
                                                            ) : (
                                                                <button className="btn btn-sm btn-info me-2" onClick={() => handlePublishQuiz(quiz)}>
                                                                    Publish
                                                                </button>
                                                        )}
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="alert alert-secondary" role="alert">
                    Press the "+Quiz" button to get started
                </div>
            )}
            
        </div>
    )
};