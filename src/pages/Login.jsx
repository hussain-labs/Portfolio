import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowUpRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate instead of Navigate

export default function Login() {
  // 2. Initialize the hook
  const navigate = useNavigate(); 

  const ADMIN_CREDENTIALS = {
    email: 'muzamilhussain369@gmail.com', 
    password: 'Muzamil@369#'
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('isAdminLoggedIn');
  }, []);

  const handleChange = (e) => {
    if (error) setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (
        formData.email === ADMIN_CREDENTIALS.email && 
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin'); 
        
        setLoading(false);
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0C10] p-4 font-sans">
      <div className="w-full max-w-md bg-[#16181C] rounded-2xl p-8 shadow-2xl border border-[#B0B0B0]/10 relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#3b82f6] opacity-5 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">Welcome Back</h1>
          <p className="text-[#B0B0B0]">Please enter your details to access the admin panel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm animate-pulse">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#FFFFFF] ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 transition-colors ${error ? 'text-red-500' : 'text-[#B0B0B0] group-focus-within:text-[#3b82f6]'}`} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@itguy.ae"
                className={`w-full bg-[#0A0C10] text-white border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 placeholder-[#B0B0B0]/50 transition-all duration-300
                  ${error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-[#3b82f6]'
                  }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#FFFFFF] ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 transition-colors ${error ? 'text-red-500' : 'text-[#B0B0B0] group-focus-within:text-[#3b82f6]'}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className={`w-full bg-[#0A0C10] text-white border rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:ring-1 placeholder-[#B0B0B0]/50 transition-all duration-300
                  ${error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-[#B0B0B0]/20 focus:border-[#3b82f6] focus:ring-[#3b82f6]'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#B0B0B0] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#3b82f6] text-[#0A0C10] font-bold py-3.5 rounded-xl hover:bg-[#2563eb] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.2)]
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Verifying...' : 'Login to Dashboard'}
            {!loading && <ArrowUpRight className="h-5 w-5" />}
          </button>
        </form>

        <div className="mt-8 border-t border-[#B0B0B0]/10 pt-6 text-center">
          <p className="text-[#B0B0B0] text-sm">
            Not an admin?{" "}
            <a href="/" className="text-[#3b82f6] font-medium hover:underline">
              Return to Portfolio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}