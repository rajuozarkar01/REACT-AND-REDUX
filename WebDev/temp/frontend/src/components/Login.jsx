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
    verificationCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [mfaStep, setMfaStep] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode JWT

        if (tokenPayload.exp * 1000 < Date.now()) {
          // Token expired: Remove it and show a message
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          toast.info("Session expired. Please log in again.");
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        toast.error("Invalid session. Please log in again.");
        navigate("/login");
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
      newErrors.password =
        "Password must include a number and a special character";
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
      const res = await axios.post("http://localhost:5002/api/users/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login API Response:", res.data); // Debugging

      if (res.data.mfaRequired) {
        setMfaStep(true);
        toast.info("Verification code sent to your email.");
      } else {
        // ✅ Store correct user structure
        const { user, token, message } = res.data;

        if (!user || !token) {
          throw new Error("Invalid login response: Missing user or token");
        }

        console.log("Login Success! User Data:", user);
        console.log("Login Success! Token:", token);

        toast.success(message || "Login successful");

        // ✅ Store token & user correctly
        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user));
        }

        setFormData({ email: "", password: "", verificationCode: "" });

        // Reload page after successful login
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response && err.response.data) {
        toast.error(
          err.response.data.message || "Login failed. Please try again."
        );
      } else {
        toast.error("Network error. Please check your connection.");
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {mfaStep ? "Enter Verification Code" : "Login"}
        </h2>
        {!mfaStep ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {formData.password && (
                <p
                  className={`text-sm mt-1 ${
                    passwordStrength === "Strong"
                      ? "text-green-500"
                      : passwordStrength === "Moderate"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition transform hover:scale-105 flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="verificationCode"
                placeholder="Verification Code"
                value={formData.verificationCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-3 rounded-xl shadow-md hover:bg-green-600 transition flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : null}
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}

        {!mfaStep && (
          <>
            <div className="my-4 text-center text-gray-500">or login with</div>
            <div className="flex space-x-4">
              <button
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center px-4 py-2 border rounded-xl shadow-sm hover:bg-gray-100 transition"
              >
                <FcGoogle className="mr-2" size={20} /> Google
              </button>

              <button
                onClick={handleFacebookLogin}
                className="flex-1 flex items-center justify-center px-4 py-2 border rounded-xl shadow-sm hover:bg-gray-100 text-blue-600 transition"
              >
                <FaFacebook className="mr-2" size={20} /> Facebook
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
