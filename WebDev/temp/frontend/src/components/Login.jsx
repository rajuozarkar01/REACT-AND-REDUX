import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      if (tokenPayload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        toast.info("Session expired. Please log in again.");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must include a number and a special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length >= 8 && /(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      strength = "Strong";
    } else if (password.length >= 6) {
      strength = "Moderate";
    }
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/users/login", formData);
      toast.success(res.data.message || "Login successful");
      localStorage.setItem("token", res.data.token);

      setFormData({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      const newErrors = {};
      if (err.response && err.response.data) {
        if (err.response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } else if (err.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else if (err.response.data.errors) {
          err.response.data.errors.forEach((error) => {
            newErrors[error.param] = error.msg;
          });
        } else {
          toast.error(err.response.data.message || "An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your internet connection and try again.");
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login clicked");
  };

  const handleFacebookLogin = () => {
    toast.info("Facebook login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {formData.password && <p className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Moderate' ? 'text-yellow-500' : 'text-red-500'}`}>Password Strength: {passwordStrength}</p>}
          </div>

          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or login with</div>

        <div className="flex space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="flex-1 flex items-center justify-center px-4 py-2 border rounded hover:bg-gray-100"
          >
            <FcGoogle className="mr-2" size={20} /> Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="flex-1 flex items-center justify-center px-4 py-2 border rounded hover:bg-gray-100 text-blue-600"
          >
            <FaFacebook className="mr-2" size={20} /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
