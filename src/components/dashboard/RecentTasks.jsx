import { useTasks } from '../../context/TaskContext';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { PRIORITIES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export default function RecentTasks() {
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const recentTasks = [...tasks]
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Recent Tasks
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Your latest pending tasks
          </p>
        </div>
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          View all <ArrowRight size={14} />
        </button>
      </div>

      {recentTasks.length === 0 ? (
        <div className="py-8 text-center">
          <Clock size={24} className="mx-auto mb-2" style={{ color: 'var(--text-tertiary)' }} />
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            No pending tasks
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {recentTasks.map((task) => {
            const priority = PRIORITIES.find((p) => p.id === task.priority);
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: priority?.color || '#8a8aa3' }}
                  aria-label={`${priority?.label || 'No'} priority`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {formatDate(task.dueDate)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}