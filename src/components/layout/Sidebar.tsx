import { ReactNode } from 'react'
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { FaTable, FaUserGroup } from "react-icons/fa6";
import { TbVs } from "react-icons/tb";
import { NavLink, useLocation } from 'react-router';
import { SidebarMenus } from '../../constants';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

type NavItemProps = {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const Sidebar = ({
  isOpen,
  toggle
}: Props) => {
  const { REACT_APP_API_URL } = process.env;
  const location = useLocation();
  const currentPath = location.pathname;


  const NavItem = ({ icon, label, href, active }: NavItemProps) => (
    <NavLink to={href} className={`flex items-center gap-3 px-3 py-3 mt-2 text-gray-600 hover:bg-blue-600/10 rounded-lg transition duration-200 ${active ? 'bg-main-blue text-white font-bold' : ''}`}>
      {icon}
      {label}
    </NavLink>
  );

  return (
    <div className=''>
      {/* Backdrop (visible only on mobile when open) */}
      <div 
        onClick={toggle} 
        className={`fixed inset-0 z-20 bg-black opacity-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
      ></div>

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-neutral-100 shadow-md transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:h-auto`}
      >
        <div className="flex items-center justify-center px-4 py-4">
          <div className='px-5 py-[1px] mt-2'>
            <img 
              src={`${REACT_APP_API_URL}/images/logo/logo-blue.svg`}
              alt=""
              className='h-10 w-auto'
            />
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={toggle} 
            className="text-gray-500 lg:hidden hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="mt-3 px-4 h-screen overflow-y-hidden">
          {SidebarMenus.map((menu, idx) => {
            let icon;
            if(menu.label.toLowerCase() === "dashboard") icon = <IoHome />;
            if(menu.label.toLowerCase() === "teams") icon = <FaUserGroup />;
            if(menu.label.toLowerCase() === "groups") icon = <FaTable />;
            if(menu.label.toLowerCase() === "matches") icon = <TbVs />;
            if(menu.label.toLowerCase() === "settings") icon = <IoSettingsSharp />;

            return (
              <NavItem key={`sidebar-nav-${idx}`} icon={icon} label={menu.label} href={menu.href} active={currentPath.includes(menu.href)} />
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar