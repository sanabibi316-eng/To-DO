import TopNav from '../components/layout/TopNav';
import StatsCards from '../components/dashboard/StatsCards';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import { getGreeting } from '../utils/helpers';

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-fade-in">
        {/* Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {getGreeting()}! <span className="inline-block animate-pulse">👋</span>
            </h2>
            <p
              className="text-[14px] sm:text-[15px] mt-1.5"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Here's what's happening with your tasks today.
            </p>
          </div>
          <p
            className="text-[13px] font-medium px-3 py-1.5 rounded-lg inline-block w-fit"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            {today}
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
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