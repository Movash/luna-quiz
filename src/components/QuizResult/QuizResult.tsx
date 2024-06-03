import { FC } from 'react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onBackToMain: () => void;
}

export const QuizResult: FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onBackToMain,
}) => {
  return (
    <div className="quiz-result">
      <h2 className="text-xl font-bold mb-8">
        Quiz Completed! Your Score: {score} / {totalQuestions}
      </h2>
      <button
        onClick={onBackToMain}
        className="font-medium h-12 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
      >
        Back to Main
      </button>
    </div>
  );
};
