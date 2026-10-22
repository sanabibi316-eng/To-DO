import { ClipboardList, CheckCircle, Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const cards = [
  {
    key: 'total',
    label: 'Total Tasks',
    icon: ClipboardList,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    iconBg: 'rgba(139, 92, 246, 0.1)',
    iconColor: '#8b5cf6',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: CheckCircle,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    iconBg: 'rgba(16, 185, 129, 0.1)',
    iconColor: '#10b981',
  },
  {
    key: 'pending',
    label: 'In Progress',
    icon: Clock,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    iconBg: 'rgba(245, 158, 11, 0.1)',
    iconColor: '#f59e0b',
  },
  {
    key: 'overdue',
    label: 'Overdue',
    icon: AlertTriangle,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    iconBg: 'rgba(239, 68, 68, 0.1)',
    iconColor: '#ef4444',
  },
];

export default function StatsCards() {
  const { stats } = useTasks();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map(({ key, label, icon: Icon, iconBg, iconColor }) => (
        <div
          key={key}
          className="group rounded-2xl border p-4 sm:p-5 card-hover relative overflow-hidden"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: iconBg }}
            >
              <Icon size={19} style={{ color: iconColor }} strokeWidth={2.2} />
            </div>
            {key === 'completed' && stats.total > 0 && (
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                }}
              >
                {completionRate}%
              </span>
            )}
          </div>
          <p
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-none"
            style={{ color: 'var(--text-primary)' }}
          >
            {stats[key]}
          </p>
          <p
            className="text-[12px] sm:text-[13px] font-medium mt-1.5"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}