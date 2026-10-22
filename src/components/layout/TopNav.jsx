import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../ui/SearchBar';
import NotificationDropdown from '../ui/NotificationDropdown';
import TaskModal from '../tasks/TaskModal';

const pageMeta = {
  '/': { title: 'Dashboard', subtitle: "Here's what's happening with your tasks today." },
  '/tasks': { title: 'My Tasks', subtitle: 'Manage and prioritize your daily workflow' },
  '/today': { title: 'Today', subtitle: 'Focus on today' },
  '/upcoming': { title: 'Upcoming', subtitle: 'Plan ahead' },
  '/completed': { title: 'Completed', subtitle: 'Your accomplishments' },
  '/settings': { title: 'Settings', subtitle: 'Customize your experience' },
};

export default function TopNav({ searchQuery, onSearchChange }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [showTaskModal, setShowTaskModal] = useState(false);

  const currentMeta = pageMeta[location.pathname] || {
    title: 'FocusFlow',
    subtitle: 'Streamlined task execution',
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 sm:px-10 h-20">
          {/* Header Title & Subtitle */}
          <div className="min-w-0 pr-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {currentMeta.title}
            </h1>
            <p className="text-[13px] text-slate-400 dark:text-slate-500 font-normal leading-tight mt-1">
              {currentMeta.subtitle}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Search Bar with ⌘K badge */}
            <div className="w-56 sm:w-64 md:w-72">
              <SearchBar value={searchQuery || ''} onChange={onSearchChange || (() => {})} />
            </div>

            {/* Pill Toggle Switch for Theme */}
            <div className="flex items-center gap-1.5">
              <Sun size={15} className={`${theme === 'light' ? 'text-amber-500' : 'text-slate-400'}`} />
              <button
                type="button"
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Toggle dark mode"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <Moon size={14} className={`${theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'}`} />
            </div>

            {/* Notification bell with red badge */}
            <NotificationDropdown />

            {/* + Create task button */}
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white text-[13px] font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create task</span>
            </button>
          </div>
        </div>
      </header>

      <TaskModal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} />
    </>
  );
}
