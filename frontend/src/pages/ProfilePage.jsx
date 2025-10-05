import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';
import { getMyReviews } from '../services/reviewService';
import api from '../services/api';
import BookCard from '../components/BookCard';

const ProfilePage = () => {
  const { user } = UseAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user's books
      const booksRes = await api.get('/books/my-books');
      setMyBooks(booksRes.data);
      
      // Fetch user's reviews
      const reviewsData = await getMyReviews();
      setMyReviews(reviewsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex gap-6 mt-3">
                <span className="text-gray-700">
                  <strong>{myBooks.length}</strong> Books
                </span>
                <span className="text-gray-700">
                  <strong>{myReviews.length}</strong> Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* My Books */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Books</h2>
          {myBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBooks.map(book => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              You haven't added any books yet.{' '}
              <Link to="/add-book" className="text-blue-600 hover:underline">
                Add your first book
              </Link>
            </p>
          )}
        </div>

        {/* My Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reviews</h2>
          {myReviews.length > 0 ? (
            <div className="space-y-4">
              {myReviews.map(review => (
                <div key={review._id} className="bg-gray-50 rounded-lg p-4">
                  <Link
                    to={`/books/${review.bookId?._id}`}
                    className="text-lg font-bold text-blue-600 hover:underline mb-2 block"
                  >
                    {review.bookId?.title}
                  </Link>
                  <div className="text-yellow-500 mb-2">
                    {'⭐'.repeat(review.rating)}
                  </div>
                  <p className="text-gray-700">{review.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              You haven't added any reviews yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;