import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300 float">
              📚
            </div>
            <span className="text-2xl font-bold text-white hidden sm:block">
              Online Library
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="glass-dark px-4 py-2 rounded-full">
                  <span className="text-white font-medium">
                    👋 {user.name}
                  </span>
                </div>
                
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="btn-gradient text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <span className="flex items-center space-x-2">
                      <span>⚙️</span>
                      <span>Admin Panel</span>
                    </span>
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="bg-red-500/90 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-600 hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>🚪</span>
                    <span>Logout</span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white font-medium hover:text-purple-200 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-gradient text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass-dark p-2 rounded-lg text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 fade-in">
            {user ? (
              <>
                <div className="glass-dark px-4 py-3 rounded-lg text-white">
                  👋 {user.name}
                </div>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-gradient text-white px-4 py-3 rounded-lg font-medium text-center"
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-500/90 text-white px-4 py-3 rounded-lg font-medium"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white px-4 py-3 rounded-lg hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block btn-gradient text-white px-4 py-3 rounded-lg font-medium text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;