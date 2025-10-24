import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon float">📚</span>
            <span className="logo-text hide-mobile">Online Library</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu hide-mobile">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="user-badge glass">
                  <span>👋</span>
                  <span>{user.name}</span>
                </div>
                
                {isAdmin() && (
                  <Link to="/admin" className="btn btn-primary">
                    <span>⚙️</span>
                    <span>Admin Panel</span>
                  </Link>
                )}
                
                <button onClick={handleLogout} className="btn btn-danger">
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="menu-toggle show-mobile"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-icon">{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu fade-in">
            {user ? (
              <>
                <div className="user-badge glass mb-2">
                  👋 {user.name}
                </div>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ width: '100%', marginBottom: '12px' }}
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-danger"
                  style={{ width: '100%' }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginBottom: '12px' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
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