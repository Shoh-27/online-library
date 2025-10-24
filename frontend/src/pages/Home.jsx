import { useState, useEffect } from 'react';
import axios from '../api/axios';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, [currentPage, search]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Online Library
          </h1>
          <p className="text-gray-600">
            Discover, read, and download thousands of books
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, author, or description..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mb-4 text-gray-600">
            Found {total} book{total !== 1 ? 's' : ''}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Loading books...</div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No books found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
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