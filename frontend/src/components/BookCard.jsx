import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="glass rounded-2xl overflow-hidden card-hover fade-in">
      <div className="relative h-72 bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center overflow-hidden group">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-white text-8xl group-hover:scale-125 transition-transform duration-500">
            📖
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {book.published_year && (
          <div className="absolute top-4 right-4 badge">
            {book.published_year}
          </div>
        )}
      </div>
      
      <div className="p-5 bg-white/90 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate hover:text-purple-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-purple-600 font-medium mb-2 flex items-center">
          <span className="mr-2">✍️</span>
          {book.author}
        </p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {book.description}
        </p>
        
        <Link
          to={`/books/${book.id}`}
          className="block w-full btn-gradient text-white text-center py-3 rounded-xl font-medium hover:shadow-xl transition-all duration-300"
        >
          <span>View Details →</span>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;