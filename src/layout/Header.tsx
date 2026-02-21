import { Link } from 'react-router';

import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from '../ui/HeaderMenu';
import Logo from '../ui/Logo';

function Header() {
  return (
    <header className="px-6 py-3 bg-stone-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex justify-between items-center">
        <Link to="/dashboard">
          <Logo />
        </Link>

        <div className="flex items-center gap-5">
          <UserAvatar />

          <HeaderMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;
