import { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Sparkles } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead, clearNotifications } = useTasks();
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-subtle)',
        }}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-3 w-84 sm:w-96 rounded-3xl border shadow-2xl z-50 overflow-hidden animate-entrance"
          style={{
            backgroundColor: 'var(--card-bg-solid)',
            borderColor: 'var(--border-color)',
          }}
          role="menu"
          aria-label="Notifications"
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Activity & Alerts
              </h3>
              {unreadCount > 0 && (
                <span className="badge-pill bg-indigo-500/10 text-indigo-500 text-[10px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {notifications.length === 0 ? (
              <div className="py-10 px-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto mb-3">
                  <Sparkles size={22} />
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
                  All Caught Up!
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  No pending alerts or notifications right now.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markNotificationRead(notification.id)}
                  className="w-full text-left px-5 py-3.5 transition-colors flex items-start gap-3 hover:bg-slate-500/5"
                  style={{
                    backgroundColor: notification.read ? 'transparent' : 'var(--accent-subtle)',
                  }}
                  role="menuitem"
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                      notification.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-indigo-500 shadow-sm'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {notification.message}
                    </p>
                    <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
