import { Quiz } from '../components/QuizManager/QuizManager';

const QUIZZES_KEY = 'quizzes';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getQuizzes = async (): Promise<Quiz[]> => {
  await delay(500);
  const quizzesState = localStorage.getItem(QUIZZES_KEY);
  return quizzesState ? JSON.parse(quizzesState) : [];
};

export const saveQuizzes = async (quizzes: Quiz[]): Promise<void> => {
  await delay(500);
  const quizzesState = JSON.stringify(quizzes);
  localStorage.setItem(QUIZZES_KEY, quizzesState);
};
