import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { User, Mail, LogOut, Activity } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (!token) {
      toast.error("You need to log in first!");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const fetchRecentActivities = async () => {
      try {
        const res = await axios.get("/api/users/activities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentActivities(res.data);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchUserData();
    fetchRecentActivities();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard! 🎉</h1>
      {user ? (
        <div className="mb-6 bg-white p-4 rounded shadow-md">
          <div className="flex items-center mb-2">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            <p className="text-lg">Logged in as: <strong>{user.name}</strong></p>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-green-500" />
            <p className="text-lg">Email: <strong>{user.email}</strong></p>
          </div>
        </div>
      ) : (
        <p className="text-lg">Loading user data...</p>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-purple-500" /> Recent Activities
        </h2>
        {recentActivities.length > 0 ? (
          <ul className="space-y-2">
            {recentActivities.map((activity, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded shadow-sm">
                {activity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activities found.</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center"
      >
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </button>
    </div>
  );
};

export default Dashboard;
