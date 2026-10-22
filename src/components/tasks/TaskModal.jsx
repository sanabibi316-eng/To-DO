import { useState, useEffect, useRef } from 'react';
import { X, Type, FileText, Tag, Flag, Calendar } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';
import { useTasks } from '../../context/TaskContext';
import { useToast } from '../../context/ToastContext';

export default function TaskModal({ isOpen, onClose, editTask = null }) {
  const { addTask, updateTask } = useTasks();
  const { addToast } = useToast();
  const titleRef = useRef(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (editTask) {
        setForm({
          title: editTask.title,
          description: editTask.description || '',
          category: editTask.category || '',
          priority: editTask.priority || 'medium',
          dueDate: editTask.dueDate || '',
        });
      } else {
        setForm({ title: '', description: '', category: '', priority: 'medium', dueDate: '' });
      }
      setErrors({});
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen, editTask]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (form.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      addToast(Object.values(newErrors)[0], 'error');
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editTask) {
      updateTask(editTask.id, form);
    } else {
      addTask(form);
    }
    onClose();
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h2 id="task-modal-title" className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {editTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:opacity-70 transition-opacity" aria-label="Close modal">
            <X size={20} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="task-title" className="flex items-center gap-2 text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              <Type size={14} /> Title <span className="text-red-400">*</span>
            </label>
            <input
              ref={titleRef}
              id="task-title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What needs to be done?"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                errors.title ? 'border-red-400' : 'focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]'
              }`}
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: errors.title ? undefined : 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-xs text-red-400 mt-1" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="task-desc" className="flex items-center gap-2 text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              <FileText size={14} /> Description
            </label>
            <textarea
              id="task-desc"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add details..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none resize-none focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-category" className="flex items-center gap-2 text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Tag size={14} /> Category
              </label>
              <select
                id="task-category"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none focus:border-primary-400 appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="">None</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="task-priority" className="flex items-center gap-2 text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Flag size={14} /> Priority
              </label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none focus:border-primary-400 appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.icon} {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="task-due" className="flex items-center gap-2 text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              <Calendar size={14} /> Due Date
            </label>
            <input
              id="task-due"
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none focus:border-primary-400"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {editTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}