import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useTasks } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, TrendingUp, Award } from 'lucide-react';

export default function ProductivityChart() {
  const { weeklyData } = useTasks();
  const { theme } = useTheme();
  const totalCompleted = weeklyData.reduce((sum, d) => sum + d.completed, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-4 py-3 rounded-2xl border shadow-xl text-xs backdrop-blur-md"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <p className="font-bold text-sm tracking-tight mb-1">{payload[0]?.payload?.fullLabel}</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="font-semibold text-indigo-500">
              {payload[0]?.value} tasks finished
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl p-6 sm:p-7 glass-panel card-interactive h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Weekly Velocity
            </h3>
            <span className="badge-pill bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
              Live Flow
            </span>
          </div>
          <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-tertiary)' }}>
            {totalCompleted > 0
              ? `${totalCompleted} tasks crushed across this week`
              : 'Complete tasks to see your daily output analytics'}
          </p>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-sm">
          <TrendingUp size={20} strokeWidth={2.4} />
        </div>
      </div>

      {totalCompleted === 0 ? (
        <div className="h-56 flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-2xl" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-3">
            <Sparkles size={24} />
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            No completed tasks recorded this week
          </p>
          <p className="text-xs mt-1 max-w-xs" style={{ color: 'var(--text-tertiary)' }}>
            Check off items from your task list to generate dynamic velocity curves and progress data.
          </p>
        </div>
      ) : (
        <div className="w-full h-56 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}
                vertical={false}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: theme === 'dark' ? '#64748b' : '#94a3b8', fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: theme === 'dark' ? '#64748b' : '#94a3b8', fontWeight: 500 }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#velocityGradient)"
                activeDot={{ r: 6, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
