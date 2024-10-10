import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Briefcase, LayoutDashboard, Settings, User } from 'lucide-react';
import Logo from '../assets/images/Frame 1707478528.png';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen || window.innerWidth >= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const closeSidebarOnClick = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="relative">
      {/* Toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 focus:outline-none fixed top-0 left-0 z-20"
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-30 flex flex-col justify-between overflow-y-scroll`}
        style={{ height: '100vh', overflowY: 'scroll' }} // Ensures scrollbar is always visible
      >
        <div>
          {/* Sidebar logo */}
          <div className="flex items-center justify-center p-2">
            <img src={Logo} alt="IntelliRecruit Logo" className="h-10 w-auto" />
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col space-y-2 px-2 mt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]'
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent'
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick}
            >
              <Home className="mr-2 h-5 w-5" /> Dashboard
            </NavLink>

            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]'
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent'
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick}
            >
              <Users className="mr-2 h-5 w-5" /> Candidates
            </NavLink>

            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]'
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent'
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick}
            >
              <Briefcase className="mr-2 h-5 w-5" /> Jobs
            </NavLink>

            <NavLink
              to="/psychometrics"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg border-2 font-inter ${
                  isActive
                    ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]'
                    : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent'
                } transition-all duration-300`
              }
              onClick={closeSidebarOnClick}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" /> Psychometrics
            </NavLink>
          </nav>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col p-2 space-y-2">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg border-2 font-inter ${
                isActive
                  ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]'
                  : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent'
              } transition-all duration-300`
            }
            onClick={closeSidebarOnClick}
          >
            <Settings className="mr-2 h-5 w-5" /> Settings
          </NavLink>

          <NavLink
            to="/user-account"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg border-2 font-inter ${
                isActive
                  ? 'bg-[#FFF6ED] text-[#393939] border-t-[2px] border-b-[6px] border-[#FD8809]'
                  : 'text-[#393939] border-transparent hover:bg-gray-100 border-t-[2px] border-b-[6px] border-transparent'
              } transition-all duration-300`
            }
            onClick={closeSidebarOnClick}
          >
            <User className="mr-2 h-5 w-5" /> User Account
          </NavLink>
        </div>
      </div>

      {/* Overlay when sidebar is open (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
