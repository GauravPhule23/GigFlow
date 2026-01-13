import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-hot-toast";
import { Briefcase, MapPin, IndianRupee, Calendar, FileText, Loader2 } from "lucide-react";

const CreateGig = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    location: "",
    completionDate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ✅ FIX: Convert budget from String to Number
      const payload = {
        ...formData,
        budget: Number(formData.budget) 
      };

      await api.post("/api/gigs", payload);
      
      toast.success("Gig posted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      // specific error handling for clearer feedback
      const msg = error.response?.data?.message || "Failed to post gig";
      toast.error(msg.includes("budget") ? "Budget must be a number" : msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-lg border outline-none transition-all duration-300 bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-blue-400";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post a New Gig</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details to find the perfect freelancer.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <textarea
                name="description"
                required
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe project details..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none transition-all duration-300 bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-blue-400`}
              />
            </div>
          </div>

          {/* Grid for Budget & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  name="budget"
                  type="number"
                  required
                  min="1"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="5000"
                  className={inputClass}
                />
              </div>
            </div>

            

          {/* Completion Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Completion Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="completionDate"
                type="date"
                required
                value={formData.completionDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Posting...
                </>
              ) : (
                "Post Gig"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateGig;