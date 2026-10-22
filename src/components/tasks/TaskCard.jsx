import { useState } from 'react';
import { Check, Pencil, Trash2, Calendar, Flag, Tag } from 'lucide-react';
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
      className={`group relative rounded-xl p-4 sm:p-5 transition-all duration-200 border ${
        task.completed ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-900 hover:shadow-md'
      }`}
      style={{
        borderColor: overdue && !task.completed ? '#fca5a5' : 'var(--border-color)',
      }}
    >
      {/* Left Priority Accent Bar */}
      {priority && !task.completed && (
        <div
          className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md"
          style={{ backgroundColor: priority.color }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-3.5 pl-1.5">
        {/* Custom Rounded Checkbox */}
        <button
          onClick={() => toggleComplete(task.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-800'
          }`}
          aria-label={task.completed ? `Mark "${task.title}" as pending` : `Mark "${task.title}" as completed`}
        >
          {task.completed && <Check size={13} strokeWidth={3} />}
        </button>

        {/* Task Title & Details */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-baseline gap-2">
            <h3
              className={`text-[14.5px] font-bold tracking-tight leading-snug ${
                task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p
              className="text-[13px] mt-1 line-clamp-2 leading-relaxed text-slate-500 dark:text-slate-400"
            >
              {task.description}
            </p>
          )}

          {/* Tags & Meta Row */}
          {(category || priority || task.dueDate) && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {category && (
                <span
                  className="badge-pill border"
                  style={{
                    backgroundColor: isDark ? category.darkBgColor : category.bgColor,
                    borderColor: `${category.color}35`,
                    color: category.color,
                  }}
                >
                  <Tag size={10} strokeWidth={2.5} />
                  {category.label}
                </span>
              )}

              {priority && (
                <span
                  className="badge-pill border"
                  style={{
                    backgroundColor: isDark ? priority.darkBgColor : priority.bgColor,
                    borderColor: `${priority.color}35`,
                    color: priority.color,
                  }}
                >
                  <Flag size={10} strokeWidth={2.5} fill={priority.color} />
                  {priority.label}
                </span>
              )}

              {task.dueDate && (
                <span
                  className={`badge-pill border ${
                    overdue && !task.completed
                      ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60'
                      : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  <Calendar size={10} strokeWidth={2.5} />
                  {formatDate(task.dueDate)}
                  {overdue && !task.completed && ' • Overdue'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
            title="Edit task"
            aria-label={`Edit "${task.title}"`}
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
            title="Delete task"
            aria-label={`Delete "${task.title}"`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Inline Delete Confirmation */}
      {showDelete && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Permanently delete this task?
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDelete(false)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteTask(task.id);
                setShowDelete(false);
              }}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-xs"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
