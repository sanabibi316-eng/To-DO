import { useTasks } from '../../context/TaskContext';
import { Clock, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { PRIORITIES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export default function RecentTasks() {
  const { tasks, toggleComplete } = useTasks();
  const navigate = useNavigate();

  const recentTasks = [...tasks]
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="rounded-3xl p-6 sm:p-7 glass-panel card-interactive h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Priority Backlog
            </h3>
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Top pressing actions in queue
            </p>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors py-1.5 px-3 rounded-xl hover:bg-indigo-500/10"
          >
            All Tasks <ArrowRight size={14} />
          </button>
        </div>

        {recentTasks.length === 0 ? (
          <div className="py-12 text-center border border-dashed rounded-2xl" style={{ borderColor: 'var(--border-subtle)' }}>
            <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-500" />
            <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Clean Slate!
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              No tasks currently pending in backlog.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentTasks.map((task) => {
              const priority = PRIORITIES.find((p) => p.id === task.priority);
              return (
                <div
                  key={task.id}
                  className="group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 hover:translate-x-1"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ borderColor: priority?.color || '#6366f1' }}
                      aria-label="Complete task"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm opacity-0 group-hover:opacity-60 transition-opacity"
                        style={{ backgroundColor: priority?.color || '#6366f1' }}
                      />
                    </button>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-bold truncate leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-[11px] font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                          <Calendar size={11} />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {priority && (
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor: priority.bgColor,
                        color: priority.color,
                      }}
                    >
                      {priority.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-4 border-t mt-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-[11px] font-medium text-center" style={{ color: 'var(--text-tertiary)' }}>
          Tip: Click the checkbox next to any task to instantly complete it.
        </p>
      </div>
    </div>
  );
}
