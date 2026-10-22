import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Sun, Moon, Zap, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../ui/SearchBar';
import NotificationDropdown from '../ui/NotificationDropdown';
import TaskModal from '../tasks/TaskModal';

const pageMeta = {
  '/': { title: 'Dashboard', subtitle: 'Real-time performance and task analytics' },
  '/tasks': { title: 'My Tasks', subtitle: 'Manage and prioritize your daily workflow' },
  '/today': { title: 'Today’s Focus', subtitle: 'High-impact deliverables due today' },
  '/upcoming': { title: 'Upcoming Timeline', subtitle: 'Scheduled roadmap and upcoming deadlines' },
  '/completed': { title: 'Completed Archive', subtitle: 'Review and track past accomplishments' },
  '/settings': { title: 'Preferences', subtitle: 'App customization and workspace settings' },
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
      <header
        className="sticky top-0 z-20 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 h-20">
          {/* Header Title Area */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="md:hidden flex items-center gap-2 flex-shrink-0">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                }}
              >
                <Zap size={20} className="text-white" fill="white" />
              </div>
            </div>
            <div className="min-w-0">
              <h1
                className="text-xl sm:text-2xl font-extrabold tracking-tight truncate leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {currentMeta.title}
              </h1>
              <p
                className="hidden sm:block text-[13px] font-medium leading-tight mt-1 truncate"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {currentMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {onSearchChange && (
              <div className="hidden md:block w-64 lg:w-80">
                <SearchBar value={searchQuery || ''} onChange={onSearchChange} />
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-indigo-600" />
              ) : (
                <Sun size={18} className="text-amber-400" />
              )}
            </button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* New Task Button */}
            <button
              onClick={() => setShowTaskModal(true)}
              className="btn-vibrant flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-[13.5px] font-bold transition-all"
            >
              <Plus size={18} strokeWidth={2.8} />
              <span className="hidden sm:inline">Create Task</span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        {onSearchChange && (
          <div className="md:hidden px-4 pb-3.5 pt-1">
            <SearchBar value={searchQuery || ''} onChange={onSearchChange} />
          </div>
        )}
      </header>

      <TaskModal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} />
    </>
  );
}
