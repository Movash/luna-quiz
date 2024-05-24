import { FC } from 'react';
import { QuizManager } from './components/QuizManager/QuizManager';

export const App: FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Application</h1>
      <QuizManager />
    </div>
  );
};
