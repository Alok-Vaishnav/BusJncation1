import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hard-coded users
const USERS = [
  {
    id: 1,
    name: 'Liladhar Vaishnav',
    email: 'liladhar@busjuction.com',
    password: 'liladhar@busjuction.com',
  },
  {
    id: 2,
    name: 'Harshit Vaishnav',
    email: 'harsh@busjuction.com',
    password: 'harsh@busjuction.com',
  },
];

export default function LoginApp({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    // Find user with matching email and password
    const user = USERS.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  // Login Component
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center px-3 sm:px-6 py-6 sm:py-12">
      {/* Background Elements - Hidden on mobile */}
      <div className="hidden sm:block absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-400 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="hidden sm:block absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-400 rounded-full opacity-10 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 7h12M8 7a2 2 0 100-4H8m0 4v10m0-10H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2m0 0V5a2 2 0 10-4 0v2m0 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 truncate px-2">Bus Junction</h1>
          <p className="text-blue-100 text-sm sm:text-base">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Welcome</h2>
          <p className="text-gray-600 text-xs sm:text-sm mb-5 sm:mb-6">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-3 sm:p-4 rounded">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-700 text-xs sm:text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 p-1.5 rounded"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.83 9L15.29 12.46c.04-.32.07-.64.07-.96 0-1.66-1.34-3-3-3-.32 0-.64.03-.96.07L11.83 9zm7.08-2.32c.78 1.11 1.47 2.38 1.96 3.85.5 1.56.97 2.75 1.44 3.32.1.13.21.26.34.37l-4.64-4.63L18.91 6.68zM20.07 2l-1.42 1.42-2.04 2.04c-.74-.36-1.63-.58-2.61-.58-2.77 0-5 2.23-5 5 0 .98.22 1.87.58 2.61l-2.04 2.04-1.42 1.42L2 21.07 3.41 22.5 20.07 2zm-6.07 6.07zm3.32 8.3l-1.58-1.58c.05-.21.08-.43.08-.65 0-1.66-1.34-3-3-3-.22 0-.44.03-.65.08l-1.58-1.58c.7-.33 1.48-.5 2.23-.5 2.77 0 5 2.23 5 5 0 .75-.17 1.53-.5 2.23z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 active:scale-95 mt-5 sm:mt-6 text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-xs sm:text-sm font-semibold text-center mb-3">Demo Accounts</p>
            <div className="space-y-2">
              {USERS.map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setFormData({ email: user.email, password: user.password });
                    setTimeout(() => {
                      const userObj = { id: user.id, name: user.name, email: user.email };
                      onLogin(userObj);
                      navigate('/dashboard');
                    }, 100);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                  <div className="text-gray-600 text-xs truncate">{user.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-xs sm:text-sm">
          © {new Date().getFullYear()} Bus Junction
        </p>
      </div>
    </div>
  );
}
