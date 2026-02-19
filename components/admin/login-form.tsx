"use client";

import { useState } from "react";
import { EyeClosed, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("admin_authenticated", "true");
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-2 font-sans">
        <p className="text-sm font-medium text-gray-700">Dear Admin</p>
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">
          Welcome back!
        </h1>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[#E3E3E3] text-[#111528] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password<span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 pr-12 py-3 border border-[#E3E3E3] text-[#111528] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {showPassword ? <EyeClosed size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!email || !password}
        className="w-full bg-[#003DFF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
}
