import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get("/api/me/auth");
        // CHECK THIS: Ensure this matches your backend response.
        // If /me returns { data: { user: {...} } }, use data.data.user
        // If /me returns { data: { ...user } }, use data.data
        setUser(data.data.user || data.data); 
      } catch (error) {
        // If 401/403, just set user to null (not logged in)
        setUser(null);
      } finally {
        setLoading(false); // ✅ App is ready to render
      }
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      setUser(data.data.user);
      toast.success("Welcome back!");
      return true;
    } catch (error) {
      // console.log("error : " + error)
      // console.log(error.response)
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (fName, lName, email, password) => {
    try {
      await axios.post("/api/auth/register", { fName, lName, email, password });
      toast.success("Account created! Please login.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {/* Prevent the app from rendering until we know if the user is logged in.
         This fixes the "User Undefined" bugs in children components.
      */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading Application...
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);