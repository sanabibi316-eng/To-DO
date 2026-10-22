import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../ui/SearchBar';
import NotificationDropdown from '../ui/NotificationDropdown';
import TaskModal from '../tasks/TaskModal';

const pageTitles = {
  '/': 'Dashboard',
  '/tasks': 'My Tasks',
  '/today': 'Today',
  '/upcoming': 'Upcoming',
  '/completed': 'Completed',
  '/settings': 'Settings',
};

const pageSubtitles = {
  '/': 'Your productivity overview',
  '/tasks': 'All tasks in one place',
  '/today': 'Focus on today',
  '/upcoming': 'Plan ahead',
  '/completed': 'Your accomplishments',
  '/settings': 'Customize your experience',
};

export default function TopNav({ searchQuery, onSearchChange }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [showTaskModal, setShowTaskModal] = useState(false);

  const title = pageTitles[location.pathname] || 'FocusFlow';
  const subtitle = pageSubtitles[location.pathname];

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-xl"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="md:hidden flex items-center gap-2 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                }}
              >
                <Zap size={15} className="text-white" fill="white" />
              </div>
            </div>
            <div className="min-w-0">
              <h1
                className="text-[17px] sm:text-[19px] font-bold leading-tight truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="hidden sm:block text-[12px] leading-tight mt-0.5"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <div className="hidden md:block w-64 lg:w-80">
              {onSearchChange && (
                <SearchBar value={searchQuery || ''} onChange={onSearchChange} />
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl transition-all btn-press"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)')}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <NotificationDropdown />

            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-white rounded-xl text-[13px] font-semibold btn-primary-glow btn-press"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {onSearchChange && (
          <div className="md:hidden px-4 pb-3">
            <SearchBar value={searchQuery || ''} onChange={onSearchChange} />
          </div>
        )}
      </header>

      <TaskModal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} />
    </>
  );
}