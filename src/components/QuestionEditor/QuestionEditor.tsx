import React from 'react';
import { Question } from '../QuizManager/QuizManager';

interface QuestionEditorProps {
  question: Question;
  onChange: (question: Question) => void;
  onDelete: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onChange,
  onDelete,
}) => {
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...question, questionText: e.target.value });
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const updatedAnswers = question.answers.map((a, i) =>
      i === index ? answer : a
    );
    onChange({ ...question, answers: updatedAnswers });
  };

  const addAnswer = () => {
    onChange({ ...question, answers: [...question.answers, ''] });
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = question.answers.filter((_, i) => i !== index);
    onChange({ ...question, answers: updatedAnswers });
  };

  const handleCorrectAnswerChange = (index: number) => {
    onChange({ ...question, correctAnswerIndex: index });
  };

  return (
    <div>
      <input
        type="text"
        value={question.questionText}
        onChange={handleQuestionTextChange}
        placeholder="Question Text"
        className="input"
      />
      {question.answers.map((answer, index) => (
        <div key={index}>
          <input
            type="text"
            value={answer}
            onChange={e => handleAnswerChange(index, e.target.value)}
            placeholder="Answer"
            className="input"
          />
          <button onClick={() => removeAnswer(index)} className="btn">
            Remove Answer
          </button>
          <input
            type="radio"
            checked={question.correctAnswerIndex === index}
            onChange={() => handleCorrectAnswerChange(index)}
          />{' '}
          Correct
        </div>
      ))}
      <button onClick={addAnswer} className="btn">
        Add Answer
      </button>
      <button onClick={onDelete} className="btn">
        Delete Question
      </button>
    </div>
  );
};
