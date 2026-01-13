import { useState } from "react";
import api from "../config/axios";
import { toast } from "react-hot-toast";
import { X, Loader2, IndianRupee, Send } from "lucide-react";

const BidModal = ({ isOpen, onClose, gigId, gigTitle }) => {
  const [formData, setFormData] = useState({
    bidAmt: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Prepare Payload with exact variable names
      const payload = {
        gigId: gigId,
        bidAmt: Number(formData.bidAmt), // Ensure it's a number
        message: formData.message
      };

      // 2. Send Request
      await api.post("/api/bids", payload);

      toast.success("Bid placed successfully!");
      onClose(); // Close modal on success
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Place a Bid</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Applying for:</span>
            <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">{gigTitle}</p>
          </div>

          {/* Bid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Bid Amount (₹)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                name="bidAmt"
                required
                min="1"
                value={formData.bidAmt}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="e.g. 4500"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Letter / Message
            </label>
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              placeholder="Why are you the best fit for this gig?"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidModal;