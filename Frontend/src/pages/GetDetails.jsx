import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../config/axios";
import { useAuth } from "../context/authContext";
import { MapPin, Calendar, User, IndianRupee, Lock } from "lucide-react"; 
import BidModal from "../Components/BidModal";

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  let { user } = useAuth();
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await api.get(`/api/gigs/${id}`);
        setGig(data.data || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  
  let isOwner = undefined
  // OWNERSHIP CHECK LOGIC
  if(!user){
    location.reload();    
  }
  if (!gig) return <div className="p-10 text-center dark:text-white"></div>;
  const gigOwnerId = gig?.ownerId?._id || gig?.ownerId;
  isOwner = user?._id?.toString() === gigOwnerId?.toString();
  
  // BUTTON VISIBILITY LOGIC 
  // Now safe because 'user' is guaranteed to be either an Object (Logged in) or Null (Guest)
  const showPlaceBidButton = !isOwner && gig.status === "Open";

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative">
      
      <BidModal 
        isOpen={isBidModalOpen} 
        onClose={() => setIsBidModalOpen(false)} 
        gigId={id}
        gigTitle={gig.title}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold dark:text-white">{gig.title}</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            gig.status === "Open" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}>
            {gig.status}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <User size={18} className="text-blue-500" /> 
            <span>Posted by {gig.ownerId.fName} {gig.ownerId.lName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-purple-500" /> 
            <span>Due: {new Date(gig.completionDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee size={18} className="text-green-500" /> 
            <span className="font-bold text-lg">₹{gig.budget}</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Description</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {gig.description}
          </p>
        </div>

        {/* ACTION BUTTON AREA  */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          
          {/* IS OWNER -> VIEW BIDS */}
          {isOwner && (
            <Link 
              to={`/gig/${id}/bids`}
              className="inline-block w-full text-center bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition"
            >
              Manage / View Bids
            </Link>
          )}

          {/*  NOT OWNER & OPEN -> PLACE BID */}
          {showPlaceBidButton && (
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition transform hover:-translate-y-0.5"
              onClick={() => setIsBidModalOpen(true)}
            >
              Place a Bid Now
            </button>
          )}

          {/*  NOT OWNER & NOT OPEN -> SHOW CLOSED MESSAGE */}
          {!isOwner && gig.status !== "Open" && (
            <div className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-center font-medium flex items-center justify-center gap-2">
              <Lock size={18} />
              Applications are closed for this gig. Assigned to {gig.hiredBid?.freelancerId?.fName} {gig.hiredBid?.freelancerId?.lName}
              
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default GigDetails;