import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-hot-toast";
import { User, IndianRupee, Mail, Clock, CheckCircle, ArrowLeft, XCircle } from "lucide-react";

const ViewBids = () => {
  const { id } = useParams(); // This is the Gig ID
  const navigate = useNavigate();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await api.get(`/api/bids/${id}`);
        // Handle data structure (data.data.bids)
        setBids(data.data.bids || []);
      } catch (error) {
        console.error("Error fetching bids:", error);
        toast.error(error.data.message || " Could not load bids.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleHire = async (bidId, bidderName) => {
    if (!window.confirm(`Are you sure you want to hire ${bidderName}?`)) return;

    try {
      await api.patch(`/api/bids/${bidId}/hire`, {
        gigId: id,
        bidId: bidId
      });

      toast.success(`Successfully hired ${bidderName}!`);
      // Reload to see the new status
      location.reload();

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Hiring failed");
    }
  };

  // Helper to determine status UI
  const getStatusBadge = (status) => {
    switch (status) {
      case "Hired":
        return (
          <div className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold border border-green-200 dark:border-green-800">
            <CheckCircle size={20} />
            HIRED
          </div>
        );
      case "Rejected":
        return (
          <div className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold border border-red-100 dark:border-red-800">
            <XCircle size={20} />
            REJECTED
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-bold">
            {status}
          </div>
        );
    }
  };

  if (loading) return <div className="p-10 text-center dark:text-white">Loading proposals...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-blue-600 mb-4 transition"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Gig
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Proposals Received
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Review applications and select the best candidate.
        </p>
      </div>

      {/* Bids Grid */}
      {bids.length > 0 ? (
        <div className="grid gap-6">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row md:items-start gap-6 transition-all hover:shadow-md"
            >

              {/* Bidder Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-xl font-bold">
                  {bid.freelancerId?.fName?.[0] || "U"}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {bid.freelancerId?.fName} {bid.freelancerId?.lName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Mail size={14} /> {bid.freelancerId?.email}
                    </div>
                  </div>

                  {/* Bid Amount */}
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-green-600 flex items-center md:justify-end gap-1">
                      <IndianRupee size={20} />{bid.bidAmt}
                    </div>
                    <p className="text-xs text-gray-400">Proposed Budget</p>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                    {bid.message}
                  </p>
                </div>

                {/* Status Text (Below details) */}
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <Clock size={14} /> Status: <span className="uppercase">{bid.status || "Pending"}</span>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col justify-center min-w-[160px]">

                {/* CONDITIONAL RENDERING: Button vs Status Badge */}
                {(!bid.status || bid.status === "Pending") ? (
                  <button
                    onClick={() => handleHire(bid._id, bid.freelancerId?.fName)}
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-600 dark:hover:bg-blue-200 hover:text-white dark:hover:text-blue-900 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <CheckCircle size={18} />
                    Hire Now
                  </button>
                ) : (
                  // Show the Status Badge instead of the button if not Pending
                  getStatusBadge(bid.status)
                )}

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <User className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No bids yet</h3>
          <p className="text-gray-500">Wait for freelancers to apply for your gig.</p>
        </div>
      )}
    </div>
  );
};

export default ViewBids;