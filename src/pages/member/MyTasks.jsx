import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCard } from '../../components/tasks/TaskCard';
import { SubmitWorkModal } from '../../components/tasks/SubmitWorkModal';
import { LogContributionModal } from '../../components/contributions/LogContributionModal';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import {
  CheckSquare,
  UploadCloud,
  Sparkles,
  LayoutGrid,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export const MyTasks = () => {
  const { data, currentUser } = useApp();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'grid'
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isLogContribOpen, setIsLogContribOpen] = useState(false);
  const [submitTaskId, setSubmitTaskId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  if (!currentUser) return null;

  // Filter tasks assigned to current user
  const myTasks = data.tasks.filter(t => t.assignedTo.includes(currentUser.id));

  const filteredTasks = myTasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const kanbanColumns = [
    { title: 'To Do', status: 'Pending', color: 'border-slate-300 dark:border-slate-700' },
    { title: 'In Progress', status: 'In Progress', color: 'border-blue-400 dark:border-blue-700' },
    { title: 'Submitted (In Review)', status: 'Submitted', color: 'border-amber-400 dark:border-amber-700' },
    { title: 'Needs Revision ⚠️', status: 'Needs Revision', color: 'border-orange-400 dark:border-orange-700' },
    { title: 'Verified ✓', status: 'Verified', color: 'border-emerald-400 dark:border-emerald-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Assigned Tasks & Deliverables
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Execute work, attach proof links, and track POR verification status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Kanban Board View"
            >
              <Layers className="w-4 h-4" />
            </button>
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
          </div>

          <button
            onClick={() => setIsLogContribOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Log Extra Work</span>
          </button>

          <button
            onClick={() => {
              setSubmitTaskId(null);
              setIsSubmitOpen(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Submit Deliverable Proof</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search my tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          {['Sponsorship', 'Logistics', 'Design', 'Content', 'Tech', 'PR & Outreach', 'Events'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Kanban Board View */}
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
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-20rem)]">
                  {columnTasks.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 italic">
                      No tasks
                    </div>
                  ) : (
                    columnTasks.map((t) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        onOpenDetail={(task) => setActiveTask(task)}
                        onSubmitWork={(tId) => {
                          setSubmitTaskId(tId);
                          setIsSubmitOpen(true);
                        }}
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
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No tasks found
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onOpenDetail={(t) => setActiveTask(t)}
                  onSubmitWork={(tId) => {
                    setSubmitTaskId(tId);
                    setIsSubmitOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
        isOpen={!!activeTask}
        onClose={() => setActiveTask(null)}
        task={activeTask}
        onSubmitWork={(tId) => {
          setSubmitTaskId(tId);
          setIsSubmitOpen(true);
        }}
      />
    </div>
  );
};
