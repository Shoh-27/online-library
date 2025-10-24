import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

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
      
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 glass-dark text-white px-6 py-4 rounded-xl shadow-2xl z-50 fade-in';
      notification.innerHTML = '✅ Book deleted successfully';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  return (
    <div className="min-h-screen bg-pattern py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="glass p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <span className="mr-3">⚙️</span>
                  Admin Dashboard
                </h1>
                <p className="text-purple-100">Manage your library collection</p>
              </div>
              <Link
                to="/admin/books/new"
                className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span className="text-2xl">+</span>
                <span>Add New Book</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 fade-in">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Books</p>
                <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
              </div>
              <div className="text-5xl">📚</div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Published</p>
                <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Categories</p>
                <p className="text-4xl font-bold text-white mt-2">All</p>
              </div>
              <div className="text-5xl">🏷️</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="spinner mb-4 mx-auto"></div>
            <p className="text-xl text-white">Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <div className="text-8xl mb-4">📭</div>
            <p className="text-2xl font-bold text-white mb-4">No books yet</p>
            <Link
              to="/admin/books/new"
              className="inline-block btn-gradient text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300"
            >
              <span>Add Your First Book</span>
            </Link>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden fade-in">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Pages
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-12">
                            {book.cover_image_url ? (
                              <img
                                className="h-16 w-12 rounded object-cover shadow-lg"
                                src={book.cover_image_url}
                                alt=""
                              />
                            ) : (
                              <div className="h-16 w-12 rounded bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
                                📖
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-white">
                              {book.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-purple-100 font-medium">{book.author}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white font-medium">
                          {book.published_year || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white font-medium">
                          {book.pages || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            to={`/admin/books/edit/${book.id}`}
                            className="text-blue-300 hover:text-blue-100 transition-colors font-bold"
                          >
                            ✏️ Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="text-red-300 hover:text-red-100 transition-colors font-bold"
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