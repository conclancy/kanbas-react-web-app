import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COURSES_API = `${BASE_API}/api/courses`;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export const QUESTIONS_API = `${BASE_API}/api/questions`;

// create axios object with url and credentials preset
const axiosWithCredentials = axios.create({
    withCredentials: true,
});

// create an interface for Quiz objects
export interface IQuiz { 
    _id: string; 
    title: string;
    quizType: string; 
    points: number; 
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
    courseId: string;
    published: boolean;
};

// create an interface for Quiz Questions
export interface IQuestion {
    _id: string,
    quizId: string;
    questionType: string;
    title: string;
    points: string;
    question: string;
    choices: string[];
    correctAnswerIndex: number;
}

// CREATE a new quiz
export const createQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}`, quiz);
    return response.data;
};

// GET all quizzes
export const findAllQuizes = async () => {
    const response = await axios.get(`${QUIZZES_API}/`);
    return response.data;
};

// GET a quiz by quizId 
export const findQuizById = async (id: any) => {
    console.log("finding quiz: " + id)
    const response = await axios.get(`${QUIZZES_API}/${id}`);
    return response.data;
};

// GET a quiz by quizId 
export const findQuizByCourseId = async (id: any) => {
    const response = await axios.get(`${COURSES_API}/${id}/quizzes`);
    return response.data;
};

// UPDATE a quiz
export const updateQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

// DELETE a quiz
export const deleteQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quiz._id}`);
    return response.data;
};

// CREATE a new question
export const createQuestion = async (question: any) => {
    const response = await axiosWithCredentials.post(`${QUESTIONS_API}`, question);
    return response.data;
};

// GET question by quiz id
export const findQuestionsByQuizId = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    console.log("finding questions: " + response.data)
    return response.data;
};

// GET a question by id
export const findQuestionById = async (questionId: any) => {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

// UPDATE a quiz
export const updateQuestion = async (question: any) => {
    const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

// DELETE a quiz
export const deleteQuestion = async (question: any) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${question._id}`);
    return response.data;
};