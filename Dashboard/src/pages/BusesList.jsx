import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function BusesList({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, busId: null, busName: '' });
  const [successModal, setSuccessModal] = useState({ show: false, type: '', busName: '' });

  // Fetch all buses
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://busjncation1.onrender.com/api/buses');
      const result = await response.json();
      
      if (result.success) {
        setBuses(result.data || []);
      } else {
        setError('Failed to fetch buses from database');
      }
    } catch (err) {
      console.error('Error fetching buses:', err);
      setError('❌ Cannot connect to backend. Make sure server is running on https://busjncation1.onrender.com');
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = (busId, busName) => {
    setDeleteModal({ show: true, busId, busName });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://busjncation1.onrender.com/api/buses/${deleteModal.busId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setBuses(buses.filter(bus => bus._id !== deleteModal.busId));
        setDeleteModal({ show: false, busId: null, busName: '' });
        
        // Show success modal
        setSuccessModal({ show: true, type: 'deleted', busName: deleteModal.busName });
      } else {
        alert('Failed to delete bus');
      }
    } catch (err) {
      console.error('Error deleting bus:', err);
      alert('Error deleting bus: ' + err.message);
    }
  };

  // Handle Sell (Mark as Sold)
  const handleSell = async (bus) => {
    try {
      console.log('Selling bus:', bus._id);
      
      // Mark bus as sold (don't delete, just mark status)
      const response = await fetch(` https://busjncation1.onrender.com/api/buses/${bus._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'sold' }),
      });

      const result = await response.json();
      console.log('Sell response:', result);

      if (result.success) {
        // Remove sold bus from the list
        setBuses(buses.filter(b => b._id !== bus._id));
        console.log('Bus removed from list');
        
        // Show success modal
        setSuccessModal({ show: true, type: 'sold', busName: bus.busName });
      } else {
        alert('Failed to mark bus as sold: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error marking bus as sold:', err);
      alert('Error marking bus as sold: ' + err.message);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <main className="py-6 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                  All Buses 🚌
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                  Manage your fleet
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base rounded-lg transition-colors duration-300 whitespace-nowrap min-h-[44px] sm:min-h-auto"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm sm:text-base">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12 sm:py-16">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">Loading buses...</p>
              </div>
            </div>
          )}

          {/* Buses Grid */}
          {!loading && buses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {buses.map((bus) => (
                <div
                  key={bus._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Bus Image */}
                  <div className="relative h-32 sm:h-40 lg:h-48 bg-gray-200 overflow-hidden flex-shrink-0">
                    {bus.busImage ? (
                      <img
                        src={bus.busImage}
                        alt={bus.busName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                        <svg
                          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7h12M8 7a2 2 0 100-4H8m0 4v10m0-10H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2m0 0V5a2 2 0 10-4 0v2m0 0h4"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Bus Details */}
                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                      {bus.busName}
                    </h3>

                    <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 lg:mb-6 text-xs sm:text-sm flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-semibold text-gray-900 text-right truncate ml-2">{bus.busModel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          bus.busType === 'AC'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {bus.busType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-semibold text-gray-900">{bus.seater}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-green-600">₹{bus.price}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => handleSell(bus)}
                        className="flex-1 px-2 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-sm sm:text-base rounded-lg font-medium transition-all duration-300 min-h-[44px] sm:min-h-auto flex items-center justify-center gap-1"
                      >
                        <span>✓</span>
                        <span className="hidden xs:inline">Sell</span>
                      </button>
                      <button
                        onClick={() => handleDelete(bus._id, bus.busName)}
                        className="flex-1 px-2 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm sm:text-base rounded-lg font-medium transition-all duration-300 min-h-[44px] sm:min-h-auto flex items-center justify-center gap-1"
                      >
                        <span>🗑️</span>
                        <span className="hidden xs:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && buses.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12M8 7a2 2 0 100-4H8m0 4v10m0-10H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2m0 0V5a2 2 0 10-4 0v2m0 0h4"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">No buses</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Add your first bus on the dashboard</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base rounded-lg transition-colors duration-300 min-h-[44px] sm:min-h-auto"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Success Modal */}
      {successModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 max-w-sm w-full transform transition-all duration-300 scale-100">
            {/* Success Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              {successModal.type === 'deleted' ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Title and Message */}
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
              {successModal.type === 'deleted' ? 'Bus Deleted! 🗑️' : 'Bus Sold! 🎉'}
            </h3>
            <p className="text-center text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              {successModal.type === 'deleted'
                ? `"${successModal.busName}" removed.`
                : `"${successModal.busName}" marked as sold.`}
            </p>

            {/* Details */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  successModal.type === 'deleted' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {successModal.type === 'deleted' ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">Bus Name</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{successModal.busName}</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => setSuccessModal({ show: false, type: '', busName: '' })}
              className={`w-full font-semibold py-2.5 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base min-h-[44px] sm:min-h-auto ${
                successModal.type === 'deleted'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {successModal.type === 'deleted' ? 'OK' : 'Great!'}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 max-w-sm w-full">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-1 sm:mb-2">
              Delete Bus?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
              Sure to delete <strong className="break-words">{deleteModal.busName}</strong>? Can't undo.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, busId: null, busName: '' })}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-sm sm:text-base rounded-lg transition-colors duration-300 min-h-[44px] sm:min-h-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-sm sm:text-base rounded-lg transition-colors duration-300 min-h-[44px] sm:min-h-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
