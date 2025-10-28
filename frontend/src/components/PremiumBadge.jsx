import './PremiumBadge.css';

const PremiumBadge = ({ size = 'medium' }) => {
  return (
    <div className={`premium-badge ${size}`}>
      <span className="premium-icon">💎</span>
      <span className="premium-text">Premium</span>
    </div>
  );
};

export default PremiumBadge;