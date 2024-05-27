import { useState, useEffect, FC } from 'react';
import { QuizList } from '../QuizList/QuizList';
import { QuizEditor } from '../QuizEditor/QuizEditor';
import { QuizRunner } from '../QuizRunner/QuizRunner';
import { getQuizzes, saveQuizzes } from '../../utils/storage';
import { nanoid } from 'nanoid';
import { QuizResult } from '../QuizResult/QuizResult';
import Loader from '../Loader/Loader';

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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      const storedQuizzes = await getQuizzes();
      setQuizzes(storedQuizzes);
      setLoading(false);
    };
    fetchQuizzes();
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
    setLoading(true);
    const updatedQuizzes = quizzes.some(q => q.id === quiz.id)
      ? quizzes.map(q => (q.id === quiz.id ? quiz : q))
      : [...quizzes, quiz];
    setQuizzes(updatedQuizzes);
    saveQuizzes(updatedQuizzes);
    setLoading(false);
    setEditingQuiz(null);
  };

  const deleteQuiz = (quizId: string) => {
    setLoading(true);
    const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updatedQuizzes);
    saveQuizzes(updatedQuizzes);
    setLoading(false);
  };

  const handleCompleteQuiz = (score: number) => {
    if (runningQuiz) {
      setCompletedQuiz(runningQuiz);
      setRunningQuiz(null);
      setQuizResult(score);
    }
  };

  const handleBackToMain = () => {
    setCompletedQuiz(null);
    setQuizResult(null);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : editingQuiz ? (
        <QuizEditor quiz={editingQuiz} saveQuiz={saveQuiz} />
      ) : runningQuiz ? (
        <QuizRunner quiz={runningQuiz} onComplete={handleCompleteQuiz} />
      ) : completedQuiz && quizResult !== null ? (
        <QuizResult
          score={quizResult}
          totalQuestions={completedQuiz.questions.length}
          onBackToMain={handleBackToMain}
        />
      ) : (
        <div>
          <button
            onClick={addQuiz}
            className="mb-8 font-medium h-12 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
          >
            Create new quiz
          </button>
          {quizzes.length === 0 ? (
            <h3 className="text-xl font-bold">
              There are currently no quizzes
            </h3>
          ) : (
            <QuizList
              quizzes={quizzes}
              editQuiz={setEditingQuiz}
              deleteQuiz={deleteQuiz}
              runQuiz={setRunningQuiz}
            />
          )}
        </div>
      )}
    </div>
  );
};
