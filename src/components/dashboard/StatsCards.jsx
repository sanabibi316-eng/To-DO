import {
  ClipboardList,
  CheckCircle2,
  Clock4,
  AlertCircle,
  TrendingUp,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export default function StatsCards() {
  const { stats } = useTasks();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const cardConfig = [
    {
      key: 'total',
      label: 'Total Tasks',
      value: stats.total,
      icon: ClipboardList,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      accentColor: '#6366f1',
      subtext: 'Active pipeline',
    },
    {
      key: 'completed',
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      accentColor: '#10b981',
      subtext: `${completionRate}% overall rate`,
      tag: `${completionRate}% Done`,
    },
    {
      key: 'pending',
      label: 'In Progress',
      value: stats.pending,
      icon: Clock4,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      accentColor: '#f59e0b',
      subtext: 'Awaiting execution',
    },
    {
      key: 'overdue',
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      accentColor: '#ef4444',
      subtext: stats.overdue > 0 ? 'Requires attention' : 'All clear',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cardConfig.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="group relative rounded-3xl p-5 sm:p-6 glass-panel card-interactive overflow-hidden"
          >
            {/* Ambient Corner Accent */}
            <div
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
              style={{ background: card.gradient }}
            />

            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
                style={{ background: card.gradient }}
              >
                <Icon size={22} strokeWidth={2.3} />
              </div>

              {card.tag && (
                <span className="badge-pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  <TrendingUp size={12} strokeWidth={2.5} />
                  {card.tag}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
                {card.value}
              </p>
              <div className="flex items-center justify-between pt-1">
                <p className="text-[13px] sm:text-[14px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {card.label}
                </p>
              </div>
              <p className="text-[12px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
