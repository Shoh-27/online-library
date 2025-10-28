import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './SubscriptionModal.css';

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/subscription/subscribe');
      
      if (response.data.success) {
        showNotification('✅ Premium activated! Welcome to Premium!', 'success');
        
        // User ma'lumotlarini yangilash
        const userResponse = await axios.get('/me');
        localStorage.setItem('user', JSON.stringify(userResponse.data.user));
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      showNotification('❌ Failed to activate premium', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass scale-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="premium-icon-large">💎</div>
          <h2 className="modal-title text-gradient">Upgrade to Premium</h2>
          <p className="modal-subtitle">Unlock unlimited access to all premium books</p>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Access to all premium books</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Unlimited downloads</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>No advertisements</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Priority support</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span>Early access to new books</span>
          </div>
        </div>

        <div className="pricing-box glass">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">9.99</span>
            <span className="period">/month</span>
          </div>
          <p className="price-note">Demo: Click to activate 1 month free trial!</p>
        </div>

        <button 
          onClick={handleSubscribe}
          disabled={loading}
          className="btn btn-primary btn-subscribe"
        >
          {loading ? (
            <>
              <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
              <span>Activating...</span>
            </>
          ) : (
            <>
              <span>💎</span>
              <span>Activate Premium Now</span>
            </>
          )}
        </button>

        <p className="modal-footer-text">
          Cancel anytime • No credit card required for demo
        </p>
      </div>
    </div>
  );
};

export default SubscriptionModal;