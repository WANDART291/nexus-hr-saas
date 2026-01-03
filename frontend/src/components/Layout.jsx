import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, DollarSign, TrendingUp, Settings, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate(); // <--- 1. Initialize the navigation hook

  // <--- 2. The Logout Logic
  const handleLogout = () => {
    localStorage.clear(); // Wipe the security token
    navigate('/login');   // Send user back to Login screen
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employees', label: 'Employees', icon: Users },
    { path: '/leave', label: 'Leave', icon: Calendar },
    { path: '/payroll', label: 'Payroll', icon: DollarSign },
    { path: '/performance', label: 'Performance', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <div className="bg-indigo-600 p-1.5 rounded mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
            </div>
            NEXUS HR
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout} // <--- 3. Connected the logic here
            className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full rounded-lg"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;