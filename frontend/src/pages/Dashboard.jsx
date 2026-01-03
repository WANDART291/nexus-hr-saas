import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp, UserPlus, PlayCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Employees */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">24</h3>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">
                +4 this month
              </span>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* Card 2: Leave */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Leave</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full mt-2 inline-block">
                Requires attention
              </span>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
              <Calendar size={24} />
            </div>
          </div>
        </div>

        {/* Card 3: Payroll */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Payroll Status</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">Pending</h3>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-2 inline-block">
                Due in 5 days
              </span>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* Card 4: Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Performance</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">4.2</h3>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full mt-2 inline-block">
                Top 15% industry
              </span>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activity & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-6">
            {/* Activity Item 1 */}
            <div className="flex items-start">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-900">Sarah Connor</p>
                <p className="text-sm text-gray-500">requested sick leave &bull; <span className="text-gray-400">2 hours ago</span></p>
              </div>
            </div>
            {/* Activity Item 2 */}
            <div className="flex items-start">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-900">Miles Dyson</p>
                <p className="text-sm text-gray-500">approved 3 payroll batches &bull; <span className="text-gray-400">4 hours ago</span></p>
              </div>
            </div>
            {/* Activity Item 3 */}
            <div className="flex items-start">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-900">T800 Model</p>
                <p className="text-sm text-gray-500">completed performance review &bull; <span className="text-gray-400">1 day ago</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
          <p className="text-slate-400 text-sm mb-6">Shortcuts for your most frequent tasks.</p>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center py-3 px-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700">
              <UserPlus size={18} className="mr-2" />
              Add Employee
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-lg shadow-indigo-900/50">
              <PlayCircle size={18} className="mr-2" />
              Run Payroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;