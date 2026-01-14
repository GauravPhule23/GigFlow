import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Briefcase, LogOut, User } from "lucide-react"; // Icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">GigFlow</span>
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              // SHOW THIS IF LOGGED IN
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-blue-600 font-medium transition"
                >
                  Dashboard
                </Link>
                
                <Link 
                  to="/create-gig" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Post a Job
                </Link>

                <div className="flex items-center gap-2 pl-4 border-l border-gray-300">
                  <span className="text-sm font-semibold text-gray-700">
                    {user.fName}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-500 transition"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              // SHOW THIS IF LOGGED OUT
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;