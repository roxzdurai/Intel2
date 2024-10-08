import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Briefcase, LayoutDashboard, Settings, User } from 'lucide-react'; // Import the icons from lucide-react
import Logo from '../assets/images/Frame 1707478528.png';  // Update the path as needed

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white flex flex-col justify-between shadow-md">
      {/* Sidebar header */}
      <div>
        <div className="flex items-center justify-center p-4">
          <img src={Logo} alt="IntelliRecruit Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 px-4 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${isActive ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <Home className="mr-2 h-5 w-5" /> {/* Icon for Dashboard */}
            Dashboard
          </NavLink>

          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${isActive ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <Users className="mr-2 h-5 w-5" /> {/* Icon for Candidates */}
            Candidates
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${isActive ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <Briefcase className="mr-2 h-5 w-5" /> {/* Icon for Jobs */}
            Jobs
          </NavLink>

          <NavLink
            to="/psychometrics"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${isActive ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <LayoutDashboard className="mr-2 h-5 w-5" /> {/* Icon for Psychometrics */}
            Psychometrics
          </NavLink>
        </nav>
      </div>

      {/* Settings and User Account */}
      <div className="flex flex-col p-4 space-y-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-100 text-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          <Settings className="mr-2 h-5 w-5" /> {/* Icon for Settings */}
          Settings
        </NavLink>

        <NavLink
          to="/user-account"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-100 text-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          <User className="mr-2 h-5 w-5" /> {/* Icon for User Account */}
          User Account
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
