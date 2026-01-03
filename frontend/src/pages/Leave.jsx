import React, { useState, useEffect } from 'react';
import api from '../api';
import { Calendar, Clock, CheckCircle, Plus, Filter, X } from 'lucide-react';

const Leave = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    leave_type: 'Annual Leave',
    start_date: '',
    end_date: '',
    reason: ''
  });

  // 1. Fetch Data
  const fetchLeave = async () => {
    try {
      const res = await api.get('leave/');
      setLeaveHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  // 2. Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('leave/', formData);
      setIsModalOpen(false);
      setFormData({ leave_type: 'Annual Leave', start_date: '', end_date: '', reason: '' }); 
      fetchLeave(); 
      alert("Leave Request Sent!");
    } catch (error) {
      console.error("Error creating leave", error);
      alert("Failed to create request. " + (error.response?.data?.error || "Server Error"));
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track balances and manage requests.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} className="mr-2" />
          New Request
        </button>
      </div>

      {/* --- THE MODAL (Popup) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Request Leave</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={formData.leave_type}
                  onChange={(e) => setFormData({...formData, leave_type: e.target.value})}
                >
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Family Responsibility</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Optional reason..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Annual Leave</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">12 <span className="text-sm text-gray-400 font-normal">/ 21 days</span></h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Calendar size={24} /></div>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-3/5"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                <p className="text-sm font-medium text-gray-500">Sick Leave</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">4 <span className="text-sm text-gray-400 font-normal">/ 10 days</span></h3>
                </div>
                <div className="p-2 bg-red-50 rounded-lg text-red-600"><Clock size={24} /></div>
            </div>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-2/5"></div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {leaveHistory.filter(l => l.status === 'Pending').length}
                </h3>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600"><CheckCircle size={24} /></div>
            </div>
        </div>
      </div>

      {/* Leave History Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Leave History</h2>
          <button className="text-gray-500 hover:text-gray-700 flex items-center text-sm font-medium">
            <Filter size={18} className="mr-2" /> Filter
          </button>
        </div>
        
        {loading ? (
             <div className="p-10 text-center text-gray-500">Loading Leave Data...</div>
        ) : (
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {leaveHistory.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">No leave requests found.</td></tr>
                ) : (
                    leaveHistory.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            
                            {/* --- AVATAR MAGIC START (Using Name as Seed) --- */}
                            <img 
                                src={`https://i.pravatar.cc/150?u=${leave.employee}`} 
                                alt="Profile"
                                className="h-8 w-8 rounded-full object-cover mr-3 border border-gray-200"
                                onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback Initials */}
                            <div className="h-8 w-8 rounded-full bg-indigo-100 hidden items-center justify-center text-indigo-700 font-bold mr-3">
                              {leave.employee ? leave.employee.charAt(0) : '?'}
                            </div>
                            {/* --- AVATAR MAGIC END --- */}

                            <div className="text-sm font-medium text-gray-900">
                                {leave.employee || "Unknown Employee"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.days} days</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.start_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                            {leave.status}
                        </span>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default Leave;
