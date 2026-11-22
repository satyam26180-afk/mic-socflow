import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, ChevronDown, Check, ShieldCheck, UserCheck, Search, Sparkles, Award } from 'lucide-react';

export const QuickUserSwitcher = () => {
  const { data, currentUser, loginUser, canAssignTasks } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Leadership' | 'Organising'
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const hasAssigningPower = canAssignTasks(currentUser);

  const filteredUsers = data.users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.role.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Leadership') return matchesSearch && u.tier === 'Core';
    return matchesSearch && u.tier === 'Organising';
  });

  const leadershipCount = data.users.filter(u => u.tier === 'Core').length;
  const ocCount = data.users.filter(u => u.tier === 'Organising').length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700 transition-all text-left shadow-sm group"
        title="Switch user role in MIC (Demo Mode)"
      >
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${currentUser.avatarColor || 'bg-brand-600 text-white'}`}>
          {currentUser.avatarInitials}
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-semibold text-slate-900 dark:text-white max-w-[130px] truncate">
              {currentUser.name}
            </span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
              currentUser.role === 'President'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : currentUser.role === 'Coordinator'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                : hasAssigningPower
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
            }`}>
              {currentUser.role === 'President' ? 'PRESIDENT' : currentUser.role === 'Coordinator' ? 'COORD' : hasAssigningPower ? 'CORE' : 'OC'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px] mt-0.5">
            {currentUser.role}
          </p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-3 bg-gradient-to-r from-slate-50 to-brand-50/30 dark:from-slate-800/50 dark:to-brand-950/20 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                MIC Roster Profile Switcher
              </span>
              <span className="text-[11px] text-slate-400">
                {data.users.length} members
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, role or dept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 mt-2.5">
              <button
                onClick={() => setActiveTab('All')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  activeTab === 'All'
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                All ({data.users.length})
              </button>
              <button
                onClick={() => setActiveTab('Leadership')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  activeTab === 'Leadership'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                ⚡ Core & Heads ({leadershipCount})
              </button>
              <button
                onClick={() => setActiveTab('Organising')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  activeTab === 'Organising'
                    ? 'bg-slate-800 text-white dark:bg-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                Organising (30 OC)
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredUsers.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No members found matching "{searchQuery}"
              </div>
            ) : (
              filteredUsers.map((user) => {
                const isSelected = user.id === currentUser.id;
                const canAssign = user.tier === 'Core';

                return (
                  <button
                    key={user.id}
                    onClick={() => {
                      loginUser(user.id);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors ${
                      isSelected ? 'bg-brand-50/50 dark:bg-brand-950/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${user.avatarColor || 'bg-slate-600 text-white'}`}>
                        {user.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className={`text-xs font-semibold truncate ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>
                            {user.name}
                          </p>
                          <span className={`text-[9px] px-1 py-0.2 rounded font-bold shrink-0 ${
                            user.role === 'President'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : user.role === 'Coordinator'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : canAssign
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {canAssign ? '⚡ Task Assigning Power' : `${user.department} Member`}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              💡 <strong>Role rule:</strong> President, Coordinators, Dept Heads & Core Committee have task assigning power. If you shift to an Organising Committee member, the assigning dashboard is removed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
