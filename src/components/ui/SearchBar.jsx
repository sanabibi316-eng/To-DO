import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search tasks...' }) {
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
    <div className="relative">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
          isFocused ? 'border-primary-400 shadow-[0_0_0_3px_rgba(139,92,246,0.1)]' : ''
        }`}
        style={{
          backgroundColor: 'var(--input-bg)',
          borderColor: isFocused ? undefined : 'var(--border-color)',
        }}
      >
        <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 min-w-0"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Search tasks"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="hover:opacity-70 transition-opacity"
            aria-label="Clear search"
          >
            <X size={16} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        )}
        {!value && (
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded border"
            style={{
              color: 'var(--text-tertiary)',
              borderColor: 'var(--border-color)',
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