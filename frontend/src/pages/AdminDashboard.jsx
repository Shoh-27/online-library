import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books?per_page=100');
      const booksData = response.data.data.data;
      setBooks(booksData);
      setStats({ total: booksData.length });
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await axios.delete(`/admin/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
      setStats({ total: stats.total - 1 });
      showNotification('✅ Book deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting book:', error);
      showNotification('❌ Failed to delete book', 'error');
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
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header fade-in">
          <div className="glass admin-header-card">
            <div className="admin-header-content">
              <div>
                <h1 className="admin-title">
                  <span>⚙️</span>
                  <span>Admin Dashboard</span>
                </h1>
                <p className="admin-subtitle">Manage your library collection</p>
              </div>
              <Link to="/admin/books/new" className="btn btn-primary btn-add">
                <span>+</span>
                <span>Add New Book</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid fade-in">
          <div className="stat-card glass">
            <div className="stat-card-content">
              <div>
                <p className="stat-card-label">Total Books</p>
                <p className="stat-card-value">{stats.total}</p>
              </div>
              <div className="stat-card-icon">📚</div>
            </div>
          </div>
          
          <div className="stat-card glass">
            <div className="stat-card-content">
              <div>
                <p className="stat-card-label">Published</p>
                <p className="stat-card-value">{stats.total}</p>
              </div>
              <div className="stat-card-icon">✅</div>
            </div>
          </div>
          
          <div className="stat-card glass">
            <div className="stat-card-content">
              <div>
                <p className="stat-card-label">Categories</p>
                <p className="stat-card-value">All</p>
              </div>
              <div className="stat-card-icon">🏷️</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p className="loading-text">Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state glass">
            <div className="empty-icon">📭</div>
            <h2 className="empty-title">No books yet</h2>
            <Link to="/admin/books/new" className="btn btn-primary">
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="books-table-container glass fade-in">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Pages</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <div className="book-cell">
                          <div className="book-thumbnail-wrapper">
                            {book.cover_image_url ? (
                              <img
                                src={book.cover_image_url}
                                alt={book.title}
                                className="book-thumbnail"
                              />
                            ) : (
                              <div className="book-thumbnail-placeholder">
                                📖
                              </div>
                            )}
                          </div>
                          <div className="book-title-cell">{book.title}</div>
                        </div>
                      </td>
                      <td className="author-cell">{book.author}</td>
                      <td className="year-cell">{book.published_year || 'N/A'}</td>
                      <td className="pages-cell">{book.pages || 'N/A'}</td>
                      <td>
                        <div className="action-buttons-cell">
                          <Link
                            to={`/admin/books/edit/${book.id}`}
                            className="action-link edit-link"
                          >
                            ✏️ Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="action-link delete-link"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;