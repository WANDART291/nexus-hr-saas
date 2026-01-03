import React from 'react';
import Layout from '../components/Layout';
import { Star, TrendingUp, Target, Award, CheckCircle } from 'lucide-react';

const Performance = () => {
  // Mock Data for Top Performers - Now with Real Images
  const topPerformers = [
    { 
      id: 1, 
      name: "Sarah Connor", 
      role: "Software Engineer", 
      score: 4.9, 
      review: "Exceptional code quality.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    { 
      id: 2, 
      name: "T800 Model", 
      role: "DevOps Engineer", 
      score: 4.8, 
      review: "100% system uptime achieved.",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    { 
      id: 3, 
      name: "Miles Dyson", 
      role: "Director of Tech", 
      score: 4.7, 
      review: "Great leadership this quarter.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
  ];

  // Mock Data for Company Goals
  const companyGoals = [
    { id: 1, title: "Q4 Revenue Target", progress: 75, color: "bg-green-500" },
    { id: 2, title: "Customer Satisfaction", progress: 92, color: "bg-blue-500" },
    { id: 3, title: "System Migration", progress: 45, color: "bg-orange-500" },
    { id: 4, title: "Employee Retention", progress: 88, color: "bg-purple-500" },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance & Goals</h1>
          <p className="text-sm text-gray-500 mt-1">Track employee reviews and company objectives.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm font-medium flex items-center">
          <Target size={18} className="mr-2" /> New Goal
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Average Team Score</p>
              <h3 className="text-3xl font-bold mt-2">4.2 / 5.0</h3>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Star className="text-white" size={24} fill="white" />
            </div>
          </div>
          <p className="text-indigo-100 text-sm mt-4 flex items-center">
            <TrendingUp size={16} className="mr-1" /> +0.3 from last quarter
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm font-medium">Reviews Completed</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">21 / 24</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm font-medium">Outstanding Awards</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">5</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <Award size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Recognize excellence today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section 1: Top Performers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Top Performers (Q4)</h3>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">Top 10%</span>
          </div>
          <div className="p-6 space-y-6">
            {topPerformers.map((person) => (
              <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* UPDATED: Using Image tag instead of Initials div */}
                  <img 
                    className="h-12 w-12 rounded-full object-cover border-2 border-indigo-100" 
                    src={person.image} 
                    alt={person.name} 
                  />
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-400">
                    <span className="text-gray-900 font-bold mr-1 text-lg">{person.score}</span>
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs text-gray-400 italic">"{person.review}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Company Goals (Progress Bars) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-800">Company Goals</h3>
          </div>
          <div className="p-6 space-y-6">
            {companyGoals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                  <span className="text-sm font-medium text-gray-500">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${goal.color}`} 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-100">
            <button className="w-full text-center text-sm text-indigo-600 font-medium hover:text-indigo-800">
              View All OKRs &rarr;
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Performance;