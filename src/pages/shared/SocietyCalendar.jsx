import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/Badge';
import {
  CalendarDays,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Users,
  ShieldCheck,
  Calendar as CalendarIcon,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const SocietyCalendar = () => {
  const { data, currentUser, canAssignTasks } = useApp();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedAssigner, setSelectedAssigner] = useState('All');
  const [selectedAssignee, setSelectedAssignee] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('deadline'); // 'deadline' | 'title' | 'priority'
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTask, setSelectedTask] = useState(null);

  const now = new Date();

  // All assigners (President, Coordinators, Heads, Core members who assigned tasks)
  const assignerIds = Array.from(new Set(data.tasks.map(t => t.assignedBy)));
  const assigners = data.users.filter(u => assignerIds.includes(u.id));

  // All assignees (members who have tasks assigned)
  const assigneeIds = Array.from(new Set(data.tasks.flatMap(t => t.assignedTo)));
  const assignees = data.users.filter(u => assigneeIds.includes(u.id));

  // Filter tasks
  const filteredTasks = data.tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                          task.description.toLowerCase().includes(search.toLowerCase()) ||
                          task.category.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || task.category === selectedDept;
    const matchesAssigner = selectedAssigner === 'All' || task.assignedBy === selectedAssigner;
    const matchesAssignee = selectedAssignee === 'All' || task.assignedTo.includes(selectedAssignee);
    const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;

    return matchesSearch && matchesDept && matchesAssigner && matchesAssignee && matchesStatus;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'deadline') {
      const diff = new Date(a.deadline) - new Date(b.deadline);
      return sortOrder === 'asc' ? diff : -diff;
    } else if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const departments = [
    'All',
    'Sponsorship',
    'Logistics',
    'Design',
    'Marketing',
    'Content',
    'PR & Outreach',
    'Outreach',
    'Tech',
    'Events',
    'Finance'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-xs font-semibold mb-1.5 border border-brand-200/50">
            <CalendarDays className="w-3.5 h-3.5" />
            Society Operations Schedule
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Society Task Deadlines & Delegation Calendar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Society-wide transparency: view all deadlines, who assigned each task, and who is executing it.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            📅 {filteredTasks.length} Active Deadlines
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by task title, keyword or deliverable..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full lg:w-auto"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Departments' : d}
              </option>
            ))}
          </select>

          {/* Assigner Filter (Assigned By Whom) */}
          <select
            value={selectedAssigner}
            onChange={(e) => setSelectedAssigner(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full lg:w-auto font-medium"
          >
            <option value="All">Assigned By: Everyone</option>
            {assigners.map((u) => (
              <option key={u.id} value={u.id}>
                By: {u.name} ({u.role})
              </option>
            ))}
          </select>

          {/* Assignee Filter (Assigned To Whom) */}
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full lg:w-auto font-medium"
          >
            <option value="All">Assigned To: Everyone</option>
            {assignees.map((u) => (
              <option key={u.id} value={u.id}>
                To: {u.name} ({u.department})
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full lg:w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Submitted">Submitted (In Review)</option>
            <option value="Needs Revision">Needs Revision</option>
            <option value="Verified">Verified ✓</option>
          </select>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="lg:hidden flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>{sortedTasks.length} deadlines scheduled</span>
        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
          Swipe table to view assigners & assignees &rarr;
        </span>
      </div>

      {/* MASTER CALENDAR DEADLINE TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[780px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">
                  <button
                    onClick={() => toggleSort('deadline')}
                    className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>Deadline & Urgency</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4">Task Deliverable</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-4">
                  <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Assigned By (Lead / Assigner)
                  </span>
                </th>
                <th className="py-3 px-4">
                  <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold">
                    <Users className="w-3.5 h-3.5" />
                    Assigned To (Members)
                  </span>
                </th>
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No deadlines matching your filters.
                  </td>
                </tr>
              ) : (
                sortedTasks.map((task) => {
                  const deadline = new Date(task.deadline);
                  const isOverdue = task.status !== 'Verified' && deadline < now;
                  const diffHours = Math.round((deadline - now) / (1000 * 60 * 60));
                  const isImminent = diffHours > 0 && diffHours <= 48;

                  // Resolve assigner (Assigned By Whom)
                  const assigner = data.users.find(u => u.id === task.assignedBy);

                  // Resolve assignees (Assigned To Whom)
                  const assigneesList = data.users.filter(u => task.assignedTo.includes(u.id));

                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                        isOverdue ? 'bg-red-50/30 dark:bg-red-950/10' : ''
                      }`}
                    >
                      {/* Deadline Date & Time */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className={`w-4 h-4 shrink-0 ${
                            isOverdue
                              ? 'text-rose-500'
                              : isImminent
                              ? 'text-amber-500'
                              : 'text-slate-400'
                          }`} />
                          <div>
                            <span className={`font-bold block ${
                              isOverdue
                                ? 'text-rose-600 dark:text-rose-400'
                                : isImminent
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-slate-900 dark:text-white'
                            }`}>
                              {deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {isOverdue && <span className="ml-1 text-rose-500 font-bold">• OVERDUE</span>}
                              {isImminent && <span className="ml-1 text-amber-500 font-bold">• {diffHours}h left</span>}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Task Deliverable */}
                      <td className="py-3 px-4 max-w-xs">
                        <span
                          onClick={() => setSelectedTask(task)}
                          className="font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer block line-clamp-1"
                        >
                          {task.title}
                        </span>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {task.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <CategoryBadge category={task.category} />
                      </td>

                      {/* ASSIGNED BY WHOM */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${assigner?.avatarColor || 'bg-indigo-600 text-white'}`}>
                            {assigner?.avatarInitials || 'SH'}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {assigner?.name || 'Leadership'}
                            </span>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block">
                              {assigner?.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ASSIGNED TO WHOM */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                          {assigneesList.slice(0, 3).map((assignee) => (
                            <div
                              key={assignee.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-[11px]"
                              title={`${assignee.name} (${assignee.department})`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold ${assignee.avatarColor}`}>
                                {assignee.avatarInitials}
                              </div>
                              <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[80px]">
                                {assignee.name.split(' ')[0]}
                              </span>
                            </div>
                          ))}
                          {assigneesList.length > 3 && (
                            <span className="text-[10px] font-bold text-slate-400">
                              +{assigneesList.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <PriorityBadge priority={task.priority} />
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <StatusBadge status={isOverdue ? 'Overdue' : task.status} />
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          View →
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
      />
    </div>
  );
};
