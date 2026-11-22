import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCard } from '../../components/tasks/TaskCard';
import { TaskAssignModal } from '../../components/tasks/TaskAssignModal';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import { ReviewSubmissionModal } from '../../components/reviews/ReviewSubmissionModal';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers
} from 'lucide-react';

export const TasksManagement = () => {
  const { data } = useApp();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'kanban' | 'list'
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [reviewSubmissionItem, setReviewSubmissionItem] = useState(null);

  const departments = [
    'All',
    'Sponsorship',
    'Logistics',
    'Social Media',
    'Design',
    'Content',
    'PR & Outreach',
    'Tech',
    'Events',
    'Finance'
  ];

  // Filter tasks
  const filteredTasks = data.tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.description.toLowerCase().includes(search.toLowerCase()) ||
                          t.category.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || t.category === selectedDept;
    const matchesPriority = selectedPriority === 'All' || t.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;

    return matchesSearch && matchesDept && matchesPriority && matchesStatus;
  });

  const kanbanColumns = [
    { title: 'Pending / To Do', status: 'Pending', color: 'border-slate-300 dark:border-slate-700' },
    { title: 'In Progress', status: 'In Progress', color: 'border-blue-400 dark:border-blue-700' },
    { title: 'Submitted (Review)', status: 'Submitted', color: 'border-amber-400 dark:border-amber-700' },
    { title: 'Needs Revision', status: 'Needs Revision', color: 'border-orange-400 dark:border-orange-700' },
    { title: 'Verified Completed', status: 'Verified', color: 'border-emerald-400 dark:border-emerald-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Society Tasks & Operations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage, delegate, and track deliverables across 30 Organising Committee members.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Kanban Board"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 ml-auto sm:ml-0"
          >
            <Plus className="w-4 h-4" />
            <span>Assign Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tasks by title, description or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">🔥 Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted (Review)</option>
              <option value="Needs Revision">Needs Revision</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks View: Kanban or Grid */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map((col) => {
            const columnTasks = filteredTasks.filter(t => t.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-slate-100/60 dark:bg-slate-900/40 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 flex flex-col min-w-[260px]"
              >
                <div className={`flex items-center justify-between pb-2 mb-3 border-b-2 ${col.color}`}>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {col.title}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-20rem)]">
                  {columnTasks.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 italic">
                      No tasks in this stage
                    </div>
                  ) : (
                    columnTasks.map((t) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        onOpenDetail={(task) => setActiveTask(task)}
                        onReviewWork={(sub) => setReviewSubmissionItem(sub)}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid View */
        <div>
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No tasks match your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with different keywords or clear the category and priority filters.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedDept('All');
                  setSelectedPriority('All');
                  setSelectedStatus('All');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onOpenDetail={(t) => setActiveTask(t)}
                  onReviewWork={(sub) => setReviewSubmissionItem(sub)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <TaskAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />
      <TaskDetailModal
        isOpen={!!activeTask}
        onClose={() => setActiveTask(null)}
        task={activeTask}
        onReviewWork={(sub) => setReviewSubmissionItem(sub)}
      />
      <ReviewSubmissionModal
        isOpen={!!reviewSubmissionItem}
        onClose={() => setReviewSubmissionItem(null)}
        item={reviewSubmissionItem}
        itemType="submission"
      />
    </div>
  );
};
