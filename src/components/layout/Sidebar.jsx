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
  Zap,
  User,
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
      className={`hidden md:flex flex-col h-screen sticky top-0 border-r transition-all duration-300 flex-shrink-0 ${
        collapsed ? 'w-[76px]' : 'w-[240px]'
      }`}
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 h-16 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          }}
        >
          <Zap size={18} className="text-white" fill="white" />
        </div>
        {!collapsed && (
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            FocusFlow
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {!collapsed && (
          <p
            className="text-[11px] font-semibold uppercase tracking-wider px-3 mb-2"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Workspace
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all relative ${
                collapsed ? 'justify-center' : ''
              }`}
              style={{
                backgroundColor: active ? 'var(--accent-glow)' : 'transparent',
                color: active ? '#7c3aed' : 'var(--text-secondary)',
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
              {active && !collapsed && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ backgroundColor: '#7c3aed' }}
                />
              )}
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="px-3 pb-4 pt-3 border-t space-y-1 flex-shrink-0"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          style={{
            backgroundColor: isActive('/settings') ? 'var(--accent-glow)' : 'transparent',
            color: isActive('/settings') ? '#7c3aed' : 'var(--text-secondary)',
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
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* User card */}
        <div
          className={`flex items-center gap-3 px-2.5 py-2.5 mt-2 rounded-xl ${
            collapsed ? 'justify-center' : ''
          }`}
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            }}
          >
            U
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p
                className="text-[13px] font-semibold truncate leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                User
              </p>
              <p
                className="text-[11px] truncate mt-0.5"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Free Plan
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}