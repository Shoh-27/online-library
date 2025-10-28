import { useState, useEffect } from 'react';
import axios from '../api/axios';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/books', {
        params: {
          page: currentPage,
          per_page: 12,
          search: search
        }
      });
      
      setBooks(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setLastPage(response.data.data.last_page);
      setTotal(response.data.data.total);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section fade-in">
          <div className="hero-icon float">📚</div>
          <h1 className="hero-title">
            Welcome to
            <span className="text-gradient"> Online Library</span>
          </h1>
          <p className="hero-subtitle">
            Discover, read, and download thousands of books from our collection
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-section scale-in">
          <form onSubmit={handleSearch} className="search-form glass">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search by title, author, or description..."
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="results-count">
            <div className="badge">
              📚 Found {total} book{total !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p className="loading-text">Loading amazing books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state glass">
            <div className="empty-icon">📭</div>
            <h2 className="empty-title">No books found</h2>
            <p className="empty-text">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="books-grid">
              {books.map((book, index) => (
                <div key={book.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;