import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-nexus-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <Header />
        <main className="flex-1 overflow-auto pt-16 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
