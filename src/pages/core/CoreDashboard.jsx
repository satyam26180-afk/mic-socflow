import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  Users,
  Award,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CalendarDays
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TaskAssignModal } from '../../components/tasks/TaskAssignModal';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import { ReviewSubmissionModal } from '../../components/reviews/ReviewSubmissionModal';
import { GiveFeedbackModal } from '../../components/members/GiveFeedbackModal';
import { StatusBadge, PriorityBadge } from '../../components/common/Badge';

export const CoreDashboard = () => {
  const { data, currentUser, getMemberStats, canAssignTasks } = useApp();

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reviewItem, setReviewItem] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Stats calculation
  const totalTasks = data.tasks.length;
  const completedTasks = data.tasks.filter(t => t.status === 'Verified').length;
  const pendingTasks = data.tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress' || t.status === 'Needs Revision').length;
  const submittedTasks = data.tasks.filter(t => t.status === 'Submitted').length;

  const now = new Date();
  const overdueTasks = data.tasks.filter(t => {
    if (t.status === 'Verified') return false;
    return new Date(t.deadline) < now;
  });

  const pendingSubmissions = data.submissions.filter(s => s.status === 'Pending Review');
  const pendingContributions = data.contributions.filter(c => c.status === 'Pending Review');
  const totalPendingReviews = pendingSubmissions.length + pendingContributions.length;

  const ocMembers = data.users.filter(u => u.tier === 'Organising');

  // Compute top contributors
  const rankedMembers = ocMembers.map(m => ({
    ...m,
    stats: getMemberStats(m.id)
  })).sort((a, b) => b.stats.score - a.stats.score);

  const topContributors = rankedMembers.slice(0, 5);

  // Department Distribution data for Recharts
  const deptMap = {};
  data.tasks.forEach(t => {
    deptMap[t.category] = (deptMap[t.category] || 0) + 1;
  });
  const deptChartData = Object.keys(deptMap).map(dept => ({
    name: dept,
    tasks: deptMap[dept]
  }));

  // Status Donut Data
  const statusPieData = [
    { name: 'Verified', value: completedTasks, color: '#10b981' },
    { name: 'In Progress', value: pendingTasks, color: '#6366f1' },
    { name: 'In Review', value: submittedTasks, color: '#f59e0b' },
    { name: 'Overdue', value: overdueTasks.length, color: '#ef4444' }
  ].filter(d => d.value > 0);

  // Urgent and high priority tasks
  const urgentTasks = data.tasks
    .filter(t => t.status !== 'Verified' && (t.priority === 'Urgent' || t.priority === 'High'))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-zinc-950 via-rose-950 to-zinc-900 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-700/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-rose-200 text-xs font-semibold mb-3">
              <img src="/mic-logo.png" alt="MIC" className="h-5 w-auto object-contain brightness-200" />
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Management Interaction Cell • SSCBS · Leadership Suite
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-xl">
              Role: <strong>{currentUser?.role}</strong> ({(currentUser?.role === 'President' || currentUser?.role === 'Vice President') ? 'Advisory Committee' : currentUser?.department}) • Full authority to assign tasks, audit submissions, and evaluate performance across 30 Organising Committee members.
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
              onClick={() => setIsAssignOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Assign New Task</span>
            </button>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Give Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Queue Alert Pill if pending */}
      {totalPendingReviews > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Inbox className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {totalPendingReviews} Submissions Awaiting Leadership Verification
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {pendingSubmissions.length} task deliverables + {pendingContributions.length} self-logged member contributions require review.
              </p>
            </div>
          </div>
          <Link
            to="/core/reviews"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all shrink-0 flex items-center justify-center gap-1"
          >
            <span>Open Review Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Society Tasks</span>
            <CheckSquare className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalTasks}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across active MIC wings
          </p>
        </div>

        {/* Verified Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Verified Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {completedTasks}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {Math.round((completedTasks / (totalTasks || 1)) * 100)}% overall completion rate
          </p>
        </div>

        {/* Pending / In Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Execution</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {pendingTasks}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {submittedTasks} submitted & awaiting sign-off
          </p>
        </div>

        {/* Overdue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Overdue Tasks</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {overdueTasks.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Require leadership follow-up
          </p>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Tasks Bar Chart */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Task Workload by Department
              </h3>
              <p className="text-xs text-slate-400">
                Active tasks distributed across functional wings
              </p>
            </div>
            <Link
              to="/calendar"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-lg hover:underline flex items-center gap-1"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Full Calendar →</span>
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-20} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="tasks" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Donut */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Deliverable Health
            </h3>
            <p className="text-xs text-slate-400">
              Ratio of verified vs pending work
            </p>
          </div>

          <div className="h-48 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            {statusPieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-slate-500 truncate">{d.name}:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section: Top Contributors Podium & Urgent Task Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contributors Leaderboard */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Top Contributors (Objective Appraisal Score)
              </h3>
              <p className="text-xs text-slate-400">
                Ranked by verified tasks, on-time delivery & extra hours
              </p>
            </div>
            <Link
              to="/core/appraisals"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Full Board <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topContributors.map((member, index) => (
              <Link
                key={member.id}
                to={`/core/members/${member.id}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    index === 0
                      ? 'bg-amber-400 text-amber-950 font-black ring-2 ring-amber-400/30'
                      : index === 1
                      ? 'bg-slate-300 text-slate-900 font-bold'
                      : index === 2
                      ? 'bg-amber-700 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${member.avatarColor}`}>
                    {member.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-brand-600 transition-colors">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {member.role} ({member.department})
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">
                    {member.stats.score}/100
                  </span>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {member.stats.onTimeRate}% on-time
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Priority & Urgent Tasks Watchlist */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Urgent & High Priority Watchlist
              </h3>
              <p className="text-xs text-slate-400">
                Tasks requiring critical execution or approaching deadlines
              </p>
            </div>
            <Link
              to="/core/tasks"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              All Tasks <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {urgentTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 hover:border-brand-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due {new Date(task.deadline).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="text-brand-600 dark:text-brand-400 font-semibold">
                      +{task.points} pts
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                    Inspect →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskAssignModal isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)} />
      <TaskDetailModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onReviewWork={(sub) => setReviewItem(sub)}
      />
      <ReviewSubmissionModal
        isOpen={!!reviewItem}
        onClose={() => setReviewItem(null)}
        item={reviewItem}
        itemType="submission"
      />
      <GiveFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
};
