import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChevronDown, KeyRound, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

const PORTAL_PASSWORD = 'mic1122';

export const LoginPage = () => {
  const { data, loginUser, canAssignTasks } = useApp();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // All users sorted: leadership first, then OC alphabetically
  const allUsers = [
    ...data.users.filter(u => u.tier === 'Core').sort((a, b) => {
      const order = { President: 0, Coordinator: 1 };
      const aO = order[a.role] ?? 2;
      const bO = order[b.role] ?? 2;
      return aO !== bO ? aO - bO : a.name.localeCompare(b.name);
    }),
    ...data.users.filter(u => u.tier === 'Organising').sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const selectedUser = allUsers.find(u => u.id === selectedUserId);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedUserId) {
      setError('Please select your name from the dropdown.');
      return;
    }
    if (password !== PORTAL_PASSWORD) {
      setError('Incorrect password. Please try again.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = loginUser(selectedUserId);
      if (success) {
        const user = data.users.find(u => u.id === selectedUserId);
        navigate(canAssignTasks(user) ? '/core/dashboard' : '/member/dashboard');
      }
      setLoading(false);
    }, 400);
  };

  const tierLabel = (user) => {
    if (user.role === 'President') return { text: 'President', color: 'text-amber-500' };
    if (user.role === 'Vice President') return { text: 'Vice President', color: 'text-rose-400' };
    if (user.role === 'Coordinator') return { text: 'Coordinator', color: 'text-purple-400' };
    if (user.tier === 'Core') return { text: user.role || 'Core Committee', color: 'text-rose-400' };
    return { text: 'Organising Committee', color: 'text-zinc-400' };
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-3.5 sm:px-6 py-6 sm:py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-rose-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-rose-950/30 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo + Title */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-block mb-3 sm:mb-4">
            <img
              src="/mic-logo.png"
              alt="Management Interaction Cell"
              className="h-16 sm:h-20 w-auto object-contain mx-auto drop-shadow-lg"
            />
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Management Interaction Cell
          </h1>
          <p className="text-rose-400 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mt-1">
            SSCBS · Operations Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">Welcome back</h2>
          <p className="text-zinc-400 text-xs mb-5 sm:mb-6">Select your name and enter the portal password to sign in.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Name Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Your Name
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800 border border-zinc-700 hover:border-rose-700 rounded-xl text-sm text-left transition-colors focus:outline-none focus:ring-2 focus:ring-rose-700"
                >
                  {selectedUser ? (
                    <span className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${selectedUser.avatarColor}`}>
                        {selectedUser.avatarInitials}
                      </span>
                      <span>
                        <span className="font-semibold text-white block leading-tight">{selectedUser.name}</span>
                        <span className={`text-[11px] ${tierLabel(selectedUser).color}`}>{tierLabel(selectedUser).text}</span>
                      </span>
                    </span>
                  ) : (
                    <span className="text-zinc-500">Select your name…</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                    {/* Leadership group */}
                    <div className="px-3 pt-2 pb-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Leadership & Core Committee</p>
                    </div>
                    {allUsers.filter(u => u.tier === 'Core').map(user => {
                      const lbl = tierLabel(user);
                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => { setSelectedUserId(user.id); setDropdownOpen(false); setError(''); }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-800 transition-colors text-left ${selectedUserId === user.id ? 'bg-rose-950/50' : ''}`}
                        >
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${user.avatarColor}`}>
                            {user.avatarInitials}
                          </span>
                          <span>
                            <span className="text-sm font-semibold text-white block leading-tight">{user.name}</span>
                            <span className={`text-[11px] ${lbl.color}`}>{lbl.text}</span>
                          </span>
                        </button>
                      );
                    })}

                    {/* OC group */}
                    <div className="px-3 pt-3 pb-1 border-t border-zinc-800 mt-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Organising Committee</p>
                    </div>
                    {allUsers.filter(u => u.tier === 'Organising').map(user => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => { setSelectedUserId(user.id); setDropdownOpen(false); setError(''); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-zinc-800 transition-colors text-left ${selectedUserId === user.id ? 'bg-rose-950/50' : ''}`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${user.avatarColor}`}>
                          {user.avatarInitials}
                        </span>
                        <span className="text-sm font-medium text-zinc-200">{user.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter portal password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-10 py-3 bg-zinc-800 border border-zinc-700 focus:border-rose-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-800 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-rose-700 hover:bg-rose-800 disabled:opacity-60 shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="animate-pulse">Signing in…</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Management Interaction Cell · SSCBS · Operations Portal
        </p>
      </div>
    </div>
  );
};
