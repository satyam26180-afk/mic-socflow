import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquareQuote, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GiveFeedbackModal = ({ isOpen, onClose, defaultMemberId = null, defaultTaskId = null }) => {
  const { data, giveFeedback, currentUser } = useApp();

  const [toUserId, setToUserId] = useState(defaultMemberId || '');
  const [taskId, setTaskId] = useState(defaultTaskId || '');
  const [type, setType] = useState('Kudos');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState('High Initiative');
  const [error, setError] = useState('');

  const ocMembers = data.users.filter(u => u.tier === 'Organising');

  useEffect(() => {
    if (defaultMemberId) {
      setToUserId(defaultMemberId);
    } else if (ocMembers.length > 0 && !toUserId) {
      setToUserId(ocMembers[0].id);
    }
  }, [defaultMemberId, ocMembers]);

  const tagsList = [
    'High Initiative',
    'Crisis Leadership',
    'Attention to Detail',
    'Speed & Turnaround',
    'Creative Benchmark',
    'Ground Ops Resilience',
    'Effective Communication',
    'Reliability'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toUserId) {
      setError('Please select a member to receive feedback');
      return;
    }
    if (!message.trim()) {
      setError('Please write a feedback note');
      return;
    }

    giveFeedback({
      toUserId,
      taskId: taskId || null,
      type,
      rating: Number(rating),
      message: message.trim(),
      tags: [selectedTag]
    });

    if (type === 'Kudos') {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {}
    }

    setMessage('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Give Member Feedback & Endorsement" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Member selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Recipient Member *
          </label>
          <select
            value={toUserId}
            onChange={(e) => setToUserId(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          >
            {ocMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.department} - {m.role})
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Type */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType('Kudos')}
            className={`p-3 rounded-xl border text-left transition-all ${
              type === 'Kudos'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="text-sm font-bold flex items-center gap-1.5">
              🎉 Kudos / Praise
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Celebrate exemplary execution</p>
          </button>

          <button
            type="button"
            onClick={() => setType('Constructive')}
            className={`p-3 rounded-xl border text-left transition-all ${
              type === 'Constructive'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="text-sm font-bold flex items-center gap-1.5">
              💡 Growth / Coaching
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Constructive feedback to improve</p>
          </button>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Rating Score
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
              {rating} / 5 Stars
            </span>
          </div>
        </div>

        {/* Key Competency Tag */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Key Competency / Tag
          </label>
          <div className="flex flex-wrap gap-1.5">
            {tagsList.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Feedback Note *
          </label>
          <textarea
            rows={3}
            placeholder="Write constructive, actionable observations or specific words of appreciation that will be recorded in their profile..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
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
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Send Feedback
          </button>
        </div>
      </form>
    </Modal>
  );
};
