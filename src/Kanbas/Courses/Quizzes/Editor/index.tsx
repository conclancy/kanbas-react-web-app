import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Quiz } from "../client";
import * as client from "../client";

export default function QuizEditor() {

    // create state and variables
    const navigate = useNavigate();
    const { cid, qid }  = useParams<{ cid: string, qid: string }>();
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
        }
    );

    // handle page load 
    useEffect(() => {
        client.findQuizById(qid)
          .then((quiz) =>
            setQuiz(quiz)
        );
    }, [qid]);

    const handleSave = async () => {
        await client.updateQuiz(quiz).then((status) => {
          navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        });
    };

    return(
        <div className="container">
            <h2>Quiz Editor</h2>
            <h3>Quiz ID: {quiz._id}</h3>
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
                        onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) || -1 })}  
                    />
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
            </form>
            <button
                className="btn btn-primary"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    )
};