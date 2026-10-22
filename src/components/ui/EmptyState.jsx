import { Sparkles, Plus } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Sparkles,
  title = 'No tasks found',
  description = 'You have a fresh, organized workspace. Create your next deliverable to get going.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center glass-panel rounded-3xl border border-dashed my-4 animate-entrance" style={{ borderColor: 'var(--border-subtle)' }}>
      <div
        className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
          color: '#6366f1',
        }}
      >
        <Icon size={28} strokeWidth={2.2} />
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm font-medium mb-6 max-w-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-vibrant flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold"
        >
          <Plus size={15} strokeWidth={3} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
