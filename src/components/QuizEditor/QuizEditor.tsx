import React, { useState } from 'react';
import { Quiz, Question } from '../QuizManager/QuizManager';
import { QuestionEditor } from '../QuestionEditor/QuestionEditor';

interface QuizEditorProps {
  quiz: Quiz;
  saveQuiz: (quiz: Quiz) => void;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ quiz, saveQuiz }) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(quiz);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      id: Date.now(),
      questionText: '',
      answers: [''],
      correctAnswerIndex: 0,
    };
    setCurrentQuiz({
      ...currentQuiz,
      questions: [...currentQuiz.questions, newQuestion],
    });
  };

  const removeQuestion = (id: number) => {
    const updatedQuestions = currentQuiz.questions.filter(q => q.id !== id);
    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions });
  };

  const save = () => {
    saveQuiz(currentQuiz);
  };

  return (
    <div>
      <input
        type="text"
        value={currentQuiz.title}
        onChange={handleTitleChange}
        placeholder="Quiz Title"
        className="input"
      />
      <button onClick={addQuestion} className="btn">
        Add Question
      </button>
      {currentQuiz.questions.map((question, index) => (
        <QuestionEditor
          key={question.id}
          question={question}
          onChange={updatedQuestion =>
            handleQuestionChange(index, updatedQuestion)
          }
          onDelete={() => removeQuestion(question.id)}
        />
      ))}
      <button onClick={save} className="btn">
        Save Quiz
      </button>
    </div>
  );
};
