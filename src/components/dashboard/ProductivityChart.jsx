import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTasks } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { TrendingUp } from 'lucide-react';

export default function ProductivityChart() {
  const { weeklyData } = useTasks();
  const { theme } = useTheme();
  const totalCompleted = weeklyData.reduce((sum, d) => sum + d.completed, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded-lg border shadow-lg text-xs"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <p className="font-medium">{payload[0]?.payload?.fullLabel}</p>
          <p style={{ color: '#8b5cf6' }}>{payload[0]?.value} tasks completed</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Weekly Productivity
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            {totalCompleted} tasks completed this week
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
          <TrendingUp size={18} className="text-primary-500" />
        </div>
      </div>

      {totalCompleted === 0 ? (
        <div className="h-48 flex flex-col items-center justify-center text-center">
          <TrendingUp size={32} style={{ color: 'var(--text-tertiary)' }} className="mb-2" />
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            No completed tasks this week
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Complete tasks to see your productivity chart
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2a2a4a' : '#f0f0f0'} vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#6a6a8a' : '#8a8aa3' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#6a6a8a' : '#8a8aa3' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: theme === 'dark' ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.05)' }} />
            <Bar dataKey="completed" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}