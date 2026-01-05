import { useState, useEffect } from 'react';
import api from '../api';

const Performance = () => {
  const [reviews, setReviews] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employee_id: '', title: '', rating: 5, feedback: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch Reviews AND Employees when page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsRes = await api.get('/performance/reviews/');
        const employeesRes = await api.get('/employees/'); // We need this to pick who to review
        setReviews(reviewsRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/performance/reviews/', {
        employee: formData.employee_id,
        title: formData.title,
        rating: formData.rating,
        feedback: formData.feedback
      });
      setReviews([...reviews, res.data]); // Add new review to list instantly
      setShowForm(false); // Close form
      setFormData({ employee_id: '', title: '', rating: 5, feedback: '' }); // Reset form
    } catch (error) {
      alert("Failed to save review. Make sure you selected an employee!");
    }
  };

  if (loading) return <div className="p-8">Loading Performance Data...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Performance Reviews</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {showForm ? 'Cancel' : '+ New Review'}
        </button>
      </div>

      {/* --- NEW REVIEW FORM --- */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 border border-indigo-100">
          <h2 className="text-lg font-bold mb-4">Write a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="p-2 border rounded"
                value={formData.employee_id}
                onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                required
              >
                <option value="">Select Employee...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Review Title (e.g. Q1 Review)" 
                className="p-2 border rounded"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <textarea 
              placeholder="Feedback..." 
              className="w-full p-2 border rounded"
              rows="3"
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              required
            ></textarea>
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700">Rating: 
                <select 
                  className="ml-2 p-1 border rounded"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                  <option value="4">⭐⭐⭐⭐ (Good)</option>
                  <option value="3">⭐⭐⭐ (Average)</option>
                  <option value="2">⭐⭐ (Poor)</option>
                  <option value="1">⭐ (Terrible)</option>
                </select>
              </label>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- REVIEWS LIST --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800">{review.title}</h3>
              <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold">
                {review.rating}/5 Stars
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Employee: <span className="font-medium text-gray-800">{review.employee_name}</span>
            </p>
            <div className="text-gray-600 text-sm mb-4 bg-gray-50 p-3 rounded italic">
              "{review.feedback}"
            </div>
            <div className="text-xs text-gray-400 border-t pt-2 mt-2">
              Reviewed by {review.reviewer_name} • {review.date_created}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;