import { useState, useRef, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search tasks or press ⌘K...' }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all duration-200 ${
          isFocused ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]' : ''
        }`}
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: isFocused ? undefined : 'var(--border-color)',
        }}
      >
        <Search size={16} className="text-indigo-500 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-[13.5px] font-medium flex-1 min-w-0 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Search tasks"
        />
        {value ? (
          <button
            onClick={() => onChange('')}
            className="p-1 rounded-lg hover:bg-slate-500/10 transition-colors"
            aria-label="Clear search"
          >
            <X size={14} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        ) : (
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold rounded-lg border shadow-xs"
            style={{
              color: 'var(--text-tertiary)',
              borderColor: 'var(--border-subtle)',
              backgroundColor: 'var(--bg-tertiary)',
            }}
          >
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  );
}
