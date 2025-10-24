import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-6xl">📖</div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {book.description}
        </p>
        
        <div className="flex justify-between items-center">
          {book.published_year && (
            <span className="text-sm text-gray-500">{book.published_year}</span>
          )}
          <Link
            to={`/books/${book.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;