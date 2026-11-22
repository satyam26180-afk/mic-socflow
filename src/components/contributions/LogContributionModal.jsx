import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Sparkles, Clock, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LogContributionModal = ({ isOpen, onClose }) => {
  const { logContribution } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Logistics');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hoursSpent, setHoursSpent] = useState(3);
  const [evidenceLink, setEvidenceLink] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    'Logistics & Ground Ops',
    'Sponsorship & Brand Relations',
    'Design & Branding',
    'Tech & Automation',
    'Content & Social Media',
    'PR & Campus Outreach',
    'Hospitality & Speaker Care',
    'Emergency & Crisis Support'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for what you did');
      return;
    }
    if (!description.trim()) {
      setError('Please describe what you did and why it was needed');
      return;
    }

    logContribution({
      title: title.trim(),
      category,
      description: description.trim(),
      date,
      hoursSpent: Number(hoursSpent),
      evidenceLink: evidenceLink.trim(),
      evidenceNotes: evidenceNotes.trim()
    });

    try {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (err) {}

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setTitle('');
      setDescription('');
      setEvidenceLink('');
      setEvidenceNotes('');
      setError('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Self-Log Informal Society Contribution" maxWidth="max-w-xl">
      {isSuccess ? (
        <div className="py-12 text-center space-y-3">
          <div className="w-16 h-16 bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Contribution Logged for POR Verification!
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Your self-logged work has been sent directly to the Core Committee review queue. Once verified, it will earn contribution points and appear on your verified portfolio.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl text-xs text-amber-900 dark:text-amber-200">
            💡 <strong>Never let extra work go unrewarded:</strong> Did you stay back after hours, solve an emergency, or take initiative outside an assigned task? Self-log it here with proof so PORs can objectively verify it.
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              What did you do? (Title) *
            </label>
            <input
              type="text"
              placeholder="e.g. Stayed back 4 hours to arrange chairs & sound system for auditorium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date Completed
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Description & Impact *
            </label>
            <textarea
              rows={3}
              placeholder="Describe the context, what was happening, what actions you took, and how it helped the society..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          {/* Hours Spent */}
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Time Invested:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{hoursSpent} hours</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="24"
                step="0.5"
                value={hoursSpent}
                onChange={(e) => setHoursSpent(e.target.value)}
                className="w-full accent-brand-600"
              />
            </div>
          </div>

          {/* Evidence Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Verification Link / Proof (Drive photos, commit link, email/chat screenshot)
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                placeholder="https://drive.google.com/... or proof URL"
                value={evidenceLink}
                onChange={(e) => setEvidenceLink(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Witness / Additional Verification Note
            </label>
            <input
              type="text"
              placeholder="e.g. 'Security guard logged my entry', 'Core Member 3 was present'"
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

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
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Submit For Verification
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
