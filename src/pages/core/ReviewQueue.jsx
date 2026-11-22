import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReviewSubmissionModal } from '../../components/reviews/ReviewSubmissionModal';
import { StatusBadge, CategoryBadge, PriorityBadge } from '../../components/common/Badge';
import {
  Inbox,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

export const ReviewQueue = () => {
  const { data } = useApp();

  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'contributions' | 'archive'
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState('submission');

  // Submissions awaiting review
  const pendingTaskSubmissions = data.submissions.filter(s => s.status === 'Pending Review');
  // Contributions awaiting review
  const pendingContributions = data.contributions.filter(c => c.status === 'Pending Review');

  // Archived (Verified or Rejected)
  const archivedSubmissions = data.submissions.filter(s => s.status !== 'Pending Review');
  const archivedContributions = data.contributions.filter(c => c.status !== 'Pending Review');

  const handleOpenReview = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-semibold mb-1.5">
            <Inbox className="w-3.5 h-3.5" />
            POR Verification Gateway
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Society Review & Verification Queue
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Audit deliverables, inspect proof links, and verify contributions into members' portfolios.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500 text-white shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            {pendingTaskSubmissions.length + pendingContributions.length} Pending Actions
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'tasks'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Assigned Task Deliverables ({pendingTaskSubmissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contributions')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'contributions'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Self-Logged Contributions ({pendingContributions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('archive')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'archive'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCheck className="w-4 h-4" />
          <span>Verified Archive</span>
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {pendingTaskSubmissions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Queue is completely clear!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                All submitted task deliverables have been audited and verified.
              </p>
            </div>
          ) : (
            pendingTaskSubmissions.map((sub) => {
              const task = data.tasks.find(t => t.id === sub.taskId);
              const submitter = data.users.find(u => u.id === sub.submittedBy);
              return (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-subtle hover:shadow-card transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${submitter?.avatarColor}`}>
                        {submitter?.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {submitter?.name}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold">
                            {submitter?.department}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {submitter?.role} • Submitted on {new Date(sub.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        Time Claimed: <strong>{sub.timeSpentHours} Hours</strong>
                      </span>
                      <button
                        onClick={() => handleOpenReview(sub, 'submission')}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
                      >
                        <span>Audit & Verify</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Task context & deliverables */}
                  <div className="pt-3 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CategoryBadge category={task?.category || 'General'} />
                      <PriorityBadge priority={task?.priority || 'Medium'} />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {task?.title}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                      <strong>Member Notes:</strong> {sub.evidenceNotes}
                    </p>

                    {sub.evidenceLink && (
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-slate-400 font-semibold">Proof Link:</span>
                        <a
                          href={sub.evidenceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1 truncate max-w-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{sub.evidenceLink}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Self-Logged Contributions */}
      {activeTab === 'contributions' && (
        <div className="space-y-4">
          {pendingContributions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No informal contributions waiting
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Members haven't logged any pending unassigned tasks right now.
              </p>
            </div>
          ) : (
            pendingContributions.map((contrib) => {
              const member = data.users.find(u => u.id === contrib.userId);
              return (
                <div
                  key={contrib.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/40 shadow-subtle hover:shadow-card transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${member?.avatarColor}`}>
                        {member?.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {member?.name}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-semibold">
                            Self-Logged
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {member?.role} • Executed on {contrib.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        Invested: <strong>{contrib.hoursSpent} Hours</strong>
                      </span>
                      <button
                        onClick={() => handleOpenReview(contrib, 'contribution')}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Verify Extra Contribution</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {contrib.title}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                      {contrib.description}
                    </p>

                    {contrib.evidenceLink && (
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-slate-400 font-semibold">Attached Proof:</span>
                        <a
                          href={contrib.evidenceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1 truncate max-w-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{contrib.evidenceLink}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 3: Verified Archive */}
      {activeTab === 'archive' && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-500 mb-2">
            Historical audit log of verified and audited submissions
          </div>
          {archivedSubmissions.map((sub) => {
            const task = data.tasks.find(t => t.id === sub.taskId);
            const submitter = data.users.find(u => u.id === sub.submittedBy);
            const reviewer = data.users.find(u => u.id === sub.reviewedBy);
            return (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={sub.status} />
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {task?.title || 'Society Task'}
                    </span>
                  </div>
                  <p className="text-slate-400 truncate">
                    Submitted by <strong>{submitter?.name}</strong> • Reviewed by <strong>{reviewer?.name || 'POR'}</strong> on {new Date(sub.reviewedAt || sub.submittedAt).toLocaleDateString()}
                  </p>
                  {sub.feedbackComment && (
                    <p className="text-emerald-700 dark:text-emerald-300 italic mt-1 line-clamp-1">
                      "{sub.feedbackComment}"
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {sub.reviewScore ? `${sub.reviewScore}/100` : 'Verified'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{sub.timeSpentHours} hrs</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      <ReviewSubmissionModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        itemType={selectedItemType}
      />
    </div>
  );
};
