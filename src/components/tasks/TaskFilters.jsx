import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
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
    <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl glass-panel border" style={{ borderColor: 'var(--border-subtle)' }}>
      {/* Status Selector */}
      <div className="relative">
        <select
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-3.5 py-2 rounded-xl border text-xs font-bold transition-all outline-none cursor-pointer appearance-none pr-8"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Filter by status"
        >
          <option value="">Status: All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-50">▼</span>
      </div>

      {/* Priority Selector */}
      <div className="relative">
        <select
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="px-3.5 py-2 rounded-xl border text-xs font-bold transition-all outline-none cursor-pointer appearance-none pr-8"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Filter by priority"
        >
          <option value="">Priority: All</option>
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.icon} {p.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-50">▼</span>
      </div>

      {/* Category Selector */}
      <div className="relative">
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="px-3.5 py-2 rounded-xl border text-xs font-bold transition-all outline-none cursor-pointer appearance-none pr-8"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Filter by category"
        >
          <option value="">Category: All</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-50">▼</span>
      </div>

      {/* Sort Options */}
      <div className="relative ml-auto">
        <select
          value={filters.sort || 'createdAt-desc'}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="px-3.5 py-2 rounded-xl border text-xs font-bold transition-all outline-none cursor-pointer appearance-none pr-8"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Sort tasks"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-50">▼</span>
      </div>

      {/* Clear Filters Button */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors"
          aria-label="Clear all filters"
        >
          <X size={13} strokeWidth={2.5} />
          Reset
        </button>
      )}
    </div>
  );
}
