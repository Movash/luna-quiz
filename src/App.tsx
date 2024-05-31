import { FC } from 'react';
import { QuizManager } from './components/QuizManager/QuizManager';

export const App: FC = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-8">Luna Quiz</h1>
      <QuizManager />
    </div>
  );
};
