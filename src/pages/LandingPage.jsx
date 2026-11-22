import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Users,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  Layers,
  GraduationCap,
  Building2,
  School,
  Compass,
  CalendarDays
} from 'lucide-react';

export const LandingPage = () => {
  const { loginUser, data } = useApp();
  const navigate = useNavigate();

  const handleLaunchCore = () => {
    loginUser('user-pres-1'); // Sahil (President)
    navigate('/core/dashboard');
  };

  const handleLaunchCoordinator = () => {
    loginUser('user-coord-1'); // Dhruv (Coordinator)
    navigate('/core/dashboard');
  };

  const handleLaunchMember = () => {
    loginUser('user-oc-1'); // Aadya Jain (OC)
    navigate('/member/dashboard');
  };

  const loopSteps = [
    {
      step: '01',
      title: 'ASSIGN',
      subtitle: 'Leadership Delegation',
      description: 'President, Coordinators, Dept Heads & Core Committee assign structured tasks with clear deliverables, deadlines, evidence requirements, and points.',
      icon: Layers,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      step: '02',
      title: 'EXECUTE',
      subtitle: 'Focused Member Action',
      description: 'Organising Committee members execute tasks with clear priorities, daily agendas, and society-wide deadlines calendar.',
      icon: Zap,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      step: '03',
      title: 'SUBMIT',
      subtitle: 'Evidence-Backed Proof',
      description: 'Members upload tangible proof (Drive folders, Figma prototypes, GitHub repos, PR coverage, invoices) and log invested hours.',
      icon: Clock,
      color: 'from-purple-500 to-pink-600'
    },
    {
      step: '04',
      title: 'VERIFY',
      subtitle: 'Objective Audit',
      description: 'Leadership reviews deliverables in the verification queue. Verify with quality scores and feedback or request revisions.',
      icon: ShieldCheck,
      color: 'from-pink-500 to-rose-600'
    },
    {
      step: '05',
      title: 'RECORD',
      subtitle: 'Extracurricular Ledger',
      description: 'Verified work permanently enters the member’s verified portfolio. Unassigned informal work can also be self-logged.',
      icon: FileCheck2,
      color: 'from-rose-500 to-amber-600'
    },
    {
      step: '06',
      title: 'EVALUATE',
      subtitle: 'Data-Driven Appraisals',
      description: 'End-of-term appraisals, leadership elections, and certificates rely on tamper-proof metrics, ending subjective politics forever.',
      icon: Award,
      color: 'from-amber-500 to-emerald-600'
    }
  ];

  const leadershipRoster = [
    { name: 'Sahil', role: 'President' },
    { name: 'Dhruv', role: 'Coordinator' },
    { name: 'Kashish', role: 'Coordinator' },
    { name: 'Antra', role: 'Outreach Head' },
    { name: 'Shivay Jain', role: 'Outreach Head' },
    { name: 'Anya', role: 'Marketing Head' },
    { name: 'Gajanan', role: 'Marketing Head' },
    { name: 'Niket', role: 'Tech Head' },
    { name: 'Core Committee', role: '11 Members (Anushruti, Ashmeet, Garima, Jarbera, Kashak, Khushi, Mahi, Mohit, Shivam, Srisham, Tanishq)' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/mic-logo.png" alt="MIC Logo" className="h-10 w-auto object-contain" />
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-rose-700 dark:from-white dark:to-rose-400 bg-clip-text text-transparent">
                Management Interaction Cell
              </span>
              <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold tracking-widest uppercase -mt-0.5">SSCBS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white shadow-md shadow-rose-700/20 transition-all flex items-center gap-1.5"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/15 to-purple-500/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/80 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            Management Interaction Cell (MIC) • Performance & Operations Portal
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Assign. Verify. Record.{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Recognise.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the official <strong>Management Interaction Cell (MIC)</strong> operations portal. Powered by a verified contribution loop, connecting the President, Coordinators, Department Heads, Core Committee, and 30 Organising Committee members.
          </p>

          {/* Sign In CTA */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-rose-700 hover:bg-rose-800 text-white shadow-lg shadow-rose-700/30 transition-all flex items-center gap-2"
            >
              <span>Sign In to MIC Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Social Proof Pill */}
          <div className="mt-10 inline-flex items-center gap-4 sm:gap-6 px-5 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm text-xs text-slate-600 dark:text-slate-400 flex-wrap justify-center">
            <span className="font-semibold text-slate-900 dark:text-white">
              👑 President: Sahil
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              ⚡ Coordinators: Dhruv & Kashish
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              🎯 5 Department Heads
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              👥 30 Organising Committee
            </span>
          </div>
        </div>
      </section>

      {/* Leadership & Core Committee Roster Section */}
      <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-semibold mb-2">
              MIC Governance Structure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Leadership & Task Assigning Body
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              President, Coordinators, Department Heads, and Core Committee have the power to delegate and verify deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-amber-200 dark:border-amber-900/50">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">President</span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Sahil</h4>
              <p className="text-xs text-slate-500 mt-0.5">Overall MIC Society Head & Strategic Conclaves</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-purple-200 dark:border-purple-900/50">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1">Coordinators</span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Dhruv & Kashish</h4>
              <p className="text-xs text-slate-500 mt-0.5">Operations Cadence & Appraisal Governance</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-indigo-200 dark:border-indigo-900/50">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">Outreach Heads</span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Antra & Shivay Jain</h4>
              <p className="text-xs text-slate-500 mt-0.5">Corporate Outreach, Alliances & External PR</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-pink-200 dark:border-pink-900/50">
              <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider block mb-1">Marketing Heads</span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Anya & Gajanan</h4>
              <p className="text-xs text-slate-500 mt-0.5">Social Media Growth, Campaigns & Content</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-cyan-200 dark:border-cyan-900/50">
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block mb-1">Tech Head</span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Niket</h4>
              <p className="text-xs text-slate-500 mt-0.5">Systems Architecture, Web Portal & Gate QR Scanner</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-blue-200 dark:border-blue-900/50">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">Core Committee (11 Members)</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                Anushruti, Ashmeet, Garima, Jarbera, Kashak, Khushi, Mahi, Mohit, Shivam, Srisham, Tanishq
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Cross-functional task assigning & deliverable verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 6-Step Loop */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 text-xs font-semibold mb-2">
            MIC Operations Architecture
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            The 6-Step Closed Loop
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ASSIGN → EXECUTE → SUBMIT → VERIFY → RECORD → EVALUATE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loopSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-subtle hover:shadow-card transition-all relative overflow-hidden"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  STEP {step.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {step.title} — <span className="text-brand-600 dark:text-brand-400 font-semibold">{step.subtitle}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Launch Management Interaction Cell (MIC)
          </h2>
          <p className="mt-3 text-brand-100 text-sm max-w-xl mx-auto">
            Experience the complete portal seeded with Sahil (President), Dhruv & Kashish (Coordinators), Department Heads, Core Committee, and all 30 Organising Committee members.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleLaunchCore}
              className="px-6 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <span>Explore as Sahil (President)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleLaunchMember}
              className="px-6 py-3.5 rounded-xl bg-brand-800/80 hover:bg-brand-800 text-white font-bold text-sm border border-brand-400/40 transition-all flex items-center gap-2"
            >
              <span>Explore as Organising Member</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
        <p>Management Interaction Cell (MIC) • Society Performance & Operations Portal</p>
      </footer>
    </div>
  );
};
