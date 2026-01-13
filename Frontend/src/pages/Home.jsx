import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ArrowRight, Briefcase } from "lucide-react";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to Dashboard immediately
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) return null; // Prevent flickering while checking auth

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Briefcase className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Find the perfect freelance <span className="text-blue-600">Gig</span> today.
        </h1>
        
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          GigFlow connects talented freelancers with clients looking for expertise. 
          Join our community to start earning or find the talent you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Log In
          </Link>
          
          <Link
            to="/register"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Sign Up Free <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;