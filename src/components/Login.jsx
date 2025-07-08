import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "Sadia" && formData.password === "AUG27") {
      setError("");
      onLoginSuccess(); // ✅ Trigger InvoiceForm display
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
        setError("🚫 Too many failed attempts. Reload the page to try again.");
      } else {
        setError(`❌ Invalid credentials. Attempt ${newAttempts}/3`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transform hover:rotate-x-1 hover:rotate-y-2 transition-transform duration-700 ease-out">
        <h2 className="text-3xl font-bold text-center text-[#FF6F00] mb-6 drop-shadow-md animate-bounce">
          🔐 Secure Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLocked}
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLocked}
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked}
                className="absolute right-3 top-3 text-sm text-gray-500 hover:text-[#FF6F00]"
              >
                {showPassword ? "🙈 Hide" : "👁 Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLocked}
            className={`w-full py-3 font-bold rounded-md transition-transform transform hover:scale-105 ${
              isLocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FF6F00] hover:bg-orange-600 text-white shadow-lg"
            }`}
          >
            {isLocked ? "🔒 Locked" : "🚀 Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
