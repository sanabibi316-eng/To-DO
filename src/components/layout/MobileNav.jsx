import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, CalendarDays, CheckCircle2, Settings } from 'lucide-react';

const items = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Tasks', path: '/tasks', icon: ClipboardList },
  { label: 'Today', path: '/today', icon: CalendarDays },
  { label: 'Done', path: '/completed', icon: CheckCircle2 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 rounded-3xl border shadow-xl flex items-center justify-around px-2 py-2.5"
      style={{
        backgroundColor: 'var(--card-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'var(--border-color)',
      }}
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl text-[11px] font-semibold transition-all duration-200 ${
              active ? 'scale-105' : 'opacity-70'
            }`}
            style={{
              color: active ? '#6366f1' : 'var(--text-tertiary)',
              backgroundColor: active ? 'var(--accent-subtle)' : 'transparent',
            }}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={active ? 2.6 : 2} />
            <span className="tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
