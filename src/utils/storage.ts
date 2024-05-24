import { Quiz } from '../components/QuizManager/QuizManager';

const QUIZZES_KEY = 'quizzes';

export const getQuizzes = (): Quiz[] => {
  const quizzesState = localStorage.getItem(QUIZZES_KEY);
  return quizzesState ? JSON.parse(quizzesState) : [];
};

export const saveQuizzes = (quizzes: Quiz[]): void => {
  const quizzesState = JSON.stringify(quizzes);
  localStorage.setItem(QUIZZES_KEY, quizzesState);
};
