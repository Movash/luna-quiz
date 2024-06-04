import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Quiz, Question } from '../QuizManager/QuizManager';
import { QuestionEditor } from '../QuestionEditor/QuestionEditor';
import { nanoid } from 'nanoid';

interface QuizEditorProps {
  quiz: Quiz;
  saveQuiz: (quiz: Quiz) => void;
  onBackToMain: () => void;
}

export const QuizEditor: FC<QuizEditorProps> = ({
  quiz,
  saveQuiz,
  onBackToMain,
}) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(quiz);
  const [canSave, setCanSave] = useState<boolean>(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentQuiz({ ...currentQuiz, title: e.target.value });
  };

  const handleQuestionChange = (index: number, question: Question) => {
    const updatedQuestions = currentQuiz.questions.map((q, i) =>
      i === index ? question : q
    );
    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: nanoid(),
      questionText: '',
      answers: ['', ''],
      correctAnswerIndex: 0,
    };
    setCurrentQuiz({
      ...currentQuiz,
      questions: [...currentQuiz.questions, newQuestion],
    });
  };

  const removeQuestion = (id: string) => {
    const updatedQuestions = currentQuiz.questions.filter(q => q.id !== id);
    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions });
  };

  const save = () => {
    saveQuiz(currentQuiz);
  };

  useEffect(() => {
    const validateQuiz = () => {
      if (!currentQuiz.title) return false;
      if (currentQuiz.questions.length < 1) return false;

      return currentQuiz.questions.every(question => {
        if (!question.questionText) return false;
        if (question.answers.length < 2) return false;
        if (question.answers.some(answer => !answer)) return false;
        if (
          question.correctAnswerIndex < 0 ||
          question.correctAnswerIndex >= question.answers.length
        )
          return false;
        return true;
      });
    };

    setCanSave(validateQuiz());
  }, [currentQuiz]);

  return (
    <>
      <button
        onClick={onBackToMain}
        className="mb-8 font-medium h-12 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
      >
        Back to main
      </button>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          value={currentQuiz.title}
          onChange={handleTitleChange}
          placeholder="Quiz title"
          className=" mb-8 h-10 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm transition focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 cursor-pointer"
        />
        {currentQuiz.questions.length > 0 && (
          <ul className="flex flex-wrap justify-center items-start gap-8 mb-8 w-full">
            {currentQuiz.questions.map((question, index) => (
              <QuestionEditor
                key={question.id}
                question={question}
                questionNumber={index + 1}
                onChange={updatedQuestion =>
                  handleQuestionChange(index, updatedQuestion)
                }
                onDelete={() => removeQuestion(question.id)}
              />
            ))}
          </ul>
        )}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={addQuestion}
            className="font-medium h-12 w-60 bg-orange-400 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-orange-500"
          >
            Add new question
          </button>
          <button
            onClick={save}
            disabled={!canSave}
            className={`font-medium h-12 w-28 text-white rounded-lg transition duration-300 ease-in-out transform ${
              //
              !canSave
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700'
            }`}
          >
            Save quiz
          </button>
        </div>
      </div>
    </>
  );
};
