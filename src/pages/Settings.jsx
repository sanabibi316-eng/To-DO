import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import DeleteConfirm from '../components/tasks/DeleteConfirm';
import { Sun, Moon, Trash2, Monitor } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { clearAllTasks, stats } = useTasks();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div>
      <TopNav />
      <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
        {/* Theme */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Appearance
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Choose your preferred theme
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => theme !== 'light' && toggleTheme()}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                theme === 'light' ? 'border-primary-400 bg-primary-50 text-primary-600' : ''
              }`}
              style={{
                borderColor: theme === 'light' ? undefined : 'var(--border-color)',
                color: theme === 'light' ? undefined : 'var(--text-secondary)',
                backgroundColor: theme === 'light' ? undefined : 'var(--bg-tertiary)',
              }}
            >
              <Sun size={18} /> Light
            </button>
            <button
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                theme === 'dark' ? 'border-primary-400 bg-primary-50 text-primary-600' : ''
              }`}
              style={{
                borderColor: theme === 'dark' ? undefined : 'var(--border-color)',
                color: theme === 'dark' ? undefined : 'var(--text-secondary)',
                backgroundColor: theme === 'dark' ? undefined : 'var(--bg-tertiary)',
              }}
            >
              <Moon size={18} /> Dark
            </button>
          </div>
        </div>

        {/* Data */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Data Management
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            {stats.total > 0
              ? `You have ${stats.total} task${stats.total !== 1 ? 's' : ''} stored locally.`
              : 'No tasks stored.'}
          </p>
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={stats.total === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 size={16} /> Clear All Tasks
          </button>
        </div>

        {/* About */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            About FocusFlow
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            A modern task management app built with React, Tailwind CSS, and ❤️.
            All data is stored locally in your browser.
          </p>
        </div>
      </div>

      {showClearConfirm && (
        <DeleteConfirm
          title="Clear All Tasks"
          message={`This will permanently delete all ${stats.total} task${stats.total !== 1 ? 's' : ''}. This cannot be undone.`}
          onConfirm={() => { clearAllTasks(); setShowClearConfirm(false); }}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}