import { NavLink } from 'react-router';
import { useSidebar } from '../hooks/useSidebar';

type Props = {
  href: string;
  children: React.ReactNode;
};

function NavItem({ href, children }: Props) {
  const { close } = useSidebar();

  return (
    <li>
      <NavLink
        to={href}
        onClick={close}
        className={({ isActive }) =>
          `group flex items-center gap-6 px-4 py-2.5 font-medium rounded transition-all 
           duration-300 hover:text-gray-800 hover:bg-stone-150 dark:hover:bg-gray-700 
          dark:text-gray-300 dark:hover:text-stone-50 ${
            isActive
              ? 'text-gray-800 bg-stone-150 dark:bg-gray-700 dark:text-stone-50'
              : ''
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
