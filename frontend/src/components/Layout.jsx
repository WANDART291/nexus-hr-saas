import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Helper to highlight the active link
  const linkClass = (path) => 
    `block py-3 px-4 rounded transition duration-200 ${
      location.pathname === path 
        ? 'bg-indigo-700 text-white font-bold' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* --- MOBILE OVERLAY (Click to close sidebar) --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR --- */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 font-bold text-2xl tracking-wider border-b border-gray-800 flex justify-between items-center">
          <span>NEXUS HR</span>
          {/* Close button for mobile */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <Link to="/" className={linkClass('/')} onClick={() => setIsSidebarOpen(false)}>
            📊 Dashboard
          </Link>
          <Link to="/employees" className={linkClass('/employees')} onClick={() => setIsSidebarOpen(false)}>
            👥 Employees
          </Link>
          <Link to="/leave" className={linkClass('/leave')} onClick={() => setIsSidebarOpen(false)}>
            📅 Leave
          </Link>
          <Link to="/payroll" className={linkClass('/payroll')} onClick={() => setIsSidebarOpen(false)}>
            💰 Payroll
          </Link>
          <Link to="/performance" className={linkClass('/performance')} onClick={() => setIsSidebarOpen(false)}>
            📈 Performance
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="bg-white shadow-sm p-4 flex items-center md:hidden">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <span className="ml-4 font-bold text-gray-800 text-lg">Nexus HR</span>
        </header>

        {/* The Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;