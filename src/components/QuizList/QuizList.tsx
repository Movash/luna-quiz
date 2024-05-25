import { FC } from 'react';
import { Quiz } from '../QuizManager/QuizManager';

interface QuizListProps {
  quizzes: Quiz[];
  editQuiz: (quiz: Quiz) => void;
  deleteQuiz: (quizId: string) => void;
  runQuiz: (quiz: Quiz) => void;
}

export const QuizList: FC<QuizListProps> = ({
  quizzes,
  editQuiz,
  deleteQuiz,
  runQuiz,
}) => {
  return (
    <div>
      {quizzes.map(quiz => (
        <div key={quiz.id} className="quiz-item">
          <h2>{quiz.title}</h2>
          <button
            onClick={() => editQuiz(quiz)}
            className="font-medium h-12 w-24 bg-amber-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-amber-700"
          >
            Edit
          </button>
          <button
            onClick={() => deleteQuiz(quiz.id)}
            className="font-medium h-12 w-24 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => runQuiz(quiz)}
            className="font-medium h-12 w-24 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
};
