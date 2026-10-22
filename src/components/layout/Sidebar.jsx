import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  Calendar,
  Clock,
  CheckCircle2,
  Settings,
  ChevronRight,
  Zap,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'My Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Today', path: '/today', icon: Calendar },
  { label: 'Upcoming', path: '/upcoming', icon: Clock },
  { label: 'Completed', path: '/completed', icon: CheckCircle2 },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className="hidden md:flex flex-col w-[260px] h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 z-30"
    >
      {/* Brand Logo Header */}
      <div className="flex items-center gap-3.5 px-6 pt-7 pb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          }}
        >
          <Zap size={20} fill="white" />
        </div>
        <div>
          <span className="text-[19px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight block">
            FocusFlow
          </span>
          <span className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block">
            WORKSPACE PRO
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-3 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-medium transition-all text-left ${
                active
                  ? 'bg-indigo-50/80 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 1.8} className={active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Settings & User Card */}
      <div className="px-4 pb-6 pt-3 space-y-3">
        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-[14px] font-medium transition-all text-left ${
            isActive('/settings')
              ? 'bg-indigo-50/80 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
          }`}
        >
          <Settings size={18} strokeWidth={1.8} className="text-slate-400" />
          <span>Settings</span>
        </button>

        {/* User Card */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              FF
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate leading-snug">
                Focus User
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                Productivity Master
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 flex-shrink-0 mr-1" />
        </div>
      </div>
    </aside>
  );
}
