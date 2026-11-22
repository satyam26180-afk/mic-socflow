import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';
import {
  CalendarDays,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  IndianRupee,
  Layers,
  Award
} from 'lucide-react';

export const EventsProjects = () => {
  const { data, createEvent, updateEvent } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Flagship Summit');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('₹1,00,000');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const ocMembers = data.users.filter(u => u.tier === 'Organising');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createEvent({
      title: title.trim(),
      description: description.trim(),
      category,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date().toISOString().split('T')[0],
      location: location || 'Main Campus',
      budget,
      leads: selectedLeads,
      participants: selectedParticipants
    });

    setTitle('');
    setDescription('');
    setSelectedLeads([]);
    setSelectedParticipants([]);
    setIsCreateOpen(false);
  };

  const toggleLead = (userId) => {
    setSelectedLeads(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const toggleParticipant = (userId) => {
    setSelectedParticipants(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Flagship Events & Projects
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organise mega-summits, campus festivals, and link member participation to portfolios.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Event / Project</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.events.map((evt) => {
          const leadUsers = data.users.filter(u => evt.leads.includes(u.id));
          const participantUsers = data.users.filter(u => evt.participants.includes(u.id));
          const linkedTasks = data.tasks.filter(t => t.eventProjectId === evt.id);
          const completedTasks = linkedTasks.filter(t => t.status === 'Verified');

          return (
            <div
              key={evt.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/50">
                    {evt.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    evt.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : evt.status === 'Ongoing'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {evt.status}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {evt.description}
                </p>

                {/* Event Location & Budget */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 flex-wrap">
                  {evt.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {evt.location}
                    </span>
                  )}
                  {evt.budget && (
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      💰 Budget: {evt.budget}
                    </span>
                  )}
                </div>

                {/* Leads Section */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Project Leads & Coordinators
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {leadUsers.map((l) => (
                      <span
                        key={l.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900 text-xs font-semibold"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Tagged Organising Committee ({participantUsers.length} members):
                  </span>
                  <div className="flex -space-x-1.5 overflow-hidden py-1">
                    {participantUsers.slice(0, 8).map((u) => (
                      <div
                        key={u.id}
                        title={u.name}
                        className={`w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] font-bold ${u.avatarColor}`}
                      >
                        {u.avatarInitials}
                      </div>
                    ))}
                    {participantUsers.length > 8 && (
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] font-bold">
                        +{participantUsers.length - 8}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Linked Tasks Progress */}
              {linkedTasks.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-500">Milestone Deliverables:</span>
                    <span className="text-brand-600 dark:text-brand-400">
                      {completedTasks.length} / {linkedTasks.length} Done
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.round((completedTasks.length / linkedTasks.length) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Event Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Flagship Event / Project" maxWidth="max-w-xl">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Event / Project Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Annual Cultural Fest 2025: Nirvana"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description & Objectives
            </label>
            <textarea
              rows={3}
              placeholder="Summary of scope, footfall goals, key themes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="Flagship Summit">Flagship Summit</option>
                <option value="Recruitment & Onboarding">Recruitment & Onboarding</option>
                <option value="Inter-College Competition">Inter-College Competition</option>
                <option value="Fundraising & Brand Drive">Fundraising & Brand Drive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sanctioned Budget
              </label>
              <input
                type="text"
                placeholder="₹1,50,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md"
            >
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
