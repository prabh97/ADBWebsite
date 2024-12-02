import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BarChart2, Database, LineChart, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/dashboard/data-collection', icon: Database, label: 'Data Collection' },
  { to: '/dashboard/analysis', icon: BarChart2, label: 'Analysis' },
  { to: '/dashboard/visualization', icon: LineChart, label: 'Visualization' },
];

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? 'border-adb-accent text-adb-blue'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </NavLink>
            ))}
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-adb-blue hover:bg-adb-light-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-adb-accent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}