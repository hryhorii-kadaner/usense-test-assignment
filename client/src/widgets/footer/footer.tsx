import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            © 2025 Новини Світу. Тестове завдання для Usense.
          </p>
          <p className="text-gray-500 text-xs">
            Дані надані NewsAPI
          </p>
        </div>
      </div>
    </footer>
  );
};
