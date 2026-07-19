import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import DarkModeProvider from './context/DarkModeContext';
import './styles/GlobalStyles.css';

// Pages
import Login from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Certifications from './pages/Certifications';
import Account from './pages/Account';

// UI
import ProtectRoute from './ui/ProtectRoute';
import Project from './pages/Project';
import Settings from './pages/Settings';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 5 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
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

export default App;
