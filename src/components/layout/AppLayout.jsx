import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Toast from '../ui/Toast';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full relative">
      {/* Background Decorative Mesh Orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>

      <Sidebar />
      <main className="flex-1 min-w-0 pb-24 md:pb-8 overflow-x-hidden relative z-10">
        <Outlet />
      </main>
      <MobileNav />
      <Toast />
    </div>
  );
}
