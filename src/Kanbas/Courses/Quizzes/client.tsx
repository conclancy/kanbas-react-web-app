import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COURSES_API = `${BASE_API}/api/courses`;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;

// create axios object with url and credentials preset
const axiosWithCredentials = axios.create({
    withCredentials: true,
});

// create an interface for User
export interface Quiz { 
    _id: string; 
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
};

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
    const response = await axios.get(`${QUIZZES_API}/${id}`);
    return response.data;
};

// GET a quiz by quizId 
export const findQuizByCourseId = async (id: any) => {
    const response = await axios.get(`${COURSES_API}/${id}/quizzes`);
    return response.data;
};

// UPDATE a quiz
export const updateUser = async (quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};