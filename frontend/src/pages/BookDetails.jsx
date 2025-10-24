import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

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
    } catch (error) {
      console.error('Error downloading book:', error);
      alert('Failed to download book');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Back to Books
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 bg-gray-200 flex items-center justify-center p-8">
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="max-h-96 object-contain"
                />
              ) : (
                <div className="text-gray-400 text-9xl">📖</div>
              )}
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              
              <div className="space-y-3 mb-6">
                <p className="text-xl text-gray-700">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>
                
                {book.published_year && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Published:</span> {book.published_year}
                  </p>
                )}
                
                {book.pages > 0 && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Pages:</span> {book.pages}
                  </p>
                )}
                
                {book.isbn && (
                  <p className="text-gray-600">
                    <span className="font-semibold">ISBN:</span> {book.isbn}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {book.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleReadOnline}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  📖 Read Online
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {downloading ? 'Downloading...' : '⬇ Download PDF'}
                </button>
              </div>

              {!user && (
                <p className="mt-4 text-sm text-gray-600">
                  Please <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>login</span> to read or download this book
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;