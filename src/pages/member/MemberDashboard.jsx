import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { TaskCard } from '../../components/tasks/TaskCard';
import { SubmitWorkModal } from '../../components/tasks/SubmitWorkModal';
import { LogContributionModal } from '../../components/contributions/LogContributionModal';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Sparkles,
  Award,
  ArrowRight,
  FileCheck2,
  Calendar,
  CalendarDays,
  Star,
  Layers,
  HelpCircle
} from 'lucide-react';

export const MemberDashboard = () => {
  const { data, currentUser, getMemberStats } = useApp();

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isLogContribOpen, setIsLogContribOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitTaskId, setSubmitTaskId] = useState(null);

  if (!currentUser) return null;

  const stats = getMemberStats(currentUser.id);

  // Tasks assigned to this member
  const myTasks = data.tasks.filter(t => t.assignedTo.includes(currentUser.id));

  // Today & Overdue
  const now = new Date();
  const overdueTasks = myTasks.filter(t => t.status !== 'Verified' && new Date(t.deadline) < now);

  // Approaching deadlines (due within next 3 days)
  const imminentTasks = myTasks.filter(t => {
    if (t.status === 'Verified') return false;
    const diffHours = (new Date(t.deadline) - now) / (1000 * 60 * 60);
    return diffHours >= 0 && diffHours <= 72;
  });

  // Today's pending agenda
  const todayPending = myTasks.filter(t =>
    t.status === 'Pending' || t.status === 'In Progress' || t.status === 'Needs Revision'
  );

  // Recent verified items
  const recentVerified = myTasks.filter(t => t.status === 'Verified').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-zinc-950 via-rose-950 to-zinc-900 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-700/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-rose-200 text-xs font-semibold mb-3">
              <img src="/mic-logo.png" alt="MIC" className="h-5 w-auto object-contain brightness-200" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Management Interaction Cell • SSCBS · Member Workspace
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-brand-200/80 mt-1 max-w-xl">
              Track your pending society deliverables, submit proof for verification, and check the society deadlines calendar.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap w-full md:w-auto">
            <Link
              to="/calendar"
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              <CalendarDays className="w-4 h-4 text-brand-300" />
              <span>Deadlines Calendar</span>
            </Link>
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Submit Executed Work</span>
            </button>
            <button
              onClick={() => setIsLogContribOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Log Extra Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* THREE CORE QUESTIONS ANSWERS PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Q1: What do I need to do? */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-[11px] font-black">1</span>
              <span>WHAT DO I NEED TO DO?</span>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {todayPending.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active tasks assigned to you
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            {overdueTasks.length > 0 ? (
              <span className="font-bold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {overdueTasks.length} task overdue! Action required
              </span>
            ) : imminentTasks.length > 0 ? (
              <span className="font-semibold text-amber-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {imminentTasks.length} deadline(s) approaching soon
              </span>
            ) : (
              <span className="text-emerald-600 font-medium">
                ✓ All deadlines on schedule
              </span>
            )}
          </div>
        </div>

        {/* Q2: What have I done? */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-[11px] font-black">2</span>
              <span>WHAT HAVE I DONE?</span>
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.completed}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Verified deliverables in your portfolio
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-500">Extra logged hours:</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">+{stats.extraHours}h verified</span>
          </div>
        </div>

        {/* Q3: How am I performing? */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-[11px] font-black">3</span>
              <span>HOW AM I PERFORMING?</span>
            </div>
            <div className="text-3xl font-black text-amber-500">
              {stats.score}/100
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Objective semester appraisal score
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-500">On-Time Punctuality:</span>
            <span className="font-bold text-emerald-600">{stats.onTimeRate}%</span>
          </div>
        </div>
      </div>

      {/* TODAY & Approaching Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Focus List */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-600" />
                Today's Action Items ({todayPending.length})
              </h3>
              <p className="text-xs text-slate-400">
                Tasks assigned to you requiring active progress or proof submission
              </p>
            </div>
            <Link
              to="/member/tasks"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              View Kanban →
            </Link>
          </div>

          <div className="space-y-3">
            {todayPending.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                🎉 No pending tasks! You are fully caught up.
              </div>
            ) : (
              todayPending.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold">
                        {task.category}
                      </span>
                      {task.status === 'Needs Revision' && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 font-bold">
                          ⚠️ Revision Requested
                        </span>
                      )}
                    </div>
                    <h4
                      onClick={() => setSelectedTask(task)}
                      className="text-xs font-bold text-slate-900 dark:text-white truncate cursor-pointer hover:text-brand-600"
                    >
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Due: {new Date(task.deadline).toLocaleDateString()} • +{task.points} pts
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitTaskId(task.id);
                      setIsSubmitOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm flex items-center gap-1 shrink-0"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Record & Verified Portfolio Snapshot */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  My Record & Extracurricular Portfolio
                </h3>
                <p className="text-xs text-slate-400">
                  Proof-backed records verified by MIC Leadership
                </p>
              </div>
              <Link
                to="/member/portfolio"
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Open Full Portfolio →
              </Link>
            </div>

            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
                <span className="text-xs text-slate-400 block mb-0.5">Total Points Earned</span>
                <span className="text-xl font-black text-brand-600 dark:text-brand-400">
                  {stats.totalPoints} pts
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
                <span className="text-xs text-slate-400 block mb-0.5">Events Participated</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {stats.eventsCount} Events
                </span>
              </div>
            </div>

            {/* Recent Verified deliverables */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Recently Verified Work:
              </span>
              {recentVerified.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No verified tasks yet. Complete your pending items to build proof!
                </div>
              ) : (
                recentVerified.map((t) => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 text-xs flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate mr-2">
                      {t.title}
                    </span>
                    <span className="font-bold text-emerald-600 shrink-0">
                      +{t.points} pts ✓
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/member/portfolio"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-brand-500" />
              <span>Generate Shareable / Printable Portfolio Certificate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SubmitWorkModal
        isOpen={isSubmitOpen}
        onClose={() => {
          setIsSubmitOpen(false);
          setSubmitTaskId(null);
        }}
        defaultTaskId={submitTaskId}
      />
      <LogContributionModal
        isOpen={isLogContribOpen}
        onClose={() => setIsLogContribOpen(false)}
      />
      <TaskDetailModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onSubmitWork={(tId) => {
          setSubmitTaskId(tId);
          setIsSubmitOpen(true);
        }}
      />
    </div>
  );
};
