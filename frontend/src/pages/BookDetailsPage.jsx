import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, deleteBook } from '../services/bookService';
import { addReview, updateReview, deleteReview } from '../services/reviewService';
import { UseAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import { calculateAverageRating } from '../utils/helpers';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: ''
  });

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await addReview(id, reviewForm);
      setReviewForm({ rating: 5, reviewText: '' });
      fetchBook();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditReview = async (reviewId, updatedData) => {
    try {
      await updateReview(reviewId, updatedData);
      fetchBook();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(reviewId);
      fetchBook();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteBook = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Book not found'}</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && user._id === book.addedBy?._id;
  const avgRating = calculateAverageRating(book.reviews);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Book Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
            {isOwner && (
              <div className="flex gap-2">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDeleteBook}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-xl text-gray-600 mb-2">Author: {book.author}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              {book.genre}
            </span>
            <span className="text-gray-500">Published: {book.year}</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl text-yellow-500">⭐</span>
            <span className="text-2xl font-bold text-gray-700">{avgRating}</span>
            <span className="text-gray-500">
              ({book.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{book.description}</p>

          <p className="text-sm text-gray-500 mt-4">
            Added by: {book.addedBy?.name}
          </p>
        </div>

        {/* Add Review */}
        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Your Review</h2>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Rating
                </label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} ⭐</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Review
                </label>
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Write your review here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                Add Review
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Reviews ({book.reviews?.length || 0})
          </h2>
          <div className="space-y-4">
            {book.reviews && book.reviews.length > 0 ? (
              book.reviews.map(review => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onDelete={handleDeleteReview}
                  onEdit={handleEditReview}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No reviews yet. Be the first to review this book!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;