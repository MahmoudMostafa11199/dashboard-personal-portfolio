import { useSidebar } from '../hooks/useSidebar';
import MainNav from './MainNav';

function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-stone-50 border-e-1 border-gray-50 px-4 py-6 dark:bg-gray-900 dark:border-gray-600 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:row-span-2 md:z-auto`}
      >
        <MainNav />
      </aside>
    </>
  );
}

export default Sidebar;
