import { FaCertificate, FaCog } from 'react-icons/fa';
import {
  HiBriefcase,
  HiClipboardDocumentList,
  HiHome,
  HiStar,
} from 'react-icons/hi2';

import NavItem from './NavItem';

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <NavItem href="/dashboard">
          <HiHome className="icon" />
          <span>Home</span>
        </NavItem>
        <NavItem href="/projects">
          <HiClipboardDocumentList className="icon" />
          <span>Projects</span>
        </NavItem>
        <NavItem href="/skills">
          <HiStar className="icon" />
          <span>Skills</span>
        </NavItem>
        <NavItem href="/experiences">
          <HiBriefcase className="icon" />
          <span>Experiences</span>
        </NavItem>
        <NavItem href="/certifications">
          <FaCertificate className="icon" />
          <span>Certifications</span>
        </NavItem>
        <NavItem href="/settings">
          <FaCog className="icon" />
          <span>Settings</span>
        </NavItem>
      </ul>
    </nav>
  );
}

export default MainNav;
