import { useState } from 'react';
import { Check, Pencil, Trash2, Calendar, Flag, Tag, MoreVertical } from 'lucide-react';
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
      className={`group relative rounded-2xl border p-4 transition-all duration-200 hover:shadow-md animate-slide-up ${
        task.completed ? 'opacity-70' : ''
      }`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: overdue && !task.completed ? '#f87171' : 'var(--border-color)',
      }}
    >
      {/* Priority stripe */}
      {priority && !task.completed && (
        <div
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
          style={{ backgroundColor: priority.color }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-3 pl-1">
        {/* Checkbox */}
        <button
          onClick={() => toggleComplete(task.id)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            task.completed
              ? 'border-transparent'
              : 'hover:scale-110'
          }`}
          style={{
            backgroundColor: task.completed ? '#8b5cf6' : 'transparent',
            borderColor: task.completed ? '#8b5cf6' : 'var(--border-strong)',
          }}
          aria-label={task.completed ? `Mark "${task.title}" as pending` : `Mark "${task.title}" as completed`}
        >
          {task.completed && <Check size={13} className="text-white" strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-[14px] font-semibold leading-snug ${task.completed ? 'line-through' : ''}`}
            style={{ color: task.completed ? 'var(--text-tertiary)' : 'var(--text-primary)' }}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className="text-[12.5px] mt-1 line-clamp-2 leading-relaxed"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {task.description}
            </p>
          )}

          {/* Meta */}
          {(category || priority || task.dueDate) && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {category && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold"
                  style={{
                    backgroundColor: isDark ? category.darkBgColor : category.bgColor,
                    color: category.color,
                  }}
                >
                  <Tag size={10} strokeWidth={2.5} />
                  {category.label}
                </span>
              )}

              {priority && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold"
                  style={{
                    backgroundColor: isDark ? priority.darkBgColor : priority.bgColor,
                    color: priority.color,
                  }}
                >
                  <Flag size={10} strokeWidth={2.5} fill={priority.color} />
                  {priority.label}
                </span>
              )}

              {task.dueDate && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${
                    overdue && !task.completed ? 'bg-red-50' : ''
                  }`}
                  style={{
                    color: overdue && !task.completed ? '#dc2626' : 'var(--text-tertiary)',
                    backgroundColor: overdue && !task.completed ? (isDark ? '#7f1d1d' : '#fef2f2') : 'transparent',
                  }}
                >
                  <Calendar size={10} strokeWidth={2.5} />
                  {formatDate(task.dueDate)}
                  {overdue && !task.completed && ' • Overdue'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity md:flex">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
              e.currentTarget.style.color = '#8b5cf6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
            aria-label={`Edit "${task.title}"`}
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="p-2 rounded-lg transition-colors"
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
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Inline delete confirm */}
      {showDelete && (
        <div
          className="mt-3 pt-3 border-t flex items-center justify-between gap-3 animate-slide-down"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <p className="text-[12px] font-medium" style={{ color: 'var(--text-secondary)' }}>
            Delete this task?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDelete(false)}
              className="px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-colors"
              style={{
                borderColor: 'var(--border-color)',
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
              className="px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}