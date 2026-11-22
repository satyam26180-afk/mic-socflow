import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Sun,
  Moon,
  Menu,
  RotateCcw,
  LogOut,
  ExternalLink,
  CheckCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  CalendarDays
} from 'lucide-react';

export const Header = ({ onToggleSidebar }) => {
  const {
    currentUser,
    isDarkMode,
    toggleDarkMode,
    resetToDefaultSeed,
    data,
    markNotificationRead,
    markAllNotificationsRead,
    canAssignTasks
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const hasAssigningPower = canAssignTasks(currentUser);

  // Filter notifications for current user
  const userNotifications = data.notifications.filter(n => {
    if (!currentUser) return false;
    return n.userId === currentUser.id;
  });

  const unreadCount = userNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetData = () => {
    if (window.confirm('Reset all MIC tasks, submissions, and member data back to the original demo state?')) {
      resetToDefaultSeed();
      navigate(hasAssigningPower ? '/core/dashboard' : '/member/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Society Brand */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={onToggleSidebar}
            aria-label="Open navigation menu"
            className="p-2 sm:p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
            <img
              src="/mic-logo.png"
              alt="MIC Logo"
              className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm shrink-0"
            />
            <div className="min-w-0">
              <div className="leading-none truncate">
                <span className="font-extrabold text-xs sm:text-base tracking-tight text-slate-900 dark:text-white">
                  Management Interaction Cell
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-rose-600 dark:text-rose-400 font-semibold tracking-wider sm:tracking-widest uppercase mt-0.5 truncate">
                SSCBS · SocFlow Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Right: Actions & User Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick link to Society Deadlines Calendar */}
          <Link
            to="/calendar"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            title="View Deadlines Calendar: Assigned By Whom to Whom"
          >
            <CalendarDays className="w-3.5 h-3.5 text-brand-500" />
            <span>Deadlines Calendar</span>
          </Link>

          {/* Reset Demo Data Button */}
          <button
            onClick={handleResetData}
            title="Reset to fresh demo seed data"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-28px)] max-w-sm sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden">
                <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {userNotifications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No notifications right now.
                    </div>
                  ) : (
                    userNotifications.slice(0, 10).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.link) navigate(n.link);
                          setNotifOpen(false);
                        }}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {n.type === 'verified' ? (
                            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          ) : n.type === 'revision_requested' ? (
                            <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                              <Clock className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                              <Sparkles className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-center">
                  <Link
                    to={hasAssigningPower ? '/core/reviews' : '/member/tasks'}
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 inline-flex items-center gap-1"
                  >
                    View active queue <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Logged-in user badge — static, no switching */}
          {currentUser && (
            <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 shrink-0">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${currentUser.avatarColor || 'bg-rose-700 text-white'}`}>
                {currentUser.avatarInitials}
              </div>
              <div className="block">
                <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
                  <span className="hidden sm:inline text-xs font-semibold text-slate-900 dark:text-white max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    currentUser.role === 'President'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : currentUser.role === 'Vice President'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : currentUser.role === 'Coordinator'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      : hasAssigningPower
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {currentUser.role === 'President' ? 'PRESIDENT' : currentUser.role === 'Vice President' ? 'VP' : currentUser.role === 'Coordinator' ? 'COORD' : hasAssigningPower ? 'CORE' : 'OC'}
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[130px] mt-0.5">
                  {currentUser.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
