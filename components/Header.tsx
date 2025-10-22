
import React from 'react';
import { SparklesIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-6xl mx-auto text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-teal-400" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-500">
          محرر الصور بالذكاء الاصطناعي
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        قم بتحميل صورة ووصف التعديلات التي تريدها، ودع الذكاء الاصطناعي يبدع.
      </p>
    </header>
  );
};
