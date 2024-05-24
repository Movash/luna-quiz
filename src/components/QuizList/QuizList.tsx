import React from 'react';
import { Quiz } from '../QuizManager/QuizManager';

interface QuizListProps {
  quizzes: Quiz[];
  editQuiz: (quiz: Quiz) => void;
  deleteQuiz: (quizId: number) => void;
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  editQuiz,
  deleteQuiz,
}) => {
  return (
    <div>
      {quizzes.map(quiz => (
        <div key={quiz.id} className="quiz-item">
          <h2>{quiz.title}</h2>
          <button onClick={() => editQuiz(quiz)} className="btn">
            Edit
          </button>
          <button onClick={() => deleteQuiz(quiz.id)} className="btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
