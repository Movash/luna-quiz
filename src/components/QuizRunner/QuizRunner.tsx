import React, { useState } from 'react';
import { Quiz } from '../QuizManager/QuizManager';

interface QuizRunnerProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onComplete }) => {
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
    <div>
      <h2>{quiz.title}</h2>
      {currentQuestion ? (
        <div>
          <h3>{currentQuestion.questionText}</h3>
          {currentQuestion.answers.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={selectedAnswers[currentQuestionIndex] === index}
                onChange={() => handleAnswerSelect(index)}
              />
              {answer}
            </div>
          ))}
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button onClick={handleNextQuestion} className="btn">
              Next
            </button>
          ) : (
            <button onClick={handleFinishQuiz} className="btn">
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
