import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card fade-in">
      <div className="book-cover-wrapper">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="book-cover-img"
          />
        ) : (
          <div className="book-cover-placeholder">
            <span className="book-icon">📖</span>
          </div>
        )}
        <div className="book-overlay"></div>
        
        {book.published_year && (
          <div className="book-year badge">
            {book.published_year}
          </div>
        )}
      </div>
      
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">
          <span className="author-icon">✍️</span>
          {book.author}
        </p>
        <p className="book-description line-clamp-2">
          {book.description}
        </p>
        
        <Link to={`/books/${book.id}`} className="btn btn-primary book-btn">
          <span>View Details →</span>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;