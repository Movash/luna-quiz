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
    <div className='flex flex-wrap gap-4'>
      {quizzes.map(quiz => (
        <div
          key={quiz.id}
          className="mx-auto p-4 border rounded-xl bg-slate-100 w-[300px]"
        >
          <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
          <button
            onClick={() => runQuiz(quiz)}
            className="mb-2 font-medium h-12 w-full bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
          >
            Start Quiz
          </button>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => editQuiz(quiz)}
              className="font-medium h-12 w-full bg-amber-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-amber-700"
            >
              Edit
            </button>
            <button
              onClick={() => deleteQuiz(quiz.id)}
              className="font-medium h-12 w-full bg-red-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
