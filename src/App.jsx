import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { TaskProvider } from './context/TaskContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import MyTasks from './pages/MyTasks';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Completed from './pages/Completed';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="tasks" element={<MyTasks />} />
                <Route path="today" element={<Today />} />
                <Route path="upcoming" element={<Upcoming />} />
                <Route path="completed" element={<Completed />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </TaskProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}