import React, { useState, useEffect } from 'react';
import api from '../api';
import { DollarSign, Calendar, CheckCircle, Play, Download } from 'lucide-react';

const Payroll = () => {
  const [payrollHistory, setPayrollHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // For the "Running..." spinner

  // 1. Fetch History
  const fetchPayroll = async () => {
    try {
      const res = await api.get('payroll/');
      setPayrollHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading payroll", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  // 2. The "Magic" Button Logic
  const handleRunPayroll = async () => {
    if (!window.confirm("Are you sure you want to run payroll for the current month?")) return;
    
    setProcessing(true);
    try {
      const res = await api.post('payroll/'); // Hits your backend engine
      alert(res.data.message); // "Successfully ran payroll..."
      fetchPayroll(); // Refresh the list instantly
    } catch (error) {
      alert(error.response?.data?.error || "Failed to run payroll");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll System</h1>
          <p className="text-sm text-gray-500 mt-1">Manage salaries and generate monthly payslips.</p>
        </div>
        
        {/* The "Money Button" */}
        <button 
          onClick={handleRunPayroll}
          disabled={processing}
          className={`flex items-center px-6 py-3 rounded-lg text-white font-bold shadow-lg transition-all
            ${processing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95'
            }`}
        >
          {processing ? (
            <span>Processing...</span>
          ) : (
            <>
              <Play size={20} className="mr-2 fill-current" />
              Run Payroll
            </>
          )}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Payroll (YTD)</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">$1.2M</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-green-600"><DollarSign size={24} /></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Last Pay Date</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {payrollHistory.length > 0 ? payrollHistory[0].date : "N/A"}
              </h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Calendar size={24} /></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">Active</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><CheckCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
        </div>
        
        {loading ? (
             <div className="p-10 text-center text-gray-500">Loading Payroll Data...</div>
        ) : (
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax (20%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Payslip</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {payrollHistory.length === 0 ? (
                    <tr><td colSpan="7" className="px-6 py-10 text-center text-gray-500 italic">No payroll records found. Click "Run Payroll" to start.</td></tr>
                ) : (
                    payrollHistory.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.month}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R {record.basic}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">- R {record.tax}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">R {record.net}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {record.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end w-full">
                                <Download size={16} className="mr-1" /> PDF
                            </button>
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

export default Payroll;