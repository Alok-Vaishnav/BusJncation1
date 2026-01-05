import Navbar from '../components/Navbar';
import BusForm from '../components/BusForm';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBuses: 0,
    acBuses: 0,
    nonAcBuses: 0,
    soldBuses: 0
  });
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  // Fetch bus statistics on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://busjncation1.onrender.com/api/buses/stats');
        const result = await response.json();
        
        if (result.success) {
          setStats(result.data);
          setIsDemo(false);
        }
      } catch (error) {
        console.error('Error fetching bus stats:', error);
        // Show demo data when backend is down
        setStats({
          totalBuses: 12,
          acBuses: 7,
          nonAcBuses: 5,
          soldBuses: 3
        });
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Auto-refresh stats every 5 seconds
    const interval = setInterval(fetchStats, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <main className="py-6 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
              Welcome, {currentUser?.name}! 👋
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Manage your bus fleet efficiently.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <BusForm />
            </div>

            {/* Info Cards */}
            <div className="lg:col-span-1">
              <div className="space-y-4 sm:space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Quick Stats</h3>
                    {isDemo && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                        📊 Demo
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-700">Total Buses</span>
                      {loading ? (
                        <div className="h-7 w-10 bg-blue-200 rounded animate-pulse"></div>
                      ) : (
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">{stats.totalBuses}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-700">AC Buses</span>
                      {loading ? (
                        <div className="h-7 w-10 bg-green-200 rounded animate-pulse"></div>
                      ) : (
                        <span className="text-xl sm:text-2xl font-bold text-green-600">{stats.acBuses}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-700">Non-AC</span>
                      {loading ? (
                        <div className="h-7 w-10 bg-orange-200 rounded animate-pulse"></div>
                      ) : (
                        <span className="text-xl sm:text-2xl font-bold text-orange-600">{stats.nonAcBuses}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-700">Sold</span>
                      {loading ? (
                        <div className="h-7 w-10 bg-red-200 rounded animate-pulse"></div>
                      ) : (
                        <span className="text-xl sm:text-2xl font-bold text-red-600">{stats.soldBuses}</span>
                      )}
                    </div>
                  </div>
                  {isDemo && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                      <p className="font-semibold mb-1">💡 Demo Mode</p>
                      <p>Backend offline. Showing sample data.</p>
                    </div>
                  )}
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                  <h3 className="text-base sm:text-lg font-bold mb-3">💡 Tips</h3>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <li className="flex gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>Use high-quality bus images</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>Provide accurate seating capacity</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>Set competitive pricing</span>
                    </li>
                  </ul>
                </div>

                {/* Bus Types Info */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Bus Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">❄️</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">AC Buses</p>
                        <p className="text-xs sm:text-sm text-gray-600">Air-conditioned comfort</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">🌬️</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">Non-AC Buses</p>
                        <p className="text-xs sm:text-sm text-gray-600">Budget-friendly option</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
