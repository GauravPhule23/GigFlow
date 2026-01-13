import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './Components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import GigDetails from './pages/GetDetails';
import Login from './pages/Login';
import Home from './pages/Home'; // Import the new Home
import Register from './pages/Register';
import ViewBids from './pages/ViewBids';  

import axios from 'axios';
import CreateGig from './pages/CreateGig';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true; 

// Placeholder for Register until you create it
// const Register = () => <div className="p-10">Register Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Navbar needed, Home handles it) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/gig/:id" element={<GigDetails />} />
           <Route path="/create-gig" element={<CreateGig/>} />
           <Route path="/gig/:id/bids" element={<ViewBids />} />
        </Route>

      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;