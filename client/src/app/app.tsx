import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '../shared/providers';
import { HomePage } from '../pages';
import { routes } from '../shared/routes';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path={routes.HOME} element={<HomePage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
};
