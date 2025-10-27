import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/books/${id}`);
      setBook(response.data.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setDownloading(true);
      const response = await axios.get(`/books/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${book.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      showNotification('✅ Book downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading book:', error);
      showNotification('❌ Failed to download book', 'error');
    } finally {
      setDownloading(false);
    }
  };

  const handleReadOnline = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    window.open(book.pdf_file_url, '_blank');
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  if (loading) {
    return (
      <div className="book-details-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="loading-text">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-details-page">
        <div className="container">
          <div className="empty-state glass">
            <div className="empty-icon">📚</div>
            <h2 className="empty-title">Book not found</h2>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              ← Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-details-page">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-btn glass">
          <span>←</span>
          <span>Back to Library</span>
        </button>

        <div className="book-details-card glass fade-in">
          <div className="book-details-grid">
            {/* Book Cover */}
            <div className="book-cover-section">
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="book-detail-cover"
                />
              ) : (
                <div className="book-cover-placeholder-large">
                  <span className="book-icon-large">📖</span>
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="book-info-section">
              <div className="book-meta">
                {book.published_year && (
                  <span className="badge">📅 {book.published_year}</span>
                )}
                <h1 className="book-detail-title">{book.title}</h1>
              </div>
              
              <div className="book-author-info">
                <span className="author-icon-large">✍️</span>
                <div>
                  <p className="author-label">Author</p>
                  <p className="author-name">{book.author}</p>
                </div>
              </div>
              
              <div className="book-stats-grid">
                {book.pages > 0 && (
                  <div className="stat-card glass">
                    <p className="stat-label">Pages</p>
                    <p className="stat-value">{book.pages}</p>
                  </div>
                )}
                
                {book.isbn && (
                  <div className="stat-card glass">
                    <p className="stat-label">ISBN</p>
                    <p className="stat-value-small">{book.isbn}</p>
                  </div>
                )}
              </div>

              <div className="book-description-section">
                <h2 className="section-title">
                  <span>📝</span>
                  <span>Description</span>
                </h2>
                <div className="description-box glass">
                  <p className="description-text">{book.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button onClick={handleReadOnline} className="btn btn-success btn-large">
                  <span>📖</span>
                  <span>Read Online</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn btn-primary btn-large"
                >
                  {downloading ? (
                    <>
                      <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <span>⬇️</span>
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>

              {!user && (
                <div className="login-prompt glass">
                  <p>
                    Please{' '}
                    <button onClick={() => navigate('/login')} className="login-link">
                      login
                    </button>
                    {' '}to read or download this book
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;