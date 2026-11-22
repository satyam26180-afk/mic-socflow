import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { UploadCloud, Link as LinkIcon, Clock, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SubmitWorkModal = ({ isOpen, onClose, defaultTaskId = null }) => {
  const { data, submitWork, currentUser } = useApp();

  const [taskId, setTaskId] = useState(defaultTaskId || '');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [timeSpentHours, setTimeSpentHours] = useState(4);
  const [mockFileName, setMockFileName] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Available tasks assigned to current user that are not yet verified
  const userTasks = data.tasks.filter(t =>
    t.assignedTo.includes(currentUser?.id) && t.status !== 'Verified'
  );

  useEffect(() => {
    if (defaultTaskId) {
      setTaskId(defaultTaskId);
    } else if (userTasks.length > 0 && !taskId) {
      setTaskId(userTasks[0].id);
    }
  }, [defaultTaskId, userTasks]);

  const selectedTask = data.tasks.find(t => t.id === taskId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskId) {
      setError('Please select a task to submit work for');
      return;
    }
    if (!evidenceNotes.trim()) {
      setError('Please provide a short summary of the work you executed');
      return;
    }
    if (selectedTask?.evidenceRequired && !evidenceLink.trim() && !mockFileName) {
      setError('This task requires proof. Please provide a link (Drive/Figma/GitHub) or attach a file.');
      return;
    }

    const attachments = mockFileName ? [
      { name: mockFileName, size: '4.2 MB', type: 'Uploaded Evidence File' }
    ] : [];

    submitWork({
      taskId,
      evidenceLink: evidenceLink.trim(),
      evidenceNotes: evidenceNotes.trim(),
      attachments,
      timeSpentHours: Number(timeSpentHours)
    });

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {}

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setEvidenceLink('');
      setEvidenceNotes('');
      setMockFileName('');
      setError('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Executed Work with Evidence" maxWidth="max-w-xl">
      {isSuccess ? (
        <div className="py-12 text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Work Submitted for Core Verification!
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Your evidence has been sent to the Core Committee review queue. Once approved, it will be permanently recorded in your verified extracurricular portfolio.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Task Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Assigned Task *
            </label>
            {userTasks.length === 0 ? (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                You have no pending tasks to submit. You can also self-log informal work using "Log Additional Contribution".
              </div>
            ) : (
              <select
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              >
                {userTasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.category}] {t.title} (Due: {new Date(t.deadline).toLocaleDateString()})
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedTask && (
            <div className="p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/50 dark:border-brand-900/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-900 dark:text-brand-300">
                  {selectedTask.title}
                </span>
                <span className="font-bold text-brand-600 dark:text-brand-400">
                  +{selectedTask.points} Points
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {selectedTask.description || 'Deliver task as specified.'}
              </p>
              {selectedTask.evidenceRequired && (
                <span className="inline-block mt-2 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                  ⚠️ Verification Rule: Evidence required for Core sign-off
                </span>
              )}
            </div>
          )}

          {/* Evidence Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span>Proof / Deliverable Link (Google Drive, Figma, GitHub, Canva, Sheet)</span>
              <span className="text-[10px] text-slate-400 font-normal">Public/viewable URL</span>
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                placeholder="https://drive.google.com/drive/folders/... or https://figma.com/file/..."
                value={evidenceLink}
                onChange={(e) => setEvidenceLink(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Mock File Upload Attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Attach Screenshot / Document / Invoice (Mock Upload)
            </label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
              <div className="flex items-center justify-center gap-2">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setMockFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
                >
                  Click to select file
                </label>
                <span className="text-xs text-slate-400">or drop here</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                PNG, JPG, PDF, ZIP or DOCX up to 50MB
              </p>
              {mockFileName && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{mockFileName}</span>
                  <button
                    type="button"
                    onClick={() => setMockFileName('')}
                    className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Evidence Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Execution Notes & Key Outcomes *
            </label>
            <textarea
              rows={3}
              placeholder="What specifically did you achieve? Mention quantitative numbers (e.g. 'Pitched 28 brands, closed 3 deals, logged in sheet')..."
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          {/* Time Invested */}
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Time Invested:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{timeSpentHours} hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={timeSpentHours}
                onChange={(e) => setTimeSpentHours(e.target.value)}
                className="w-full accent-brand-600"
              />
            </div>
          </div>

          {/* Submit Actions */}
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
              disabled={userTasks.length === 0}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Submit for Verification
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
