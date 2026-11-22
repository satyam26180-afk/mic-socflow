import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileText,
  Clock,
  Sparkles,
  AlertCircle,
  MessageSquareQuote,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReviewSubmissionModal = ({
  isOpen,
  onClose,
  item = null, // Can be either a Submission or a Contribution
  itemType = 'submission' // 'submission' | 'contribution'
}) => {
  const { data, reviewSubmission, reviewContribution, currentUser } = useApp();

  const [decision, setDecision] = useState('approve'); // 'approve' | 'revision' | 'reject'
  const [reviewScore, setReviewScore] = useState(95);
  const [awardedPoints, setAwardedPoints] = useState(50);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [error, setError] = useState('');

  if (!item) return null;

  // Resolve member and task
  const memberId = itemType === 'submission' ? item.submittedBy : item.userId;
  const member = data.users.find(u => u.id === memberId);
  const task = itemType === 'submission' ? data.tasks.find(t => t.id === item.taskId) : null;

  const handleReview = (e) => {
    e.preventDefault();
    if (decision !== 'approve' && !feedbackComment.trim()) {
      setError('Please provide feedback comments explaining what is missing or needed.');
      return;
    }

    if (itemType === 'submission') {
      const status = decision === 'approve' ? 'Verified' : (decision === 'revision' ? 'Needs Revision' : 'Rejected');
      reviewSubmission(item.id, {
        status,
        reviewScore: Number(reviewScore),
        feedbackComment: feedbackComment.trim()
      });
    } else {
      // Contribution
      const status = decision === 'approve' ? 'Verified' : 'Rejected';
      reviewContribution(item.id, {
        status,
        awardedPoints: Number(awardedPoints),
        feedbackComment: feedbackComment.trim()
      });
    }

    if (decision === 'approve') {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={itemType === 'submission' ? 'Verify Task Deliverable' : 'Verify Self-Logged Contribution'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleReview} className="space-y-4">
        {/* Member Header */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${member?.avatarColor}`}>
              {member?.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {member?.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-semibold">
                  {member?.department}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {member?.role} • Submitted on {new Date(item.submittedAt || item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Claimed Time:</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {item.timeSpentHours || item.hoursSpent} Hours
            </span>
          </div>
        </div>

        {/* Task / Work Context */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {itemType === 'submission' ? 'Task Deliverable' : 'Informal Contribution'}
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {itemType === 'submission' ? task?.title : item.title}
          </h4>
          {task?.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/40">
              <strong>Brief:</strong> {task.description}
            </p>
          )}
        </div>

        {/* Member Execution Notes */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-brand-500" />
            Member's Execution Summary:
          </span>
          <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
            {item.evidenceNotes || item.description}
          </p>
        </div>

        {/* Evidence Link & Attachments */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Attached Evidence & Proof
          </span>
          {item.evidenceLink ? (
            <a
              href={item.evidenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-brand-50 hover:bg-brand-100/80 dark:bg-brand-950/40 dark:hover:bg-brand-950/70 border border-brand-200/60 dark:border-brand-800 text-brand-700 dark:text-brand-300 transition-colors group"
            >
              <div className="flex items-center gap-2 truncate">
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span className="text-xs font-medium truncate">{item.evidenceLink}</span>
              </div>
              <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 shrink-0 group-hover:underline">
                Open Proof Link ↗
              </span>
            </a>
          ) : (
            <div className="text-xs text-slate-400 italic p-2">
              No web link provided.
            </div>
          )}

          {item.attachments && item.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {item.attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{att.name}</span>
                  <span className="text-[10px] text-slate-400">({att.size})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verification Decision Radios */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Verification Verdict *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label
              className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                decision === 'approve'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="decision"
                value="approve"
                checked={decision === 'approve'}
                onChange={() => setDecision('approve')}
                className="hidden"
              />
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold">Verify & Record ✓</p>
                <p className="text-[10px] text-slate-400">Add to verified portfolio</p>
              </div>
            </label>

            {itemType === 'submission' && (
              <label
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  decision === 'revision'
                    ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-800 dark:text-orange-200 ring-2 ring-orange-500/20'
                    : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="decision"
                  value="revision"
                  checked={decision === 'revision'}
                  onChange={() => setDecision('revision')}
                  className="hidden"
                />
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Request Revision ✕</p>
                  <p className="text-[10px] text-slate-400">Ask for updates</p>
                </div>
              </label>
            )}

            <label
              className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                decision === 'reject'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 ring-2 ring-rose-500/20'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name="decision"
                value="reject"
                checked={decision === 'reject'}
                onChange={() => setDecision('reject')}
                className="hidden"
              />
              <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <div>
                <p className="text-xs font-bold">Reject</p>
                <p className="text-[10px] text-slate-400">Unsatisfactory evidence</p>
              </div>
            </label>
          </div>
        </div>

        {/* Score / Points if Approving */}
        {decision === 'approve' && (
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between">
            {itemType === 'submission' ? (
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-xs font-semibold text-emerald-900 dark:text-emerald-200 mb-1">
                  <span>Appraisal Quality Score:</span>
                  <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{reviewScore}/100</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={reviewScore}
                  onChange={(e) => setReviewScore(e.target.value)}
                  className="w-full accent-emerald-600"
                />
              </div>
            ) : (
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-xs font-semibold text-emerald-900 dark:text-emerald-200 mb-1">
                  <span>Award Contribution Points:</span>
                  <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">+{awardedPoints} pts</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={awardedPoints}
                  onChange={(e) => setAwardedPoints(e.target.value)}
                  className="w-full accent-emerald-600"
                />
              </div>
            )}
          </div>
        )}

        {/* Feedback Comment */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Feedback & Endorsement Comment {decision !== 'approve' && '* (Required)'}
          </label>
          <textarea
            rows={3}
            placeholder={
              decision === 'approve'
                ? "Praise the member's rigor, highlight standout metrics, or add an appraisal endorsement..."
                : "Specifically explain what corrections or additional evidence are needed..."
            }
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            required={decision !== 'approve'}
          />
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-5 py-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all flex items-center gap-1.5 ${
              decision === 'approve'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                : decision === 'revision'
                ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/20'
                : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
            }`}
          >
            {decision === 'approve' && <CheckCircle2 className="w-4 h-4" />}
            {decision === 'revision' && <Clock className="w-4 h-4" />}
            {decision === 'reject' && <XCircle className="w-4 h-4" />}
            <span>
              {decision === 'approve'
                ? 'Confirm & Verify Work'
                : decision === 'revision'
                ? 'Send Revision Request'
                : 'Confirm Rejection'}
            </span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
