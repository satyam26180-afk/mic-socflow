import React from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  ExternalLink,
  FileText,
  AlertTriangle,
  UploadCloud,
  ShieldCheck,
  Tag,
  Trash2
} from 'lucide-react';

export const TaskDetailModal = ({
  isOpen,
  onClose,
  task = null,
  onSubmitWork,
  onReviewWork
}) => {
  const { data, currentUser, deleteTask } = useApp();

  if (!task) return null;

  const isCore = currentUser?.tier === 'Core';
  const isAssigned = currentUser && task.assignedTo.includes(currentUser.id);
  const assignedUsers = data.users.filter(u => task.assignedTo.includes(u.id));
  const assignedBy = data.users.find(u => u.id === task.assignedBy);
  const event = task.eventProjectId ? data.events.find(e => e.id === task.eventProjectId) : null;
  const submissions = data.submissions.filter(s => s.taskId === task.id);
  const latestSubmission = submissions[0];

  const deadline = new Date(task.deadline);
  const isOverdue = task.status !== 'Verified' && deadline < new Date();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      deleteTask(task.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Overview & Verification Record" maxWidth="max-w-2xl">
      <div className="space-y-5">
        {/* Top Badges & Points */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={task.category} />
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={isOverdue ? 'Overdue' : task.status} />
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-bold text-xs border border-brand-200/50 dark:border-brand-800">
              +{task.points} Contribution Points
            </span>
            {isCore && (
              <button
                onClick={handleDelete}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Task Title & Description */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {task.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed">
            {task.description || 'No detailed instructions provided.'}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Deadline</span>
            <span className={`font-semibold ${isOverdue ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
              {deadline.toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Estimated Time</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {task.estimatedHours} Hours
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Assigned By</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {assignedBy?.name || 'Core POR'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Proof Required</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {task.evidenceRequired ? 'Mandatory' : 'Trust-based'}
            </span>
          </div>
        </div>

        {/* Linked Event if any */}
        {event && (
          <div className="p-3 bg-brand-50/40 dark:bg-brand-950/20 border border-brand-200/50 dark:border-brand-900/50 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider block">
                Linked Flagship Project
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {event.title}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">{event.category}</span>
          </div>
        )}

        {/* Assignees List */}
        <div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            Assigned Committee Members ({assignedUsers.length})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {assignedUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${u.avatarColor}`}>
                  {u.avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {u.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {u.role} ({u.department})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions Section */}
        {submissions.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Submission History & Verification ({submissions.length})
            </span>
            {submissions.map((sub) => {
              const submitter = data.users.find(u => u.id === sub.submittedBy);
              return (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {submitter?.name}
                      </span>
                      <span className="text-slate-400">• {new Date(sub.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <StatusBadge status={sub.status} />
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                    {sub.evidenceNotes}
                  </p>

                  {sub.evidenceLink && (
                    <a
                      href={sub.evidenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{sub.evidenceLink}</span>
                    </a>
                  )}

                  {sub.feedbackComment && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 mt-2">
                      <span className="font-bold block text-[11px] mb-0.5">
                        Core Reviewer Feedback ({sub.reviewScore ? `${sub.reviewScore}/100` : 'Verified'}):
                      </span>
                      {sub.feedbackComment}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {!isCore && isAssigned && task.status !== 'Verified' && (
              <button
                onClick={() => {
                  onClose();
                  if (onSubmitWork) onSubmitWork(task.id);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Submit Deliverable Proof</span>
              </button>
            )}

            {isCore && task.status === 'Submitted' && latestSubmission && (
              <button
                onClick={() => {
                  onClose();
                  if (onReviewWork) onReviewWork(latestSubmission);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Review & Verify Submission</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
