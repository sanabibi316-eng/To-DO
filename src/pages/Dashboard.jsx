import TopNav from '../components/layout/TopNav';
import StatsCards from '../components/dashboard/StatsCards';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import { getGreeting } from '../utils/helpers';
import { Sparkles, Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Dashboard() {
  const { stats } = useTasks();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-entrance">
        {/* Hero Welcome Banner */}
        <div
          className="relative rounded-3xl p-6 sm:p-8 overflow-hidden glass-panel border"
          style={{
            borderColor: 'var(--border-color)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.06) 100%)',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Sparkles size={13} />
                <span>Productivity Command Center</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {getGreeting()}, <span className="gradient-text-vibrant">Focus Flow</span>
              </h2>
              <p className="text-sm sm:text-base font-medium max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                You have <strong className="text-indigo-500">{stats.pending} pending tasks</strong> requiring your attention today. Let's make every second count.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold shadow-sm"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Calendar size={14} className="text-indigo-500" />
                <span>{today}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <StatsCards />

        {/* Charts & Tasks Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ProductivityChart />
          </div>
          <div className="lg:col-span-2">
            <RecentTasks />
          </div>
        </div>
      </div>
    </div>
  );
}
