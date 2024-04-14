import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaStickyNote, FaTrash  } from "react-icons/fa";
import { Quiz } from "./client";
import * as client from "./client";

export default function Quizzes() {

    const navigate = useNavigate();
    const { cid } = useParams();

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
        }

        // call the client createAssignment function 
        client.createQuiz(newQuiz).then((q) => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${q._id}`);
        });
    };

    // handle quiz editing
    const handleEditQuiz = (quiz: Quiz) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    // handle quiz deletion
    const handleDeleteQuiz = (quiz: Quiz) => {
        client.deleteQuiz(quiz).then(() => {
            setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
        });
    };

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
                        <li className="list-group-item" key={quiz._id}>
                            <FaEllipsisV className="me-2" onClick={() => toggleMenu(quiz)}/>
                            <FaStickyNote className="me-2 text-success" />
                            <Link
                                to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>{quiz.title}</Link>
                            {menuVisible && selectedQuiz === quiz && (
                                        <div className="ms-auto">
                                            <button className="btn btn-sm btn-success me-2" onClick={() => handleEditQuiz(quiz)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteQuiz(quiz)}>
                                                Delete
                                            </button>
                                        </div>
                            )}
                        </li>))}
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