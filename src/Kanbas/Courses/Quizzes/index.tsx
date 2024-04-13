import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaStickyNote, FaTrash  } from "react-icons/fa";
import { Quiz } from "./client";
import * as client from "./client";

export default function Quizzes() {

    const navigate = useNavigate();

    const { cid } = useParams();

    // create state variables
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [showsNewQuiz, setNewQuiz] = useState(false);

    const fetchQuizzes = async() => {
        await client.findQuizByCourseId(cid);
    }

    const handleNewQuiz = () => {

        const courseDateDefault = new Date().getDate()

        const newQuiz = {
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

    useEffect(() => {
        client.findQuizByCourseId(cid)
          .then((quizzes) => setQuizzes(quizzes)
        );
    }, [cid]);
    
    return(
        <div className="container">
            <h1>Quizzes</h1>
            <button 
                className="btn btn-primary"
                onClick={handleNewQuiz}
            >
                + Quiz
            </button>
            <ul className="list-group">
                {quizzes.map((quiz) => (
                <li className="list-group-item" key={quiz._id}>
                    <FaEllipsisV className="me-2" />
                    <FaStickyNote className="me-2 text-success" />
                    <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>{quiz.title}</Link>
                    <div className="float-end">
                    </div>
                </li>))}
            </ul>
        </div>
    )


};