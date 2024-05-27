import { FC, useState } from 'react';
import { Quiz } from '../QuizManager/QuizManager';

interface QuizRunnerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
}

export const QuizRunner: FC<QuizRunnerProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = () => {
    const score = selectedAnswers.reduce(
      (score, answerIndex, questionIndex) => {
        if (quiz.questions[questionIndex].correctAnswerIndex === answerIndex) {
          return score + 1;
        }
        return score;
      },
      0
    );
    onComplete(score);
  };

  return (
    <div className="mx-auto flex flex-col gap-2 p-4 border rounded-xl bg-slate-100 w-[500px]">
      <p className="absolute">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>
      <h2 className="font-medium text-xl">{quiz.title}</h2>
      {currentQuestion ? (
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-medium text-lg">
            {currentQuestion.questionText}
          </h3>
          <div className="w-full">
            {currentQuestion.answers.map((answer, index) => (
              <div
                key={index}
                className="bg-violet-300 flex m-1 p-2 border rounded-xl transition duration-300 ease-in-out transform hover:bg-amber-500"
                onClick={() => handleAnswerSelect(index)}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={selectedAnswers[currentQuestionIndex] === index}
                  onChange={e => {
                    e.stopPropagation();
                    handleAnswerSelect(index);
                  }}
                  className="mr-2"
                />
                <p className="text-lg">{answer}</p>
              </div>
            ))}
          </div>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="font-medium h-10 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              className="font-medium h-10 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
            >
              Finish
            </button>
          )}
        </div>
      ) : (
        <div>Quiz completed</div>
      )}
    </div>
  );
};
