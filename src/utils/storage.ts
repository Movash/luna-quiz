import { Quiz } from '../components/QuizManager/QuizManager';

const QUIZZES_KEY = 'quizzes';

export const getQuizzes = (): Quiz[] => {
  const quizzes = localStorage.getItem(QUIZZES_KEY);
  return quizzes ? JSON.parse(quizzes) : [];
};

export const saveQuizzes = (quizzes: Quiz[]): void => {
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
};
