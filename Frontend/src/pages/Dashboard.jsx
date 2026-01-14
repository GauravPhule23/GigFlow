import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/axios";
import {  IndianRupee, ArrowRight, Search, Calendar, Filter } from "lucide-react";

const Dashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // Default to All
  const [self, setSelf] = useState(false);

  // Fetch Gigs Function
  const fetchGigs = async () => {
    setLoading(true);
    try {
      // Build Query Params string
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "All") params.append("status", statusFilter);
      if (self) params.append("self", "true");

      // Send Request to Backend
      const { data } = await api.get(`/api/gigs?${params.toString()}`);
      
      setGigs(data.data?.gigs || data.gigs || []);
    } catch (error) {
      console.error("Error fetching gigs:", error);
      setGigs([]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when filters change
  useEffect(() => {
    // Debounce search slightly to avoid too many API calls while typing
    const timeoutId = setTimeout(() => {
      fetchGigs();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, self]);

  return (
    <div className="max-w-6xl mx-auto">

      {/*FILTERS SECTION */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Find Work
        </h1>

        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border outline-none bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full lg:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-600 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* My Gigs Toggle */}
          <label className="flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition select-none">
            <input 
              type="checkbox" 
              checked={self}
              onChange={(e) => setSelf(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">My Gigs</span>
          </label>
        </div>
      </div>

      {/* RESULTS SECTION  */}
      {loading ? (
         <div className="p-20 text-center text-gray-500">Loading Gigs...</div>
      ) : gigs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <div key={gig._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1 pr-2">
                    {gig.title}
                  </h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase ${
                    gig.status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"
                  }`}>
                    {gig.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {gig.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                   {/* Meta Data */}
                  
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-purple-500" /> 
                    <span>Due: {new Date(gig.completionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-green-600" /> 
                    <span className="font-semibold">₹{gig.budget}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 rounded-b-xl">
                <Link
                  to={`/gig/${gig._id}`}
                  className="flex items-center justify-center gap-2 w-full py-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No gigs found. Try changing filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;