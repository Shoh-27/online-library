import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import './AdminBookForm.css';

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
  const [pdfPreview, setPdfPreview] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

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
      if (book.cover_image_url) {
        setImagePreview(book.cover_image_url);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      showNotification('❌ Failed to load book', 'error');
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
    const file = files[0];
    
    if (name === 'pdf_file') {
      setPdfFile(file);
      if (file) {
        setPdfPreview(file.name);
      }
    } else if (name === 'cover_image') {
      setCoverImage(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setUploadProgress(0);

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
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });
        showNotification('✅ Book updated successfully!', 'success');
      } else {
        await axios.post('/admin/books', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });
        showNotification('✅ Book created successfully!', 'success');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving book:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        showNotification('❌ Failed to save book', 'error');
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
    <div className="admin-form-page">
      <div className="container">
        <button onClick={() => navigate('/admin')} className="back-btn glass">
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>

        <div className="form-card glass fade-in">
          <div className="form-header">
            <h1 className="form-title">
              {isEdit ? '✏️ Edit Book' : '➕ Add New Book'}
            </h1>
            <p className="form-subtitle">
              {isEdit ? 'Update book information' : 'Fill in the details to add a new book'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="book-form">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">📚 Book Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="form-error">⚠ {errors.title[0]}</p>
              )}
            </div>

            {/* Author */}
            <div className="form-group">
              <label className="form-label">✍️ Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="form-error">⚠ {errors.author[0]}</p>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">📝 Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="form-input"
                placeholder="Enter book description"
              />
              {errors.description && (
                <p className="form-error">⚠ {errors.description[0]}</p>
              )}
            </div>

            {/* Pages and ISBN */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">📄 Pages</label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Number of pages"
                  min="1"
                />
                {errors.pages && (
                  <p className="form-error">⚠ {errors.pages[0]}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">🔢 ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="ISBN number"
                />
                {errors.isbn && (
                  <p className="form-error">⚠ {errors.isbn[0]}</p>
                )}
              </div>
            </div>

            {/* Published Year */}
            <div className="form-group">
              <label className="form-label">📅 Published Year</label>
              <input
                type="number"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear()}
                className="form-input"
                placeholder="Publication year"
              />
              {errors.published_year && (
                <p className="form-error">⚠ {errors.published_year[0]}</p>
              )}
            </div>

            {/* PDF File */}
            <div className="form-group">
              <label className="form-label">
                📄 PDF File {!isEdit && '*'}
              </label>
              <div className="file-input-wrapper glass">
                <input
                  type="file"
                  name="pdf_file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required={!isEdit}
                  className="file-input"
                  id="pdf-file"
                />
                <label htmlFor="pdf-file" className="file-label">
                  <span className="file-icon">📎</span>
                  <span className="file-text">
                    {pdfPreview || 'Choose PDF file (Max 50MB)'}
                  </span>
                </label>
              </div>
              {errors.pdf_file && (
                <p className="form-error">⚠ {errors.pdf_file[0]}</p>
              )}
            </div>

            {/* Cover Image */}
            <div className="form-group">
              <label className="form-label">🖼️ Cover Image</label>
              <div className="file-input-wrapper glass">
                <input
                  type="file"
                  name="cover_image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                  id="cover-image"
                />
                <label htmlFor="cover-image" className="file-label">
                  <span className="file-icon">🖼️</span>
                  <span className="file-text">
                    Choose cover image (Max 5MB)
                  </span>
                </label>
              </div>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={() => {
                      setImagePreview('');
                      setCoverImage(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
              {errors.cover_image && (
                <p className="form-error">⚠ {errors.cover_image[0]}</p>
              )}
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="upload-progress fade-in">
                <p className="progress-label">Uploading... {uploadProgress}%</p>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <span className="progress-text">{uploadProgress}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-submit"
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{isEdit ? '💾 Update Book' : '✨ Create Book'}</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn btn-secondary"
                disabled={loading}
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