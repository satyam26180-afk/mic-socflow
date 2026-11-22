import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Calendar, AlertCircle, Plus, Users, ShieldCheck } from 'lucide-react';

export const TaskAssignModal = ({ isOpen, onClose }) => {
  const { data, createTask, currentUser, canAssignTasks } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Sponsorship');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [evidenceRequired, setEvidenceRequired] = useState(true);
  const [points, setPoints] = useState(100);
  const [estimatedHours, setEstimatedHours] = useState(8);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [eventProjectId, setEventProjectId] = useState('');
  const [error, setError] = useState('');

  // Check if current user has assigning power
  const hasPower = canAssignTasks(currentUser);

  const categories = [
    'Sponsorship',
    'Logistics',
    'Design',
    'Marketing',
    'Content',
    'PR & Outreach',
    'Tech',
    'Events',
    'Finance'
  ];

  const ocMembers = data.users.filter(u => u.tier === 'Organising');

  const toggleAssignee = (userId) => {
    setSelectedAssignees(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAllOC = () => {
    if (selectedAssignees.length === ocMembers.length) {
      setSelectedAssignees([]);
    } else {
      setSelectedAssignees(ocMembers.map(u => u.id));
    }
  };

  const handleSelectByDept = (dept) => {
    const deptMembers = ocMembers.filter(u => u.department === dept).map(u => u.id);
    setSelectedAssignees(deptMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasPower) {
      setError('Permission Denied: Only President, Coordinators, Dept Heads & Core Committee can assign tasks.');
      return;
    }
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (selectedAssignees.length === 0) {
      setError('Please assign this task to at least one member');
      return;
    }
    if (!deadline) {
      setError('Please specify a deadline date and time');
      return;
    }

    createTask({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      deadline: new Date(deadline).toISOString(),
      evidenceRequired,
      points: Number(points),
      estimatedHours: Number(estimatedHours),
      assignedTo: selectedAssignees,
      assignedBy: currentUser.id,
      eventProjectId: eventProjectId || null
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setSelectedAssignees([]);
    setDeadline('');
    setError('');
    onClose();
  };

  if (!hasPower) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Task Delegation" maxWidth="max-w-md">
        <div className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Permission Restricted
          </h4>
          <p className="text-xs text-slate-500">
            Task assigning is reserved for the <strong>President (Sahil)</strong>, <strong>Coordinators (Dhruv & Kashish)</strong>, <strong>Department Heads</strong>, and <strong>Core Committee members</strong>.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Society Task (MIC)" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Assigner Indicator */}
        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Delegating as: <strong>{currentUser?.name}</strong> ({currentUser?.role})</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
            Authorized Assigner
          </span>
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
            Task Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Contact 30 Potential Sponsors & Log Calls"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Task Brief & Deliverable Specifications
          </label>
          <textarea
            rows={3}
            placeholder="Provide clear instructions, expected outcomes, reference files, and criteria..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Category & Priority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category / Wing
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
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">🔥 Urgent (Top Priority)</option>
            </select>
          </div>
        </div>

        {/* Deadline & Event Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Deadline Date & Time *
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Link to Project / Conclave (Optional)
            </label>
            <select
              value={eventProjectId}
              onChange={(e) => setEventProjectId(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">-- General MIC Society Operations --</option>
              {data.events.map((evt) => (
                <option key={evt.id} value={evt.id}>{evt.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Points & Hours & Evidence */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
              Contribution Points
            </label>
            <input
              type="number"
              min="10"
              max="500"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
              Estimated Hours
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
              Evidence Required?
            </span>
            <label className="flex items-center gap-2 cursor-pointer mt-0.5">
              <input
                type="checkbox"
                checked={evidenceRequired}
                onChange={(e) => setEvidenceRequired(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-600"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {evidenceRequired ? 'Yes (Proof Mandatory)' : 'No (Trust-based)'}
              </span>
            </label>
          </div>
        </div>

        {/* Assignees Selection (30 OC Members) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assignee(s) ({selectedAssignees.length} selected) *
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAllOC}
                className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                {selectedAssignees.length === ocMembers.length ? 'Deselect All' : 'Select All 30 OC'}
              </button>
            </div>
          </div>

          {/* Quick Department Buttons */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-[10px] text-slate-400 py-0.5">Quick Dept:</span>
            {['Sponsorship', 'Design', 'Logistics', 'Marketing', 'Content', 'PR & Outreach', 'Tech', 'Events'].map(dept => (
              <button
                key={dept}
                type="button"
                onClick={() => handleSelectByDept(dept)}
                className="px-2 py-0.5 text-[10px] rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                + {dept}
              </button>
            ))}
          </div>

          <div className="max-h-40 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl p-2 divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {ocMembers.map((member) => {
              const isChecked = selectedAssignees.includes(member.id);
              return (
                <label
                  key={member.id}
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAssignee(member.id)}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${member.avatarColor}`}>
                      {member.avatarInitials}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-900 dark:text-white leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {member.role} ({member.department})
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{member.department}</span>
                </label>
              );
            })}
          </div>
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
            <CheckSquare className="w-3.5 h-3.5" />
            Assign Task
          </button>
        </div>
      </form>
    </Modal>
  );
};
