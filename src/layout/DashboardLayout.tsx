import { Outlet } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import Sidebar from '../ui/Sidebar';
import { SidebarProvider } from '../hooks/useSidebar';

function DashboardLayout() {
  return (
    <SidebarProvider>
      <Header />

      <div className="md:grid md:grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
        <Sidebar />

        <main className="bg-stone-150 dark:bg-gray-800 pt-7 px-5">
          <Outlet />
        </main>

        <Footer />
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
