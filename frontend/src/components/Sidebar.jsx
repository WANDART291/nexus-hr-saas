import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Employees", path: "/employees" },
    { icon: Calendar, label: "Leave", path: "/leave" },
    { icon: DollarSign, label: "Payroll", path: "/payroll" },
    { icon: TrendingUp, label: "Performance", path: "/performance" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 flex flex-col shadow-xl">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-8 border-b border-slate-700">
        <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
          <span className="font-bold text-xl">N</span>
        </div>
        <h1 className="text-xl font-bold tracking-wider">NEXUS HR</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <item.icon size={20} className="mr-3" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User / Logout Section */}
      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;