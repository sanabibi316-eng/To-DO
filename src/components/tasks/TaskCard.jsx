import { useState } from 'react';
import { Check, Pencil, MoreHorizontal, Calendar, Flag, GraduationCap, Briefcase, User, BookOpen, Trash2 } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/helpers';
import { useTasks } from '../../context/TaskContext';

export default function TaskCard({ task, onEdit }) {
  const { toggleComplete, deleteTask } = useTasks();
  const [showMenu, setShowMenu] = useState(false);

  const category = CATEGORIES.find((c) => c.id === task.category);
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div
      className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 transition-all shadow-xs ${
        task.completed ? 'opacity-60 bg-slate-50/50 dark:bg-slate-950/40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left Check Circle + Title & Tags */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Circular Checkbox */}
          <button
            onClick={() => toggleComplete(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
              task.completed
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-900'
            }`}
            aria-label={task.completed ? 'Mark task as pending' : 'Mark task as completed'}
          >
            {task.completed && <Check size={13} strokeWidth={3} />}
          </button>

          {/* Title & Description & Tags */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3
              className={`text-[15px] font-bold tracking-tight text-slate-900 dark:text-slate-100 ${
                task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="text-[13px] text-slate-400 dark:text-slate-400 font-normal line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1.5">
              {/* Category pill */}
              {category ? (
                <span className="tag-pill bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                  <GraduationCap size={12} strokeWidth={2.4} />
                  <span>{category.label}</span>
                </span>
              ) : null}

              {/* Priority pill */}
              {priority ? (
                <span className="tag-pill bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                  <Flag size={11} strokeWidth={2.5} fill="#d97706" />
                  <span>{priority.label}</span>
                </span>
              ) : null}

              {/* Due Date pill */}
              {task.dueDate ? (
                <span
                  className={`tag-pill border ${
                    overdue && !task.completed
                      ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-950/50 dark:text-red-400'
                      : 'bg-indigo-50/70 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400'
                  }`}
                >
                  <Calendar size={11} strokeWidth={2.4} />
                  <span>{formatDate(task.dueDate)}</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Action Icons: Pencil & MoreHorizontal */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil size={15} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="More options"
              aria-label="More options"
            >
              <MoreHorizontal size={16} />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 top-full mt-1.5 w-32 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg py-1 z-20"
                onMouseLeave={() => setShowMenu(false)}
              >
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
