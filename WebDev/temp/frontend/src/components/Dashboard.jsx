import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { User, Mail, LogOut, Activity, Edit, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [userStats, setUserStats] = useState([]);

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
        setEditData({ name: res.data.name, email: res.data.email });
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

    const fetchUserStats = async () => {
      try {
        const res = await axios.get("/api/users/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserStats(res.data);
      } catch (err) {
        console.error("Error fetching user stats:", err);
      }
    };

    fetchUserData();
    fetchRecentActivities();
    fetchUserStats();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/me", editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");
      setUser(editData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard! 🎉</h1>
      {user ? (
        <div className="mb-6 bg-white p-4 rounded shadow-md">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Save
                </button>
                <button type="button" onClick={handleEditToggle} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                <p className="text-lg">Logged in as: <strong>{user.name}</strong></p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-500" />
                <p className="text-lg">Email: <strong>{user.email}</strong></p>
              </div>
              <button onClick={handleEditToggle} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center">
                <Edit className="w-5 h-5 mr-2" /> Edit Profile
              </button>
            </>
          )}
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

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <BarChart2 className="w-6 h-6 mr-2 text-indigo-500" /> User Statistics
        </h2>
        {userStats.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600">No statistics available.</p>
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
