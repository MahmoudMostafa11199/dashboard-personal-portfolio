import { Link } from 'react-router';

import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from '../ui/HeaderMenu';
import Logo from '../ui/Logo';
import { useSidebar } from '../hooks/useSidebar';
import { HiBars3 } from 'react-icons/hi2';

function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="px-6 py-3 bg-stone-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile/tablet only */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle sidebar"
            className="md:hidden p-2 -ml-2 rounded hover:bg-stone-150 dark:hover:bg-gray-700 transition-colors"
          >
            <HiBars3 size={22} />
          </button>

          <Link to="/dashboard">
            <span className="hidden md:block">
              <Logo />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <UserAvatar />

          <HeaderMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
