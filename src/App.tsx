import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { AddTimeLog } from './components/AddTimeLog';
import { useState } from 'react';
import type { UserRole } from './types';

// Create a client
const queryClient = new QueryClient();

// Create theme
const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

function App() {
  // In a real app, this would come from authentication
  const [userRole] = useState<UserRole>('employee');

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <Router>
          <Layout userRole={userRole}>
            <Routes>
              {/* Employee Routes */}
              <Route path="/add-log" element={<AddTimeLog />} />
              <Route path="/my-logs" element={<div>My Logs Component</div>} />

              {/* Manager Routes */}
              <Route 
                path="/projects" 
                element={
                  userRole === 'manager' 
                    ? <div>Projects Component</div>
                    : <Navigate to="/add-log" replace />
                } 
              />
              <Route 
                path="/employees" 
                element={
                  userRole === 'manager' 
                    ? <div>Employees Component</div>
                    : <Navigate to="/add-log" replace />
                } 
              />
              <Route 
                path="/all-logs" 
                element={
                  userRole === 'manager' 
                    ? <div>All Logs Component</div>
                    : <Navigate to="/add-log" replace />
                } 
              />

              {/* Default Route */}
              <Route path="/" element={<Navigate to={userRole === 'manager' ? '/projects' : '/add-log'} replace />} />
            </Routes>
          </Layout>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
