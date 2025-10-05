import { Link, useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

const Navbar = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          

          <div className="flex items-center gap-6">
            {user ? (
              <>
              <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Log out
                </button>
               
                <Link to="/add-book" className="text-white hover:text-gray-200 transition">
                Add a book
                </Link>

                <Link to="/profile" className="text-white hover:text-gray-200 transition">
                  {user.name}
                </Link>
                 <Link to="/" className="text-white hover:text-gray-200 transition">
                  Home
                </Link>
                
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <Link to="/" className="text-white text-2xl font-bold">
            📚 Book library
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;