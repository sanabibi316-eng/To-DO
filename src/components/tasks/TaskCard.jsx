import { useState } from 'react';
import { Check, Pencil, Trash2, Calendar, Flag, Tag, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/helpers';
import { useTasks } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';

export default function TaskCard({ task, onEdit }) {
  const { toggleComplete, deleteTask } = useTasks();
  const { theme } = useTheme();
  const [showDelete, setShowDelete] = useState(false);

  const category = CATEGORIES.find((c) => c.id === task.category);
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const overdue = isOverdue(task.dueDate, task.completed);
  const isDark = theme === 'dark';

  return (
    <div
      className={`group relative rounded-3xl p-5 sm:p-6 glass-panel card-interactive transition-all duration-200 border ${
        task.completed ? 'opacity-65' : ''
      }`}
      style={{
        borderColor: overdue && !task.completed ? 'rgba(239, 68, 68, 0.45)' : 'var(--border-color)',
      }}
    >
      {/* Priority Left Indicator Bar */}
      {priority && !task.completed && (
        <div
          className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full shadow-sm"
          style={{ backgroundColor: priority.color }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-4">
        {/* Interactive Custom Checkbox */}
        <button
          onClick={() => toggleComplete(task.id)}
          className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600 shadow-sm scale-100'
              : 'hover:scale-110 active:scale-95'
          }`}
          style={{
            borderColor: task.completed ? '#6366f1' : 'var(--border-strong)',
            backgroundColor: task.completed ? '#6366f1' : 'transparent',
          }}
          aria-label={task.completed ? `Mark "${task.title}" as pending` : `Mark "${task.title}" as completed`}
        >
          {task.completed && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>

        {/* Task Core Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-[15.5px] font-bold tracking-tight leading-snug transition-colors ${
              task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
            }`}
            style={{ color: task.completed ? undefined : 'var(--text-primary)' }}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className="text-[13px] mt-1.5 line-clamp-2 leading-relaxed"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {task.description}
            </p>
          )}

          {/* Badges / Meta row */}
          {(category || priority || task.dueDate) && (
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              {category && (
                <span
                  className="badge-pill border"
                  style={{
                    backgroundColor: isDark ? category.darkBgColor : category.bgColor,
                    borderColor: `${category.color}30`,
                    color: category.color,
                  }}
                >
                  <Tag size={11} strokeWidth={2.4} />
                  {category.label}
                </span>
              )}

              {priority && (
                <span
                  className="badge-pill border"
                  style={{
                    backgroundColor: isDark ? priority.darkBgColor : priority.bgColor,
                    borderColor: `${priority.color}30`,
                    color: priority.color,
                  }}
                >
                  <Flag size={11} strokeWidth={2.4} fill={priority.color} />
                  {priority.label}
                </span>
              )}

              {task.dueDate && (
                <span
                  className={`badge-pill border ${
                    overdue && !task.completed
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                      : ''
                  }`}
                  style={{
                    color: overdue && !task.completed ? undefined : 'var(--text-secondary)',
                    backgroundColor: overdue && !task.completed ? undefined : 'var(--bg-tertiary)',
                    borderColor: overdue && !task.completed ? undefined : 'var(--border-subtle)',
                  }}
                >
                  <Calendar size={11} strokeWidth={2.4} />
                  {formatDate(task.dueDate)}
                  {overdue && !task.completed && ' • Overdue'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
              e.currentTarget.style.color = '#6366f1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
            aria-label={`Edit "${task.title}"`}
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
            aria-label={`Delete "${task.title}"`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Confirmation flyout */}
      {showDelete && (
        <div
          className="mt-4 pt-3.5 border-t flex items-center justify-between gap-3 animate-entrance"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-[13px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Delete this task permanently?
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDelete(false)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteTask(task.id);
                setShowDelete(false);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
