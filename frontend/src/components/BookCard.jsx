import { Link } from 'react-router-dom';
import { calculateAverageRating, truncateText } from '../utils/helpers';

const BookCard = ({ book }) => {
  const avgRating = calculateAverageRating(book.reviews);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2"> Author:{book.author}</p>
        <p className="text-gray-500 text-sm mb-3">
          {truncateText(book.description, 100)}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            {book.genre}
          </span>
          <span className="text-gray-500 text-sm">{book.year}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="font-bold text-gray-700">{avgRating}</span>
            <span className="text-gray-500 text-sm">
              ({book.reviews?.length || 0})
            </span>
          </div>
          <Link
            to={`/books/${book._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
          Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;