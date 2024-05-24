import React, { useState, useEffect } from 'react';
import { QuizList } from '../QuizList/QuizList';
import { QuizEditor } from '../QuizEditor/QuizEditor';
import { getQuizzes, saveQuizzes } from '../../utils/storage';

export interface Question {
  id: number;
  questionText: string;
  answers: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const storedQuizzes = getQuizzes();
    setQuizzes(storedQuizzes);
  }, []);

  const addQuiz = () => {
    const newQuiz: Quiz = {
      id: Date.now(),
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

  const deleteQuiz = (quizId: number) => {
    const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updatedQuizzes);
    saveQuizzes(updatedQuizzes);
  };

  return (
    <div>
      {editingQuiz ? (
        <QuizEditor quiz={editingQuiz} saveQuiz={saveQuiz} />
      ) : (
        <div>
          <button onClick={addQuiz} className="btn">
            Add Quiz
          </button>
          <QuizList
            quizzes={quizzes}
            editQuiz={setEditingQuiz}
            deleteQuiz={deleteQuiz}
          />
        </div>
      )}
    </div>
  );
};
