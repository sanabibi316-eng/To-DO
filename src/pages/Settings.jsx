import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import DeleteConfirm from '../components/tasks/DeleteConfirm';
import { Sun, Moon, Trash2, Shield, Heart, Sparkles, Database, Palette } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { clearAllTasks, stats } = useTasks();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-entrance">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            System Preferences
          </h2>
          <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Fine-tune interface visuals and workspace data
          </p>
        </div>

        {/* Theme Settings */}
        <div className="rounded-3xl p-6 sm:p-7 glass-panel border" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Palette size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Visual Mode
              </h3>
              <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                Select between modern Light or Deep Dark themes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              onClick={() => theme !== 'light' && toggleTheme()}
              className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl border font-bold text-sm transition-all duration-200 ${
                theme === 'light'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 shadow-sm'
                  : 'hover:bg-slate-500/5'
              }`}
              style={{
                borderColor: theme === 'light' ? undefined : 'var(--border-subtle)',
                color: theme === 'light' ? undefined : 'var(--text-secondary)',
                backgroundColor: theme === 'light' ? undefined : 'var(--bg-tertiary)',
              }}
            >
              <Sun size={18} className="text-amber-500" />
              <span>Light Mode</span>
            </button>

            <button
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl border font-bold text-sm transition-all duration-200 ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 shadow-sm'
                  : 'hover:bg-slate-500/5'
              }`}
              style={{
                borderColor: theme === 'dark' ? undefined : 'var(--border-subtle)',
                color: theme === 'dark' ? undefined : 'var(--text-secondary)',
                backgroundColor: theme === 'dark' ? undefined : 'var(--bg-tertiary)',
              }}
            >
              <Moon size={18} className="text-indigo-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-3xl p-6 sm:p-7 glass-panel border" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Database size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Storage & Privacy
              </h3>
              <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                Local client storage and database hygiene
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium mt-3" style={{ color: 'var(--text-secondary)' }}>
            All tasks are held locally inside your browser's private indexed local storage. You currently have{' '}
            <strong className="text-indigo-500">{stats.total} total items</strong> stored.
          </p>

          <div className="mt-5">
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={stats.total === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
              <span>Reset & Wipe All Tasks</span>
            </button>
          </div>
        </div>

        {/* App Info Card */}
        <div className="rounded-3xl p-6 sm:p-7 glass-panel border text-center" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Sparkles size={24} />
          </div>
          <h3 className="text-base font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            FocusFlow • v2.0 Next-Gen Edition
          </h3>
          <p className="text-xs font-medium mt-1 max-w-sm mx-auto" style={{ color: 'var(--text-tertiary)' }}>
            Engineered with React 19, Tailwind CSS v4, Lucide Icons, and modern glassmorphic responsive design.
          </p>
        </div>
      </div>

      {showClearConfirm && (
        <DeleteConfirm
          title="Wipe Entire Task Database"
          message={`This will permanently remove all ${stats.total} tasks and stored metrics. This operation cannot be reversed.`}
          onConfirm={() => { clearAllTasks(); setShowClearConfirm(false); }}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}
