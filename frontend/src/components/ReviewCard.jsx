import { useState } from 'react';
import { UseAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';

const ReviewCard = ({ review, onDelete, onEdit }) => {
  const { user } = UseAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    rating: review.rating,
    reviewText: review.reviewText
  });

  const isOwner = user && user._id === review.userId?._id;

  const handleEdit = () => {
    onEdit(review._id, editedReview);
    setIsEditing(false);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-gray-800">{review.userId?.name || 'user'}</h4>
          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
        </div>
        {isOwner && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Editing
            </button>
            <button
              onClick={() => onDelete(review._id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              value={editedReview.rating}
              onChange={(e) => setEditedReview({ ...editedReview, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              value={editedReview.reviewText}
              onChange={(e) => setEditedReview({ ...editedReview, reviewText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-yellow-500 text-lg mb-2">
            {renderStars(review.rating)}
          </div>
          <p className="text-gray-700">{review.reviewText}</p>
        </>
      )}
    </div>
  );
};

export default ReviewCard;