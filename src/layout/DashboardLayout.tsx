import { Outlet } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import Sidebar from '../ui/Sidebar';

function DashboardLayout() {
  return (
    <>
      <Header />

      <div className="grid grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
        <Sidebar />

        <main className="bg-stone-150 dark:bg-gray-800 pt-5 px-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default DashboardLayout;
