import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className="row-span-2 bg-stone-50 border-e-1 border-gray-50 px-4 py-6 dark:bg-gray-900 dark:border-gray-600">
      <MainNav />
    </aside>
  );
}

export default Sidebar;
