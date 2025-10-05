
import Book from '../models/Book.js';
import Review from '../models/Review.js';

// Create a new book
export const createBook = async (req, res, next) => {
  try {
    const { title, author, description, genre, year } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Get all books with pagination
export const getBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Book.countDocuments();
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      data: books,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    next(err);
  }
};

// Get a single book by ID with its reviews
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ bookId: book._id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({ book, reviews });
  } catch (err) {
    next(err);
  }
};

// Update book info (only by the owner)
export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const { title, author, description, genre, year } = req.body;
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;
    book.genre = genre ?? book.genre;
    book.year = year ?? book.year;

    await book.save();
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Delete a book and its reviews (only by the owner)
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await Review.deleteMany({ bookId: book._id });
    await book.deleteOne(); // remove() deprecated

    res.json({ message: 'Book removed' });
  } catch (err) {
    next(err);
  }
};
