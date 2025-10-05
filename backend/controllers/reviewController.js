
import Review from '../models/Review.js';
import Book from '../models/Book.js';

// Helper function to update the average rating of a book
async function updateAverage(bookId) {
  const agg = await Review.aggregate([
    { $match: { bookId: bookId } },
    { $group: { _id: '$bookId', avg: { $avg: '$rating' } } }
  ]);

  const avg = agg[0] ? agg[0].avg : 0;
  await Book.findByIdAndUpdate(bookId, { averageRating: avg });
}

// Add a new review
export const addReview = async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;
    const bookId = req.params.bookId;

    if (!rating) {
      return res.status(400).json({ message: 'Rating required' });
    }

    const existing = await Review.findOne({ bookId, userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You already reviewed this book' });
    }

    const review = await Review.create({
      bookId,
      userId: req.user._id,
      rating,
      reviewText
    });

    await updateAverage(bookId);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// Update existing review
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const { rating, reviewText } = req.body;
    review.rating = rating ?? review.rating;
    review.reviewText = reviewText ?? review.reviewText;

    await review.save();
    await updateAverage(review.bookId);

    res.json(review);
  } catch (err) {
    next(err);
  }
};

// Delete a review
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const bookId = review.bookId;
    await review.deleteOne(); // use deleteOne instead of remove (deprecated)
    await updateAverage(bookId);

    res.json({ message: 'Review removed' });
  } catch (err) {
    next(err);
  }
};
