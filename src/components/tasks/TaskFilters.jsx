import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { CATEGORIES, PRIORITIES, SORT_OPTIONS } from '../../utils/constants';

export default function TaskFilters({ filters, onChange }) {
  const hasFilters = filters.status || filters.priority || filters.category;

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({ ...filters, status: '', priority: '', category: '' });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Status */}
      <select
        value={filters.status || ''}
        onChange={(e) => handleChange('status', e.target.value)}
        className="px-3 py-2 rounded-xl border text-xs font-medium transition-all outline-none cursor-pointer"
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)',
        }}
        aria-label="Filter by status"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>

      {/* Priority */}
      <select
        value={filters.priority || ''}
        onChange={(e) => handleChange('priority', e.target.value)}
        className="px-3 py-2 rounded-xl border text-xs font-medium transition-all outline-none cursor-pointer"
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)',
        }}
        aria-label="Filter by priority"
      >
        <option value="">All Priorities</option>
        {PRIORITIES.map((p) => (
          <option key={p.id} value={p.id}>
            {p.icon} {p.label}
          </option>
        ))}
      </select>

      {/* Category */}
      <select
        value={filters.category || ''}
        onChange={(e) => handleChange('category', e.target.value)}
        className="px-3 py-2 rounded-xl border text-xs font-medium transition-all outline-none cursor-pointer"
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)',
        }}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sort || 'createdAt-desc'}
        onChange={(e) => handleChange('sort', e.target.value)}
        className="px-3 py-2 rounded-xl border text-xs font-medium transition-all outline-none cursor-pointer"
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)',
        }}
        aria-label="Sort tasks"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
          aria-label="Clear all filters"
        >
          <X size={12} />
          Clear
        </button>
      )}
    </div>
  );
}