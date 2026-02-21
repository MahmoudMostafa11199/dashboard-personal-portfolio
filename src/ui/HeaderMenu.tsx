import { useNavigate } from 'react-router';
import { HiOutlineUser } from 'react-icons/hi2';

import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';
import Logout from './Logout';

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex items-center gap-4">
      <li>
        <ButtonIcon title="account" onclick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
