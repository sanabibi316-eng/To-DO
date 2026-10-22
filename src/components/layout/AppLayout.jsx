import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Toast from '../ui/Toast';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0 pb-20 md:pb-0 overflow-x-hidden">
        <Outlet />
      </main>
      <MobileNav />
      <Toast />
    </div>
  );
}