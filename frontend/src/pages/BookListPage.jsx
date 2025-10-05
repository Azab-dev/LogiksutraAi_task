import { useState, useEffect } from 'react';
import { getBooks } from '../services/bookService';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');


  const genres = ['Novel', 'Scientific', 'History', 'Philosophy', 'Technical', 'Children', 'Poetry'];


  useEffect(() => {
    fetchBooks();
  }, [currentPage, genre]);

  const fetchBooks = async () => {
  setLoading(true);
  setError('');
  try {
    const response = await getBooks(currentPage, search, genre);
    console.log('API Response:', response);
    
    // Handle your backend response structure
    if (response.data) {
      setBooks(response.data);
      setTotalPages(response.totalPages || 1);
    } else if (response.books) {
      setBooks(response.books);
      setTotalPages(response.totalPages || 1);
    } else if (Array.isArray(response)) {
      setBooks(response);
      setTotalPages(1);
    } else {
      setBooks([]);
      setTotalPages(1);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setError(err.message);
    setBooks([]);
  } finally {
    setLoading(false);
  }
};

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          📚 Book Library 
        </h1>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
              dir="ltr"
            />
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
              dir="ltr"
            >
              <option value="">All Categories</option>
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-left" dir="ltr">
            {error}
          </div>
        )}

        {/* Books Grid */}
 {!loading && books && books.length > 0 && (          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {books.map(book => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {/* No Books */}
        {!loading && (!books || books.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">There are no books</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListPage;