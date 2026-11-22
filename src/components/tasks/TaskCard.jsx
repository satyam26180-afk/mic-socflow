import React from 'react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { Calendar, Clock, CheckCircle2, AlertTriangle, Users, ExternalLink, ArrowRight, UploadCloud } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TaskCard = ({
  task,
  onOpenDetail,
  onSubmitWork,
  onReviewWork,
  showActions = true
}) => {
  const { data, currentUser } = useApp();

  const isAssignedToCurrentUser = currentUser && task.assignedTo.includes(currentUser.id);
  const isCore = currentUser?.tier === 'Core';

  // Check if overdue
  const isOverdue = task.status !== 'Verified' && new Date(task.deadline) < new Date();
  const deadlineDate = new Date(task.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate days/hours left
  const now = new Date();
  const diffHours = Math.round((deadlineDate - now) / (1000 * 60 * 60));
  const isImminent = diffHours > 0 && diffHours <= 48;

  // Find assignees
  const assignedUsers = data.users.filter(u => task.assignedTo.includes(u.id));

  // Find submission if any
  const taskSubmissions = data.submissions.filter(s => s.taskId === task.id);
  const latestSubmission = taskSubmissions[0];

  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all hover:shadow-card group ${
      isOverdue
        ? 'border-red-300 dark:border-red-900/60'
        : task.status === 'Verified'
        ? 'border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/10'
        : task.status === 'Submitted'
        ? 'border-amber-200 dark:border-amber-900/40'
        : task.status === 'Needs Revision'
        ? 'border-orange-300 dark:border-orange-900/60'
        : 'border-slate-200/80 dark:border-slate-800'
    }`}>
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <CategoryBadge category={task.category} />
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex items-center gap-1.5">
          {isOverdue ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
              <AlertTriangle className="w-3 h-3" /> Overdue
            </span>
          ) : (
            <StatusBadge status={task.status} />
          )}
        </div>
      </div>

      {/* Title */}
      <h4 
        onClick={() => onOpenDetail && onOpenDetail(task)}
        className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 cursor-pointer transition-colors line-clamp-2 leading-snug"
      >
        {task.title}
      </h4>

      {/* Description Snippet */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Deadline & Points Row */}
      <div className="flex items-center justify-between text-xs mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className={`flex items-center gap-1.5 font-medium ${
          isOverdue 
            ? 'text-rose-600 dark:text-rose-400 font-bold' 
            : isImminent 
            ? 'text-amber-600 dark:text-amber-400 font-bold' 
            : 'text-slate-500 dark:text-slate-400'
        }`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDeadline}</span>
        </div>
        <div className="font-bold text-brand-600 dark:text-brand-400">
          +{task.points} pts
        </div>
      </div>

      {/* Assignee Avatars & Actions */}
      <div className="flex items-center justify-between mt-3">
        {/* Avatars */}
        <div className="flex -space-x-1.5 overflow-hidden py-1">
          {assignedUsers.slice(0, 3).map((u) => (
            <div
              key={u.id}
              title={`${u.name} (${u.department})`}
              className={`w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] font-bold ${u.avatarColor}`}
            >
              {u.avatarInitials}
            </div>
          ))}
          {assignedUsers.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] font-bold">
              +{assignedUsers.length - 3}
            </div>
          )}
        </div>

        {/* Action Button */}
        {showActions && (
          <div className="flex items-center gap-2">
            {/* If Member is assigned and task can be submitted */}
            {!isCore && isAssignedToCurrentUser && task.status !== 'Verified' && (
              <button
                onClick={() => onSubmitWork && onSubmitWork(task.id)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm flex items-center gap-1 transition-all"
              >
                <UploadCloud className="w-3 h-3" />
                <span>{task.status === 'Needs Revision' ? 'Resubmit' : 'Submit Proof'}</span>
              </button>
            )}

            {/* If Core and task is Submitted awaiting review */}
            {isCore && task.status === 'Submitted' && latestSubmission && (
              <button
                onClick={() => onReviewWork && onReviewWork(latestSubmission)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm flex items-center gap-1 transition-all"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Verify</span>
              </button>
            )}

            <button
              onClick={() => onOpenDetail && onOpenDetail(task)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              title="View details"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
