import { ListFilter, Flag, Tag, ArrowUpDown, ChevronDown } from 'lucide-react';
import { CATEGORIES, PRIORITIES, SORT_OPTIONS } from '../../utils/constants';

export default function TaskFilters({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const currentStatusLabel = filters.status
    ? filters.status === 'completed'
      ? 'Completed'
      : filters.status === 'pending'
      ? 'Pending'
      : 'Overdue'
    : 'All';

  const currentPriorityLabel = filters.priority
    ? PRIORITIES.find((p) => p.id === filters.priority)?.label || 'All'
    : 'All';

  const currentCategoryLabel = filters.category
    ? CATEGORIES.find((c) => c.id === filters.category)?.label || 'All'
    : 'All';

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.id === (filters.sort || 'createdAt-desc'))?.label || 'Recently Created';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Pill */}
      <div className="relative">
        <select
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          aria-label="Filter by status"
        >
          <option value="">Status: All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <div className="filter-pill cursor-pointer">
          <ListFilter size={14} className="text-slate-400" />
          <span>Status: {currentStatusLabel}</span>
          <ChevronDown size={13} className="text-slate-400 ml-1" />
        </div>
      </div>

      {/* Priority Pill */}
      <div className="relative">
        <select
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          aria-label="Filter by priority"
        >
          <option value="">Priority: All</option>
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <div className="filter-pill cursor-pointer">
          <Flag size={13} className="text-slate-400" />
          <span>Priority: {currentPriorityLabel}</span>
          <ChevronDown size={13} className="text-slate-400 ml-1" />
        </div>
      </div>

      {/* Category Pill */}
      <div className="relative">
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          aria-label="Filter by category"
        >
          <option value="">Category: All</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <div className="filter-pill cursor-pointer">
          <Tag size={13} className="text-slate-400" />
          <span>Category: {currentCategoryLabel}</span>
          <ChevronDown size={13} className="text-slate-400 ml-1" />
        </div>
      </div>

      {/* Sort Pill */}
      <div className="relative">
        <select
          value={filters.sort || 'createdAt-desc'}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          aria-label="Sort tasks"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="filter-pill cursor-pointer">
          <ArrowUpDown size={13} className="text-slate-400" />
          <span>Sort: {currentSortLabel}</span>
          <ChevronDown size={13} className="text-slate-400 ml-1" />
        </div>
      </div>
    </div>
  );
}
