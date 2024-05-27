import { useState, useEffect, FC } from 'react';
import { QuizList } from '../QuizList/QuizList';
import { QuizEditor } from '../QuizEditor/QuizEditor';
import { QuizRunner } from '../QuizRunner/QuizRunner';
import { getQuizzes, saveQuizzes } from '../../utils/storage';
import { nanoid } from 'nanoid';

export interface Question {
  id: string;
  questionText: string;
  answers: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export const QuizManager: FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [runningQuiz, setRunningQuiz] = useState<Quiz | null>(null);
  const [completedQuiz, setCompletedQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<number | null>(null);

  useEffect(() => {
    const storedQuizzes = getQuizzes();
    setQuizzes(storedQuizzes);
  }, []);

  const addQuiz = () => {
    const newQuiz: Quiz = {
      id: nanoid(),
      title: '',
      questions: [],
    };
    setEditingQuiz(newQuiz);
  };

  const saveQuiz = (quiz: Quiz) => {
    const updatedQuizzes = quizzes.some(q => q.id === quiz.id)
      ? quizzes.map(q => (q.id === quiz.id ? quiz : q))
      : [...quizzes, quiz];
    setQuizzes(updatedQuizzes);
    saveQuizzes(updatedQuizzes);
    setEditingQuiz(null);
  };

  const deleteQuiz = (quizId: string) => {
    const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updatedQuizzes);
    saveQuizzes(updatedQuizzes);
  };

  const handleCompleteQuiz = (score: number) => {
    if (runningQuiz) {
      setCompletedQuiz(runningQuiz);
      setRunningQuiz(null);
      setQuizResult(score);
    }
  };

  return (
    <div>
      {editingQuiz ? (
        <QuizEditor quiz={editingQuiz} saveQuiz={saveQuiz} />
      ) : runningQuiz ? (
        <QuizRunner quiz={runningQuiz} onComplete={handleCompleteQuiz} />
      ) : (
        <div>
          <button
            onClick={addQuiz}
            className="mb-8 font-medium h-12 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
          >
            Create new quiz
          </button>
          {quizzes.length === 0 ? (
            <div>There are currently no quizzes</div>
          ) : (
            <QuizList
              quizzes={quizzes}
              editQuiz={setEditingQuiz}
              deleteQuiz={deleteQuiz}
              runQuiz={setRunningQuiz}
            />
          )}
          {quizResult !== null && completedQuiz && (
            <div className="mt-4">
              <h3>
                Quiz Completed! Your Score: {quizResult} /{' '}
                {completedQuiz.questions.length}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
