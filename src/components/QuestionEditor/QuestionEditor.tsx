import { ChangeEvent, FC } from 'react';
import { Question } from '../QuizManager/QuizManager';
import sprite from '../../assets/icons/sprite.svg';

interface QuestionEditorProps {
  question: Question;
  questionNumber: number;
  onChange: (question: Question) => void;
  onDelete: () => void;
}

export const QuestionEditor: FC<QuestionEditorProps> = ({
  question,
  questionNumber,
  onChange,
  onDelete,
}) => {
  const handleQuestionTextChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <li className="flex flex-col gap-4 p-4 border rounded-xl bg-slate-100 w-[500px]">
      <h2 className="font-medium text-xl">Question {questionNumber}</h2>
      <input
        type="text"
        value={question.questionText}
        onChange={handleQuestionTextChange}
        placeholder="Question Text"
        className="h-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 cursor-pointer"
      />
      <div className="flex flex-col gap-1">
        {question.answers.map((answer, index) => (
          <div key={index} className="relative flex items-center">
            <input
              type="radio"
              checked={question.correctAnswerIndex === index}
              onChange={() => handleCorrectAnswerChange(index)}
              className="absolute left-2"
            />
            <input
              type="text"
              value={answer}
              onChange={e => handleAnswerChange(index, e.target.value)}
              placeholder="Answer"
              className="h-10 block w-full px-3 py-2 pl-7 pr-9 border border-gray-300 rounded-md shadow-sm transition focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 cursor-pointer"
            />
            <button
              onClick={() => removeAnswer(index)}
              className="absolute right-2"
            >
              <svg className="w-[24px] h-[24px] stroke-[#121417]">
                <use href={`${sprite}#icon-x`} />
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={addAnswer}
          className="flex items-center justify-center h-10 w-full bg-orange-400 text-white rounded-md transition duration-300 ease-in-out transform hover:bg-orange-500"
        >
          <svg className="w-[40px] h-[40px]">
            <use href={`${sprite}#icon-plus`} />
          </svg>
        </button>
      </div>

      <button
        onClick={onDelete}
        className="font-medium mx-auto h-8 w-48 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-red-700"
      >
        Delete Question
      </button>
    </li>
  );
};
