import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirm({ title, message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <div
        className="w-full max-w-md rounded-2xl border shadow-2xl p-6"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h3 id="delete-title" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              {title || 'Delete Task'}
            </h3>
            <p id="delete-description" className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {message || 'This action cannot be undone. Are you sure?'}
            </p>
          </div>
          <button onClick={onCancel} className="hover:opacity-70 transition-opacity" aria-label="Cancel">
            <X size={18} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-tertiary)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}