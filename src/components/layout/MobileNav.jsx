import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, CalendarDays, CheckCircle2, Settings } from 'lucide-react';

const items = [
  { label: 'Home', path: '/', icon: LayoutDashboard },
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl flex items-center justify-around px-2 py-2 pb-safe"
      style={{
        backgroundColor: 'var(--card-bg)',
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
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all min-w-[56px]"
            style={{
              color: active ? '#7c3aed' : 'var(--text-tertiary)',
              backgroundColor: active ? 'var(--accent-glow)' : 'transparent',
            }}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={19} strokeWidth={active ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}