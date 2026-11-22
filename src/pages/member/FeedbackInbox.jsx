import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquareQuote, Star, Sparkles, Award, UserCheck, Calendar } from 'lucide-react';

export const FeedbackInbox = () => {
  const { data, currentUser } = useApp();

  if (!currentUser) return null;

  const myFeedback = data.feedback.filter(f => f.toUserId === currentUser.id);

  const avgRating = myFeedback.length > 0
    ? (myFeedback.reduce((acc, f) => acc + f.rating, 0) / myFeedback.length).toFixed(1)
    : '5.0';

  const kudosCount = myFeedback.filter(f => f.type === 'Kudos').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-xs font-semibold mb-1.5">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          Endorsements & Performance Notes
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Leadership Feedback Inbox
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Objective feedback, constructive coaching notes, and commendations recorded by Core Committee PORs.
        </p>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle text-center">
          <span className="text-xs text-slate-400 block mb-1">Average POR Rating</span>
          <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>{avgRating} / 5.0</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Across {myFeedback.length} evaluations</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle text-center">
          <span className="text-xs text-slate-400 block mb-1">Commendations & Kudos</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {kudosCount}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Formal recognitions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle text-center">
          <span className="text-xs text-slate-400 block mb-1">Portfolio Weight</span>
          <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
            20%
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Component of appraisal index</span>
        </div>
      </div>

      {/* Feed of Feedback */}
      <div className="space-y-4">
        {myFeedback.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <MessageSquareQuote className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No feedback entries yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Once Core Committee members verify your submissions, their commendations and appraisal comments will appear here.
            </p>
          </div>
        ) : (
          myFeedback.map((fb) => {
            const author = data.users.find(u => u.id === fb.fromUserId);
            const task = fb.taskId ? data.tasks.find(t => t.id === fb.taskId) : null;
            const isKudos = fb.type === 'Kudos';

            return (
              <div
                key={fb.id}
                className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                  isKudos
                    ? 'border-emerald-200/80 dark:border-emerald-950/60'
                    : 'border-amber-200/80 dark:border-amber-950/60'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${author?.avatarColor || 'bg-slate-600 text-white'}`}>
                      {author?.avatarInitials || 'CP'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {author?.name || 'Core POR'}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 font-bold">
                          {author?.role || 'Core Committee'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isKudos
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {isKudos ? '🎉 Praise' : '💡 Coaching'}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      {'★'.repeat(fb.rating)}
                    </div>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  {task && (
                    <div className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                      Re: {task.title}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{fb.message}"
                  </p>

                  {fb.tags && fb.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-2 flex-wrap">
                      {fb.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
