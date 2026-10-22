import { SlidersHorizontal, ArrowUpDown, X, ChevronDown } from 'lucide-react';
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
    <div className="flex flex-wrap items-center gap-2 p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      {/* Status */}
      <div className="relative">
        <select
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-label="Filter by status"
        >
          <option value="">Status: All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Priority */}
      <div className="relative">
        <select
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-label="Filter by priority"
        >
          <option value="">Priority: All</option>
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Category */}
      <div className="relative">
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-label="Filter by category"
        >
          <option value="">Category: All</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Sort */}
      <div className="relative ml-auto">
        <select
          value={filters.sort || 'createdAt-desc'}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-label="Sort tasks"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Clear Filters Button */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          aria-label="Clear all filters"
        >
          <X size={12} strokeWidth={2.5} />
          Reset
        </button>
      )}
    </div>
  );
}
