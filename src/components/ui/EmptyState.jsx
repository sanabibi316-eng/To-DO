import { ClipboardList } from 'lucide-react';

export default function EmptyState({
  icon: Icon = ClipboardList,
  title = 'No tasks yet',
  description = 'Create your first task to get started.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <Icon size={28} style={{ color: 'var(--text-tertiary)' }} />
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--text-tertiary)' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors focus-visible:outline-2 focus-visible:outline-primary-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}