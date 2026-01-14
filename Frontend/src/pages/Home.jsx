import { useEffect, useRef } from "react"; // 1. Import useRef
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ArrowRight, Briefcase } from "lucide-react";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef(null); // 2. Create the ref

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // 3. Set the playback speed once the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
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
      {/* --- VIDEO SECTION --- */}
      <div className="w-full max-w-4xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
        <video 
          ref={videoRef} // 4. Attach the ref
          src="/SubmissionVideo.webm" // Ensure this file is in your 'public' folder
          autoPlay 
          loop 
          muted 
          playsInline
          // 5. CSS Clip Path: inset(top right bottom left)
          style={{ clipPath: "inset(0px 20px 0px 0px)" }} 
          className="w-full h-auto object-cover opacity-90"
        />
      </div>
      <br />
      <br />

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