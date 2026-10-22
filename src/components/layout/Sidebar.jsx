import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'My Tasks', path: '/tasks', icon: ClipboardList },
  { label: 'Today', path: '/today', icon: CalendarDays },
  { label: 'Upcoming', path: '/upcoming', icon: CalendarClock },
  { label: 'Completed', path: '/completed', icon: CheckCircle2 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 flex-shrink-0 z-30 ${
        collapsed ? 'w-[84px]' : 'w-[260px]'
      }`}
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      {/* Brand Header */}
      <div
        className="flex items-center gap-3 px-5 h-20 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 relative group shadow-md"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap size={22} className="text-white drop-shadow-sm" fill="white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <span className="text-[19px] font-extrabold tracking-tight gradient-text-vibrant block leading-tight">
              FocusFlow
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500/80 block mt-0.5">
              Workspace Pro
            </span>
          </div>
        )}
      </div>

      {/* Nav Section */}
      <nav className="flex-1 py-6 px-3.5 space-y-1.5 overflow-y-auto" aria-label="Main navigation">
        {!collapsed && (
          <p
            className="text-[11px] font-bold uppercase tracking-wider px-3 mb-2.5"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 group relative ${
                collapsed ? 'justify-center' : ''
              } ${active ? 'shadow-sm' : ''}`}
              style={{
                backgroundColor: active ? 'var(--accent-subtle)' : 'transparent',
                color: active ? '#6366f1' : 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title={collapsed ? item.label : undefined}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <div
                  className="absolute left-1 top-2.5 bottom-2.5 w-1.5 rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                  }}
                />
              )}
              <div
                className={`p-1.5 rounded-xl transition-transform duration-200 ${
                  active ? 'bg-indigo-500/10 text-indigo-500 scale-105' : 'group-hover:scale-110'
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.5 : 2} />
              </div>
              {!collapsed && <span className="font-medium tracking-tight">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer controls & Profile card */}
      <div
        className="px-3.5 pb-5 pt-3 border-t space-y-2 flex-shrink-0"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-[14px] font-medium transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          style={{
            backgroundColor: isActive('/settings') ? 'var(--accent-subtle)' : 'transparent',
            color: isActive('/settings') ? '#6366f1' : 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            if (!isActive('/settings')) e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
          }}
          onMouseLeave={(e) => {
            if (!isActive('/settings')) e.currentTarget.style.backgroundColor = 'transparent';
          }}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3.5 px-3.5 py-2 rounded-2xl text-[13px] font-medium transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>

        {/* User Card */}
        <div
          className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            }}
          >
            FF
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-bold truncate leading-tight" style={{ color: 'var(--text-primary)' }}>
                  Focus User
                </p>
                <Sparkles size={12} className="text-amber-500 flex-shrink-0" fill="#f59e0b" />
              </div>
              <p className="text-[11px] font-medium truncate mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                Productivity Master
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
