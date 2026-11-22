import React from 'react';

export const StatusBadge = ({ status }) => {
  const styles = {
    'Pending': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Submitted': 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800 animate-pulse',
    'Pending Review': 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Verified': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Needs Revision': 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'Rejected': 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    'Overdue': 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const currentStyle = styles[status] || styles['Pending'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStyle}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></span>
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const styles = {
    'Low': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    'Medium': 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
    'High': 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    'Urgent': 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-semibold',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${styles[priority] || styles['Medium']}`}>
      {priority === 'Urgent' && <span className="mr-1">🔥</span>}
      {priority}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  const styles = {
    'Sponsorship': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    'Design': 'bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300',
    'Logistics': 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
    'Tech': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300',
    'Content': 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300',
    'PR & Outreach': 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
    'Outreach': 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
    'Events': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300',
    'Finance': 'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[category] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
      {category}
    </span>
  );
};

export const TierBadge = ({ tier, userId }) => {
  const isAdvisory = userId === 'user-pres-1' || userId === 'user-vp-1';
  if (tier === 'Core') {
    if (isAdvisory) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
          Advisory Committee
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
        Core Committee
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      Organising Committee
    </span>
  );
};
