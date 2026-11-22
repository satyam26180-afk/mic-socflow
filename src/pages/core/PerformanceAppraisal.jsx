import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Award,
  Download,
  Printer,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Star,
  Users,
  Search,
  ExternalLink
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const PerformanceAppraisal = () => {
  const { data, getMemberStats } = useApp();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const ocMembers = data.users.filter(u => u.tier === 'Organising');

  // Compute stats for all OC members
  const evaluatedMembers = ocMembers.map((m) => {
    const stats = getMemberStats(m.id);
    let grade = 'B';
    if (stats.score >= 95) grade = 'S (Outstanding)';
    else if (stats.score >= 90) grade = 'A+ (Exemplary)';
    else if (stats.score >= 80) grade = 'A (Commendable)';
    else if (stats.score >= 70) grade = 'B+ (Satisfactory)';

    return {
      ...m,
      stats,
      grade
    };
  }).sort((a, b) => b.stats.score - a.stats.score);

  const filteredMembers = evaluatedMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                          m.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || m.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const top3 = evaluatedMembers.slice(0, 3);

  // Department scores average
  const deptScoreMap = {};
  evaluatedMembers.forEach(m => {
    if (!deptScoreMap[m.department]) {
      deptScoreMap[m.department] = { sum: 0, count: 0 };
    }
    deptScoreMap[m.department].sum += m.stats.score;
    deptScoreMap[m.department].count += 1;
  });

  const deptChartData = Object.keys(deptScoreMap).map(dept => ({
    name: dept,
    avgScore: Math.round(deptScoreMap[dept].sum / deptScoreMap[dept].count)
  }));

  // CSV Export
  const exportCSV = () => {
    const headers = [
      'Rank',
      'Name',
      'Department',
      'Role',
      'Appraisal Score',
      'Appraisal Grade',
      'Assigned Tasks',
      'Verified Tasks',
      'On-Time %',
      'Extra Unassigned Hours',
      'Feedback Avg Rating',
      'Total Verified Points'
    ];

    const rows = evaluatedMembers.map((m, idx) => [
      idx + 1,
      `"${m.name}"`,
      `"${m.department}"`,
      `"${m.role}"`,
      m.stats.score,
      `"${m.grade}"`,
      m.stats.assigned,
      m.stats.completed,
      `${m.stats.onTimeRate}%`,
      m.stats.extraHours,
      m.stats.avgRating,
      m.stats.totalPoints
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SocFlow_Semester_Appraisal_Report_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-1.5">
            <Award className="w-3.5 h-3.5" />
            Objective Performance & Appraisal Engine
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Semester Appraisals & Leaderboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data-backed evaluation of all 30 Organising Committee members based on verified contributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex items-center gap-1.5"
            title="Download Excel / CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
            title="Print or export PDF summary"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Appraisal Report</span>
          </button>
        </div>
      </div>

      {/* Formula Transparency Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-brand-950/30 dark:to-indigo-950/20 border border-brand-200/60 dark:border-brand-900/40 text-xs text-brand-900 dark:text-brand-200">
        <div className="flex items-center gap-2 font-bold mb-1">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Transparent 100-Point Appraisal Metric Formula:</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>40%</strong> Task Completion Ratio + <strong>25%</strong> On-Time Punctuality + <strong>20%</strong> Leadership Review Rating + <strong>15%</strong> Verified Informal Extra Hours. Completely eliminates subjective favoritism.
        </p>
      </div>

      {/* Top 3 Performers Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Silver #2 */}
        {top3[1] && (
          <div className="order-2 md:order-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm flex items-center justify-center mx-auto mb-2 ring-4 ring-slate-100 dark:ring-slate-800">
              #2
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold mx-auto mb-2 ${top3[1].avatarColor}`}>
              {top3[1].avatarInitials}
            </div>
            <Link
              to={`/core/members/${top3[1].id}`}
              className="font-bold text-sm text-slate-900 dark:text-white hover:text-brand-600"
            >
              {top3[1].name}
            </Link>
            <p className="text-xs text-slate-400 mt-0.5">{top3[1].role} ({top3[1].department})</p>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                {top3[1].stats.score}/100
              </span>
              <p className="text-[11px] text-emerald-600 font-semibold">{top3[1].stats.onTimeRate}% on-time</p>
            </div>
          </div>
        )}

        {/* Gold #1 */}
        {top3[0] && (
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-400 dark:border-amber-600 shadow-elevated flex flex-col justify-between text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center mx-auto mb-2 ring-4 ring-amber-200 dark:ring-amber-900 shadow-md">
              #1 👑
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold mx-auto mb-2 shadow-md ${top3[0].avatarColor}`}>
              {top3[0].avatarInitials}
            </div>
            <Link
              to={`/core/members/${top3[0].id}`}
              className="font-extrabold text-base text-slate-900 dark:text-white hover:text-brand-600"
            >
              {top3[0].name}
            </Link>
            <p className="text-xs text-slate-400 mt-0.5">{top3[0].role} ({top3[0].department})</p>
            <div className="mt-3 pt-3 border-t border-amber-200/50 dark:border-amber-900/50">
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
                {top3[0].stats.score}/100
              </span>
              <p className="text-xs text-emerald-600 font-bold">{top3[0].stats.onTimeRate}% on-time record</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                ⭐ Prime Contender for Next POR
              </span>
            </div>
          </div>
        )}

        {/* Bronze #3 */}
        {top3[2] && (
          <div className="order-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-300 font-black text-sm flex items-center justify-center mx-auto mb-2 ring-4 ring-amber-700/10">
              #3
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold mx-auto mb-2 ${top3[2].avatarColor}`}>
              {top3[2].avatarInitials}
            </div>
            <Link
              to={`/core/members/${top3[2].id}`}
              className="font-bold text-sm text-slate-900 dark:text-white hover:text-brand-600"
            >
              {top3[2].name}
            </Link>
            <p className="text-xs text-slate-400 mt-0.5">{top3[2].role} ({top3[2].department})</p>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                {top3[2].stats.score}/100
              </span>
              <p className="text-[11px] text-emerald-600 font-semibold">{top3[2].stats.onTimeRate}% on-time</p>
            </div>
          </div>
        )}
      </div>

      {/* Department Efficiency Comparison Chart */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Department Performance Index
            </h3>
            <p className="text-xs text-slate-400">
              Average member appraisal index across society departments
            </p>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[70, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="avgScore" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Comprehensive Member Appraisal Roster (30 Members)
          </h3>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            >
              <option value="All">All Departments</option>
              {['Sponsorship', 'Design', 'Logistics', 'Content', 'PR & Outreach', 'Tech', 'Events'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-end text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
            Swipe leaderboard table &rarr;
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[720px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-3 text-center">Rank</th>
                <th className="py-2.5 px-3">Member</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3 text-center">Appraisal Score</th>
                <th className="py-2.5 px-3 text-center">Grade Tier</th>
                <th className="py-2.5 px-3 text-center">Verified Tasks</th>
                <th className="py-2.5 px-3 text-center">On-Time %</th>
                <th className="py-2.5 px-3 text-center">Extra Hours</th>
                <th className="py-2.5 px-3 text-center">Feedback</th>
                <th className="py-2.5 px-3 text-right">Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMembers.map((m, idx) => (
                <tr key={m.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 text-center font-bold text-slate-400">
                    #{idx + 1}
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      to={`/core/members/${m.id}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-brand-600 block truncate"
                    >
                      {m.name}
                    </Link>
                    <span className="text-[10px] text-slate-400">{m.role}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">
                    {m.department}
                  </td>
                  <td className="py-3 px-3 text-center font-black text-sm text-brand-600 dark:text-brand-400">
                    {m.stats.score}/100
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.stats.score >= 95
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : m.stats.score >= 90
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}>
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-emerald-600">
                    {m.stats.completed}
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-slate-700 dark:text-slate-300">
                    {m.stats.onTimeRate}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-purple-600">
                    {m.stats.extraHours}h
                  </td>
                  <td className="py-3 px-3 text-center text-amber-500 font-bold">
                    ★ {m.stats.avgRating}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to={`/member/portfolio?id=${m.id}`}
                      className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
