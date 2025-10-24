import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const AdminBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    pages: '',
    isbn: '',
    published_year: ''
  });
  
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/books/${id}`);
      const book = response.data.data;
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        pages: book.pages || '',
        isbn: book.isbn || '',
        published_year: book.published_year || ''
      });
    } catch (error) {
      console.error('Error fetching book:', error);
      alert('Failed to load book');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'pdf_file') {
      setPdfFile(files[0]);
    } else if (name === 'cover_image') {
      setCoverImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('description', formData.description);
    
    if (formData.pages) data.append('pages', formData.pages);
    if (formData.isbn) data.append('isbn', formData.isbn);
    if (formData.published_year) data.append('published_year', formData.published_year);
    
    if (pdfFile) data.append('pdf_file', pdfFile);
    if (coverImage) data.append('cover_image', coverImage);

    try {
      if (isEdit) {
        await axios.post(`/admin/books/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Book updated successfully');
      } else {
        await axios.post('/admin/books', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Book created successfully');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving book:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Failed to save book');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin')}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {isEdit ? 'Edit Book' : 'Add New Book'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author[0]}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>
              )}
            </div>

            {/* Pages and ISBN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pages
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.pages && (
                  <p className="text-red-500 text-sm mt-1">{errors.pages[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm mt-1">{errors.isbn[0]}</p>
                )}
              </div>
            </div>

            {/* Published Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Published Year
              </label>
              <input
                type="number"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.published_year && (
                <p className="text-red-500 text-sm mt-1">{errors.published_year[0]}</p>
              )}
            </div>

            {/* PDF File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF File {!isEdit && '*'}
              </label>
              <input
                type="file"
                name="pdf_file"
                accept=".pdf"
                onChange={handleFileChange}
                required={!isEdit}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">Max size: 50MB</p>
              {errors.pdf_file && (
                <p className="text-red-500 text-sm mt-1">{errors.pdf_file[0]}</p>
              )}
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <input
                type="file"
                name="cover_image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">Max size: 5MB (JPG, PNG)</p>
              {errors.cover_image && (
                <p className="text-red-500 text-sm mt-1">{errors.cover_image[0]}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Book' : 'Create Book')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBookForm;