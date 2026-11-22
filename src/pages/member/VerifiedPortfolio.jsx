import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Printer,
  Share2,
  Calendar,
  Award,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Layers,
  Star,
  QrCode
} from 'lucide-react';
import { TierBadge, CategoryBadge } from '../../components/common/Badge';

export const VerifiedPortfolio = () => {
  const [searchParams] = useSearchParams();
  const { data, currentUser, getMemberStats } = useApp();

  const [copied, setCopied] = useState(false);

  // Target member: query param 'id' or currentUser
  const targetUserId = searchParams.get('id') || currentUser?.id || 'user-oc-1';
  const member = data.users.find(u => u.id === targetUserId) || data.users[0];

  const stats = getMemberStats(member.id);

  // Verified items
  const memberTasks = data.tasks.filter(t => t.assignedTo.includes(member.id));
  const verifiedTasks = memberTasks.filter(t => t.status === 'Verified');

  const memberContribs = data.contributions.filter(c => c.userId === member.id);
  const verifiedContribs = memberContribs.filter(c => c.status === 'Verified');

  const memberEvents = data.events.filter(e => e.participants.includes(member.id) || e.leads.includes(member.id));
  const memberFeedback = data.feedback.filter(f => f.toUserId === member.id);

  // Total verified hours
  const totalVerifiedHours = (verifiedTasks.reduce((acc, t) => acc + (t.estimatedHours || 8), 0)) + stats.extraHours;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate deterministic verification code
  const verificationCode = `MIC-2024-${member.id.toUpperCase().replace('-', '')}-VRF`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Action Bar (hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Management Interaction Cell (MIC) • Verified Portfolio
          </h2>
          <p className="text-xs text-slate-400">
            Certified extracurricular ledger for POR applications, job/internship resumes, and certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* PORTFOLIO DOCUMENT (Prints cleanly) */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-card space-y-6 sm:space-y-8 print:shadow-none print:border-none print:p-0">
        {/* Certificate Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-6 border-b-2 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/mic-logo.png"
              alt="MIC Logo"
              className="h-14 sm:h-16 w-auto object-contain shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Management Interaction Cell (MIC)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  VERIFIED RECORD ✓
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official Society Extracurricular & Leadership Accreditation Portfolio · SSCBS
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right sm:border-l sm:pl-6 border-slate-100 dark:border-slate-800 pt-2 sm:pt-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Certificate Hash
            </span>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
              {verificationCode}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Certified on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Member Profile Hero in Portfolio */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-sm shrink-0 ${member.avatarColor}`}>
              {member.avatarInitials}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                {member.name}
              </h1>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {member.role} • <span className="text-brand-600 dark:text-brand-400">{member.department} Department</span>
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5 flex-wrap">
                <span>{member.email}</span>
                <span>•</span>
                <span>Active Member since {member.joinDate}</span>
                <span>•</span>
                <TierBadge tier={member.tier} userId={member.id} />
              </div>
            </div>
          </div>

          {/* Verification Stamp / Seal */}
          <div className="flex items-center gap-4 border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              ✓
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                MIC Council Endorsed
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Appraisal Index: {stats.score}/100
              </span>
              <span className="text-[10px] text-slate-500 block">
                {stats.onTimeRate}% On-Time Record • {totalVerifiedHours} Hours Verified
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            01 / Verified Impact Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span className="text-xs text-slate-400 block mb-1">Total Verified Hours</span>
              <span className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400">
                {totalVerifiedHours}h
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Execution & operations</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span className="text-xs text-slate-400 block mb-1">Deliverables Verified</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {verifiedTasks.length}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">100% proof audit</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span className="text-xs text-slate-400 block mb-1">Extra Unassigned Hours</span>
              <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                +{stats.extraHours}h
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">High initiative record</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span className="text-xs text-slate-400 block mb-1">Leadership Rating</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-500">
                ★ {stats.avgRating}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">POR review index</span>
            </div>
          </div>
        </div>

        {/* Section 2: Verified Task Deliverables */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            02 / Verified Task Deliverables & Evidence
          </h3>
          <div className="space-y-3">
            {verifiedTasks.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                No verified tasks currently recorded.
              </div>
            ) : (
              verifiedTasks.map((t) => {
                const sub = data.submissions.find(s => s.taskId === t.id && s.status === 'Verified');
                const assigner = data.users.find(u => u.id === t.assignedBy);
                return (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CategoryBadge category={t.category} />
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {t.title}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">
                        +{t.points} Points Awarded
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300">
                      {t.description}
                    </p>

                    <div className="text-[11px] text-slate-400">
                      Assigned by: <strong>{assigner?.name || 'Leadership'} ({assigner?.role})</strong> • Deadline: {new Date(t.deadline).toLocaleDateString()}
                    </div>

                    {sub && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-1 text-[11px] border border-slate-100 dark:border-slate-800">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                          Execution Evidence & Outcome:
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">{sub.evidenceNotes}</p>
                        {sub.evidenceLink && (
                          <div className="pt-1">
                            <span className="font-medium text-brand-600 dark:text-brand-400 underline">
                              Verified Proof URL: {sub.evidenceLink}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Section 3: Informal / Self-Logged Extra Contributions */}
        {verifiedContribs.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              03 / Unassigned & Informal Verified Contributions
            </h3>
            <div className="space-y-3">
              {verifiedContribs.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-purple-200/80 dark:border-purple-950 bg-purple-50/20 dark:bg-purple-950/10 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {c.title}
                    </span>
                    <span className="font-bold text-purple-600">
                      +{c.awardedPoints} pts • {c.hoursSpent} Hours
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {c.description}
                  </p>
                  {c.feedbackComment && (
                    <p className="text-emerald-700 dark:text-emerald-300 italic pt-1 text-[11px]">
                      "POR Verification Note: {c.feedbackComment}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Flagship Projects & Events */}
        {memberEvents.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              04 / Flagship Projects & Major Conclaves
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {memberEvents.map((evt) => {
                const isLead = evt.leads.includes(member.id);
                return (
                  <div
                    key={evt.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white truncate">
                        {evt.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        isLead
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {isLead ? 'Lead Coordinator' : 'Active Core Team'}
                      </span>
                    </div>
                    <p className="text-slate-500 line-clamp-2">{evt.description}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      Category: {evt.category} • Status: {evt.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 5: Leadership Endorsements */}
        {memberFeedback.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              05 / Leadership Endorsements & Appraisals
            </h3>
            <div className="space-y-3">
              {memberFeedback.map((fb) => {
                const reviewer = data.users.find(u => u.id === fb.fromUserId);
                return (
                  <div
                    key={fb.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {reviewer?.name || 'MIC Leadership'}
                        </span>
                        <span className="text-slate-400 text-[11px] block">
                          {reviewer?.role} ({reviewer?.department})
                        </span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {'★'.repeat(fb.rating)}
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "{fb.message}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certificate Signature & Verification Footer */}
        <div className="pt-8 border-t-2 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Scan or Verify Authenticity
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                mic.edu/verify/{verificationCode}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 dark:text-slate-200">
                Dhruv & Kashish
              </div>
              <div className="h-0.5 w-24 bg-slate-300 dark:bg-slate-700 my-1 mx-auto" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Coordinators, MIC
              </span>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 dark:text-slate-200">
                Sahil
              </div>
              <div className="h-0.5 w-24 bg-slate-300 dark:bg-slate-700 my-1 mx-auto" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                President, MIC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
