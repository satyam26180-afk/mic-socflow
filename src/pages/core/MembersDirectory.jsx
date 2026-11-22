import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreVertical,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  MessageSquareQuote,
  Edit2,
  Trash2,
  Award
} from 'lucide-react';
import { AddEditMemberModal } from '../../components/members/AddEditMemberModal';
import { GiveFeedbackModal } from '../../components/members/GiveFeedbackModal';
import { TierBadge } from '../../components/common/Badge';

export const MembersDirectory = () => {
  const { data, getMemberStats, removeMember } = useApp();

  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All'); // 'All' | 'Core' | 'Organising'
  const [deptFilter, setDeptFilter] = useState('All');
  const [sortBy, setSortBy] = useState('hierarchy'); // 'hierarchy' | 'score' | 'onTimeRate' | 'completed' | 'name'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [feedbackMemberId, setFeedbackMemberId] = useState(null);

  const departments = [
    'All',
    'Sponsorship',
    'Logistics',
    'Design',
    'Content',
    'PR & Outreach',
    'Tech',
    'Events',
    'Executive',
    'Operations'
  ];

  // Map members with calculated stats
  const membersWithStats = data.users.map((member) => ({
    ...member,
    stats: getMemberStats(member.id)
  }));

  // Role hierarchy order for sorting
  const getRoleOrder = (member) => {
    if (member.role === 'President') return 0;
    if (member.role === 'Vice President') return 1;
    if (member.role === 'Coordinator') return 2;
    // Department Heads: any Core member whose role ends with 'Head'
    if (member.tier === 'Core' && member.role.toLowerCase().includes('head')) return 3;
    if (member.tier === 'Core') return 4;        // Core Committee
    return 5;                                     // Organising Committee
  };

  // Filtering
  const filteredMembers = membersWithStats.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                          m.role.toLowerCase().includes(search.toLowerCase()) ||
                          m.department.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'All' || m.tier === tierFilter;
    const matchesDept = deptFilter === 'All' || m.department === deptFilter;

    return matchesSearch && matchesTier && matchesDept;
  });

  // Sorting — hierarchy is always primary; selected sort is secondary within each group
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    // Primary: role hierarchy
    const hierarchyDiff = getRoleOrder(a) - getRoleOrder(b);
    if (hierarchyDiff !== 0) return hierarchyDiff;

    // Secondary: user-selected sort within the same group
    let aVal, bVal;
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'onTimeRate') {
      aVal = a.stats.onTimeRate;
      bVal = b.stats.onTimeRate;
    } else if (sortBy === 'completed') {
      aVal = a.stats.completed;
      bVal = b.stats.completed;
    } else {
      // score or hierarchy fallback → alphabetical within group
      return a.name.localeCompare(b.name);
    }
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDeleteMember = (member) => {
    if (window.confirm(`Are you sure you want to remove member "${member.name}"?`)) {
      removeMember(member.id);
    }
  };

  const coreCount = data.users.filter(u => u.tier === 'Core').length;
  const ocCount = data.users.filter(u => u.tier === 'Organising').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Society Members Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tracking contributions across <strong>{ocCount} Organising Committee members</strong> and <strong>{coreCount} Core Leadership members</strong>.
          </p>
        </div>

        <button
          onClick={() => setIsAddMemberOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member by name, department or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Tier Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium w-full sm:w-auto"
            >
              <option value="All">All Tiers ({data.users.length})</option>
              <option value="Core">Core Committee ({coreCount})</option>
              <option value="Organising">Organising Committee ({ocCount})</option>
            </select>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>Showing {sortedMembers.length} members</span>
        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
          Swipe table to view all stats &rarr;
        </span>
      </div>

      {/* Members Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">
                  <button
                    onClick={() => toggleSort('name')}
                    className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>Member & Department</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-3 text-center">Tier</th>
                <th className="py-3 px-3 text-center">Assigned</th>
                <th className="py-3 px-3 text-center">
                  <button
                    onClick={() => toggleSort('completed')}
                    className="flex items-center gap-1 mx-auto hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>Completed</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-3 text-center">Pending</th>
                <th className="py-3 px-3 text-center">
                  <button
                    onClick={() => toggleSort('onTimeRate')}
                    className="flex items-center gap-1 mx-auto hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>On-time %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-3 text-center">
                  <button
                    onClick={() => toggleSort('score')}
                    className="flex items-center gap-1 mx-auto hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>Appraisal Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {sortedMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No members match your criteria.
                  </td>
                </tr>
              ) : (
                sortedMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Member Name & Dept */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${member.avatarColor}`}>
                          {member.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <Link
                            to={`/core/members/${member.id}`}
                            className="font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors block truncate"
                          >
                            {member.name}
                          </Link>
                          <p className="text-[11px] text-slate-400 truncate">
                            {member.role.replace(/\s*\(POR\)/gi, '')} {'\u2022'} <span className={"font-medium text-slate-600 dark:text-slate-300"}>{(member.id === 'user-pres-1' || member.id === 'user-vp-1') ? 'Advisory Committee' : member.department}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="py-3 px-3 text-center">
                      <TierBadge tier={member.tier} userId={member.id} />
                    </td>

                    {/* Assigned */}
                    <td className="py-3 px-3 text-center font-medium text-slate-700 dark:text-slate-300">
                      {member.stats.assigned}
                    </td>

                    {/* Completed */}
                    <td className="py-3 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                      {member.stats.completed}
                    </td>

                    {/* Pending */}
                    <td className="py-3 px-3 text-center font-medium text-indigo-600 dark:text-indigo-400">
                      {member.stats.pending}
                    </td>

                    {/* On-Time Rate */}
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                        member.stats.onTimeRate >= 90
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : member.stats.onTimeRate >= 75
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {member.stats.onTimeRate}%
                      </span>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-3 text-center font-extrabold text-sm text-brand-600 dark:text-brand-400">
                      {member.stats.score}/100
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/core/members/${member.id}`}
                          className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="View complete record & portfolio"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setFeedbackMemberId(member.id)}
                          className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Give feedback"
                        >
                          <MessageSquareQuote className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit member"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Remove member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddEditMemberModal
        isOpen={isAddMemberOpen || !!editingMember}
        onClose={() => {
          setIsAddMemberOpen(false);
          setEditingMember(null);
        }}
        member={editingMember}
      />
      <GiveFeedbackModal
        isOpen={!!feedbackMemberId}
        onClose={() => setFeedbackMemberId(null)}
        defaultMemberId={feedbackMemberId}
      />
    </div>
  );
};
