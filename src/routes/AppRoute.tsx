import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import DarkModeProvider from '../context/DarkModeContext';

import DashboardLayout from '../layout/DashboardLayout';

import Account from '../pages/Account';
import Certifications from '../pages/Certifications';
import Dashboard from '../pages/Dashboard';
import Experience from '../pages/Experience';
import Login from '../pages/Login';
import Project from '../pages/Project';
import Projects from '../pages/Projects';
import Settings from '../pages/Settings';
import Skills from '../pages/Skills';

import ProtectRoute from './ProtectRoute';
import NotFound from '../pages/NotFound';

// Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// });

const queryClient = new QueryClient();

export default function AppRoute() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectRoute>
                  <DashboardLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:projectId" element={<Project />} />
              <Route path="skills" element={<Skills />} />
              <Route path="experiences" element={<Experience />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="account" element={<Account />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },

            style: {
              fontSize: '18px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-gray-50)',
              color: 'var(--color-gray-800)',
              boxShadow: 'var(--shadow-sm)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
