import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.password_confirmation
    );
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      setErrors(result.errors || {});
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container scale-in">
        <div className="auth-header">
          <div className="auth-icon float">📚</div>
          <h1 className="auth-title">Join Our Library</h1>
          <p className="auth-subtitle">Create your account and start reading</p>
        </div>
        
        <form className="auth-form glass" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error fade-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">👤 Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="form-error">⚠ {errors.name[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">📧 Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="form-error">⚠ {errors.email[0]}</p>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">🔒 Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Create a password (min 6 characters)"
            />
            {errors.password && (
              <p className="form-error">⚠ {errors.password[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">🔐 Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account →</span>
            )}
          </button>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="auth-link">
              Sign in →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;