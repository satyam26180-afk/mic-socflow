import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge, CategoryBadge, TierBadge } from '../../components/common/Badge';
import { TaskAssignModal } from '../../components/tasks/TaskAssignModal';
import { GiveFeedbackModal } from '../../components/members/GiveFeedbackModal';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Star,
  FileCheck2,
  Plus,
  MessageSquareQuote,
  Award,
  TrendingUp,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';

export const MemberDetail = () => {
  const { memberId } = useParams();
  const { data, getMemberStats, currentUser } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'contributions' | 'feedback' | 'events'
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const member = data.users.find(u => u.id === memberId);
  if (!member) {
    return (
      <div className="p-12 text-center space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Member not found</h3>
        <Link to="/core/members" className="text-xs text-brand-600 hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  const stats = getMemberStats(member.id);

  // Member's tasks
  const memberTasks = data.tasks.filter(t => t.assignedTo.includes(member.id));
  const verifiedTasks = memberTasks.filter(t => t.status === 'Verified');

  // Member's self-logged contributions
  const memberContribs = data.contributions.filter(c => c.userId === member.id);
  const verifiedContribs = memberContribs.filter(c => c.status === 'Verified');

  // Member's feedback received
  const memberFeedback = data.feedback.filter(f => f.toUserId === member.id);

  // Member's events
  const memberEvents = data.events.filter(e => e.participants.includes(member.id) || e.leads.includes(member.id));

  // Radar chart data
  const radarData = [
    { subject: 'Execution Speed', value: stats.onTimeRate >= 90 ? 95 : stats.onTimeRate, fullMark: 100 },
    { subject: 'Quality & Rigor', value: stats.score >= 90 ? 94 : 85, fullMark: 100 },
    { subject: 'Initiative & Extra Hrs', value: Math.min(100, (stats.extraHours / 8) * 100 + 40), fullMark: 100 },
    { subject: 'Collaboration', value: memberEvents.length > 0 ? 90 : 75, fullMark: 100 },
    { subject: 'Feedback Score', value: (parseFloat(stats.avgRating) / 5) * 100, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Link
            to={`/member/portfolio?id=${member.id}`}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-brand-500" />
            <span>Public Portfolio</span>
          </Link>
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all flex items-center gap-1.5"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Give Feedback</span>
          </button>
        </div>
      </div>

      {/* Member Profile Hero Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-md ${member.avatarColor}`}>
              {member.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {member.name}
                </h1>
                <TierBadge tier={member.tier} userId={member.id} />
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                {member.role.replace(/\s*\(POR\)/gi, "")} • <span className="text-brand-600 dark:text-brand-400 font-bold">{(member.id === "user-pres-1" || member.id === "user-vp-1") ? "Advisory Committee" : member.department + " Department"}</span>
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {member.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {member.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined {member.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Appraisal Score Card */}
          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-center shrink-0 w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400 tracking-wider">
              Objective Appraisal Score
            </span>
            <div className="text-3xl font-black text-brand-700 dark:text-brand-300 mt-0.5">
              {stats.score}/100
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              {stats.onTimeRate}% On-Time Record
            </span>
          </div>
        </div>

        {/* Bio & Skills */}
        {member.bio && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <p>{member.bio}</p>
            {member.skills && member.skills.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-400">Skills:</span>
                {member.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metrics & Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Verified Tasks</span>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.completed}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">of {stats.assigned} assigned</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">On-Time %</span>
            <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {stats.onTimeRate}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">punctuality rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Extra Hours</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.extraHours}h
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">unassigned work</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">POR Feedback</span>
            <span className="text-2xl font-bold text-amber-500">
              ★ {stats.avgRating}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{stats.feedbackCount} reviews</span>
          </div>
        </div>

        {/* Competency Radar Chart */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
            Competency Radar
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar
                  name="Member"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tasks'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Verified Tasks ({verifiedTasks.length})
        </button>

        <button
          onClick={() => setActiveTab('contributions')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'contributions'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Informal Work ({verifiedContribs.length})
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'feedback'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          POR Feedback ({memberFeedback.length})
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'events'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Events & Projects ({memberEvents.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && (
        <div className="space-y-3">
          {verifiedTasks.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              No verified tasks yet.
            </div>
          ) : (
            verifiedTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryBadge category={t.category} />
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {t.title}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +{t.points} Points Verified
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Due: {new Date(t.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'contributions' && (
        <div className="space-y-3">
          {verifiedContribs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              No informal contributions verified yet.
            </div>
          ) : (
            verifiedContribs.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-950 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {c.title}
                  </span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    +{c.awardedPoints} pts • {c.hoursSpent} Hours
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>
                {c.feedbackComment && (
                  <p className="text-emerald-700 dark:text-emerald-300 italic pt-1">
                    "POR Note: {c.feedbackComment}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-3">
          {memberFeedback.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              No feedback entries recorded.
            </div>
          ) : (
            memberFeedback.map((fb) => {
              const reviewer = data.users.find(u => u.id === fb.fromUserId);
              return (
                <div
                  key={fb.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      From {reviewer?.name || 'POR Leadership'}
                    </span>
                    <div className="flex items-center text-amber-400">
                      {'★'.repeat(fb.rating)}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{fb.message}"
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                    <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                    {fb.tags && fb.tags.map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-3">
          {memberEvents.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Not tagged in any flagship events yet.
            </div>
          ) : (
            memberEvents.map((evt) => {
              const isLead = evt.leads.includes(member.id);
              return (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {evt.title}
                      </span>
                      {isLead ? (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-[10px]">
                          Event Lead
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px]">
                          Participant
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 mt-1">{evt.description}</p>
                  </div>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 shrink-0">
                    {evt.status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modals */}
      <TaskAssignModal isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)} />
      <GiveFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        defaultMemberId={member.id}
      />
    </div>
  );
};
