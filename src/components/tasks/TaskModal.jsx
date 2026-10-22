import { useState, useEffect, useRef } from 'react';
import { X, Type, FileText, Tag, Flag, Calendar, Sparkles } from 'lucide-react';
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
      setTimeout(() => titleRef.current?.focus(), 120);
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
      style={{
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden animate-entrance"
        style={{
          backgroundColor: 'var(--card-bg-solid)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Sparkles size={16} />
            </div>
            <h2 id="task-modal-title" className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {editTask ? 'Edit Task Deliverable' : 'Create New Deliverable'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-500/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Type size={14} className="text-indigo-500" /> Title <span className="text-rose-500">*</span>
            </label>
            <input
              ref={titleRef}
              id="task-title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Finalize presentation slides & submit report"
              className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                errors.title
                  ? 'border-rose-500 shadow-sm'
                  : 'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: errors.title ? undefined : 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-desc"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <FileText size={14} className="text-indigo-500" /> Description
            </label>
            <textarea
              id="task-desc"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add key context, links, or bullet points..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-category"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Tag size={14} className="text-indigo-500" /> Category
              </label>
              <select
                id="task-category"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium transition-all outline-none focus:border-indigo-500 cursor-pointer"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="">General</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Flag size={14} className="text-indigo-500" /> Priority
              </label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium transition-all outline-none focus:border-indigo-500 cursor-pointer"
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
            <label
              htmlFor="task-due"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Calendar size={14} className="text-indigo-500" /> Target Deadline
            </label>
            <input
              id="task-due"
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all outline-none focus:border-indigo-500"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-2xl text-sm font-bold border transition-colors"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-vibrant px-4 py-3 rounded-2xl text-sm font-bold"
            >
              {editTask ? 'Save Updates' : 'Launch Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
