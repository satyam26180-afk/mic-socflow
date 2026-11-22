import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CheckSquare,
  Inbox,
  Users,
  Award,
  CalendarDays,
  FileCheck2,
  MessageSquareQuote,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  BookOpen,
  LogOut,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, data, getMemberStats, canAssignTasks, logoutUser } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const hasAssigningPower = canAssignTasks(currentUser);

  // Count pending reviews for leadership badge
  const pendingTaskSubmissions = data.submissions.filter(s => s.status === 'Pending Review').length;
  const pendingContributions = data.contributions.filter(c => c.status === 'Pending Review').length;
  const totalPendingReviews = pendingTaskSubmissions + pendingContributions;

  // Member stats for footer badge
  const memberStats = !hasAssigningPower ? getMemberStats(currentUser.id) : null;

  // Navigation for President, Coordinators, Department Heads, and Core Committee
  const leadershipNavItems = [
    { name: 'Dashboard', path: '/core/dashboard', icon: LayoutDashboard },
    { name: 'Tasks & Assignment', path: '/core/tasks', icon: CheckSquare },
    { 
      name: 'Review Queue', 
      path: '/core/reviews', 
      icon: Inbox, 
      badge: totalPendingReviews > 0 ? totalPendingReviews : null 
    },
    { name: 'Members Directory', path: '/core/members', icon: Users },
    { name: 'Performance & Appraisals', path: '/core/appraisals', icon: Award },
    { name: 'Events & Projects', path: '/core/events', icon: CalendarDays },
    { name: 'Deadlines Calendar', path: '/calendar', icon: CalendarDays },
  ];

  // Navigation for Organising Committee (Task assigning dashboard is completely removed!)
  const memberNavItems = [
    { name: 'Personal Dashboard', path: '/member/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks & Execution', path: '/member/tasks', icon: CheckSquare },
    { name: 'Deadlines Calendar', path: '/calendar', icon: CalendarDays },
    { name: 'Feedback Inbox', path: '/member/feedback', icon: MessageSquareQuote },
    { name: 'Verified Portfolio', path: '/member/portfolio', icon: FileCheck2 },
  ];

  const currentNavItems = hasAssigningPower ? leadershipNavItems : memberNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 lg:top-16 bottom-0 left-0 z-50 w-[280px] sm:w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <img src="/mic-logo.png" alt="MIC Logo" className="h-7 w-auto object-contain" />
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white block leading-tight">
                MIC Portal
              </span>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">
                SSCBS
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Role Indicator Card */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className={`p-3 rounded-xl border ${
            hasAssigningPower 
              ? 'bg-gradient-to-br from-indigo-50/80 to-purple-50/40 dark:from-indigo-950/40 dark:to-purple-950/20 border-indigo-200/60 dark:border-indigo-800/50' 
              : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                currentUser.role === 'President'
                  ? 'bg-amber-600 text-white'
                  : currentUser.role === 'Vice President'
                  ? 'bg-rose-700 text-white'
                  : currentUser.role === 'Coordinator'
                  ? 'bg-purple-600 text-white'
                  : hasAssigningPower
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-brand-600 text-white'
              }`}>
                {currentUser.role}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                {(currentUser.role === 'President' || currentUser.role === 'Vice President') ? 'Advisory Committee' : currentUser.department}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {hasAssigningPower ? 'Task Assigning & Verification Power' : 'Organising Member'}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {hasAssigningPower ? 'Management Suite (MIC)' : 'Member Workspace (MIC)'}
          </div>

          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isActive
                          ? 'bg-white text-brand-600'
                          : 'bg-rose-500 text-white animate-pulse'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Account
          </div>

          <button
            onClick={() => {
              logoutUser();
              onClose();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Sidebar Footer Stats */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          {hasAssigningPower ? (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Society Health</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">92% On-Time</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
                  <img src="/mic-logo.png" alt="MIC" className="h-3.5 w-auto object-contain dark:brightness-150" />
                  MIC · SSCBS
                </p>
            </div>
          ) : (
            <div className="p-3 bg-brand-50/50 dark:bg-brand-950/20 rounded-xl border border-brand-200/50 dark:border-brand-900/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-brand-900 dark:text-brand-200">Appraisal Score</span>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{memberStats?.score || 90}/100</span>
              </div>
              <div className="w-full h-1.5 bg-brand-200 dark:bg-brand-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-500 rounded-full" 
                  style={{ width: `${memberStats?.score || 90}%` }}
                />
              </div>
              <Link 
                to="/member/portfolio" 
                className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 mt-2 block text-center hover:underline"
              >
                View Verified Portfolio →
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
