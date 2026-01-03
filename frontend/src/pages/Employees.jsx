import React, { useState, useEffect } from 'react';
import api from '../api';
import { Search, Filter, Plus, MoreVertical, X, User } from 'lucide-react';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- NEW: MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    department: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Employees (Read from Backend)
  const fetchEmployees = async () => {
    try {
      const res = await api.get('employees/');
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 2. Create Employee (Send to Backend)
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('employees/', formData); // <--- HITS THE BACKEND
      alert("Employee Added Successfully!");
      setIsModalOpen(false); // Close Modal
      setFormData({ first_name: '', last_name: '', email: '', role: '', department: '' }); // Reset Form
      fetchEmployees(); // Refresh List
    } catch (error) {
      console.error("Failed to create", error);
      alert("Error: " + (error.response?.data?.detail || "Could not add employee."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team members and permissions.</p>
        </div>
        {/* THIS BUTTON NOW OPENS THE MODAL */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <Plus size={20} className="mr-2" />
          Add Employee
        </button>
      </div>

      {/* --- NEW: THE MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <User className="mr-2 text-indigo-600" /> Add New Employee
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateEmployee} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    required type="text" className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    required type="text" className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required type="email" className="w-full p-2 border border-gray-300 rounded-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Job Title</label>
                  <input 
                    required type="text" placeholder="e.g. Accountant" className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input 
                    required type="text" placeholder="e.g. Finance" className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 mt-4 disabled:bg-gray-400"
              >
                {submitting ? "Saving..." : "Save Employee"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter size={20} className="mr-2" />
          Filter
        </button>
      </div>

      {/* Employees Table (Responsive Wrapper Included) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"> 
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-500">Loading...</td></tr>
              ) : employees.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-500">No employees found.</td></tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        
                        {/* --- CONSISTENT REAL FACE (Using Name) --- */}
                        <img 
                          src={`https://i.pravatar.cc/150?u=${emp.first_name} ${emp.last_name}`} 
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-200"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="h-10 w-10 rounded-full bg-indigo-100 hidden items-center justify-center text-indigo-700 font-bold mr-3">
                            {emp.first_name.charAt(0)}
                        </div>
                        {/* --- END FACE --- */}

                        <div>
                          <div className="text-sm font-medium text-gray-900">{emp.first_name} {emp.last_name}</div>
                          <div className="text-sm text-gray-500">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{emp.role}</div>
                      <div className="text-sm text-gray-500">{emp.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;