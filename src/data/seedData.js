// Management Interaction Cell (MIC) - Seed Data

export const SOCIETY_INFO = {
  name: "Management Interaction Cell (MIC)",
  shortName: "MIC",
  tagline: "Bridging Academia, Industry & Student Leadership",
  portalName: "SocFlow for MIC"
};

export const SEED_USERS = [
  // 1. PRESIDENT
  {
    id: "user-pres-1",
    name: "Sahil",
    tier: "Core",
    subRole: "President",
    role: "President",
    department: "Executive",
    email: "sahil.president@mic.edu",
    phone: "+91 98765 00001",
    avatarInitials: "SH",
    avatarColor: "bg-indigo-700 text-white",
    joinDate: "Aug 2023",
    bio: "President of Management Interaction Cell (MIC). Driving institutional governance, industry CXO conclaves, and strategic partnerships.",
    skills: ["Strategic Vision", "Executive Leadership", "Negotiation", "Public Speaking"],
    score: 99,
    pin: "1234"
  },

  // 1b. VICE PRESIDENT
  {
    id: "user-vp-1",
    name: "Hansul",
    tier: "Core",
    subRole: "Vice President",
    role: "Vice President",
    department: "Executive",
    email: "hansul.vp@mic.edu",
    phone: "+91 98765 00010",
    avatarInitials: "HL",
    avatarColor: "bg-rose-700 text-white",
    joinDate: "Aug 2023",
    bio: "Vice President of Management Interaction Cell (MIC). Supporting the President in governance, strategy, and cross-departmental coordination.",
    skills: ["Leadership", "Strategic Planning", "Team Coordination", "Communication"],
    score: 98,
    pin: "1234"
  },

  // 2. COORDINATORS
  {
    id: "user-coord-1",
    name: "Dhruv",
    tier: "Core",
    subRole: "Coordinator",
    role: "Coordinator",
    department: "Operations",
    email: "dhruv.coordinator@mic.edu",
    phone: "+91 98765 00002",
    avatarInitials: "DH",
    avatarColor: "bg-purple-700 text-white",
    joinDate: "Aug 2023",
    bio: "Coordinator at MIC. Orchestrating inter-departmental synergies, delegation matrices, and operational cadence.",
    skills: ["Operations", "Delegation Matrix", "Workflow Planning", "Ground Execution"],
    score: 97,
    pin: "1234"
  },
  {
    id: "user-coord-2",
    name: "Kashish",
    tier: "Core",
    subRole: "Coordinator",
    role: "Coordinator",
    department: "Operations",
    email: "kashish.coordinator@mic.edu",
    phone: "+91 98765 00003",
    avatarInitials: "KS",
    avatarColor: "bg-violet-700 text-white",
    joinDate: "Aug 2023",
    bio: "Coordinator at MIC. Managing member appraisals, deliverable audit standards, and semester governance.",
    skills: ["Performance Review", "Quality Assurance", "Resource Allocation", "Appraisals"],
    score: 97,
    pin: "1234"
  },

  // 3. DEPARTMENT HEADS
  {
    id: "user-head-1",
    name: "Antra",
    tier: "Core",
    subRole: "Department Head",
    role: "Outreach Head",
    department: "PR & Outreach",
    email: "antra.outreach@mic.edu",
    phone: "+91 98765 00004",
    avatarInitials: "AN",
    avatarColor: "bg-rose-600 text-white",
    joinDate: "Sep 2023",
    bio: "Outreach Head at MIC. Leading corporate campus alliances, corporate sponsorships, and university delegations.",
    skills: ["Corporate Alliances", "PR Strategy", "Campus Outreach"],
    score: 95,
    pin: "1234"
  },
  {
    id: "user-head-2",
    name: "Shivay Jain",
    tier: "Core",
    subRole: "Department Head",
    role: "Outreach Head",
    department: "PR & Outreach",
    email: "shivay.outreach@mic.edu",
    phone: "+91 98765 00005",
    avatarInitials: "SJ",
    avatarColor: "bg-rose-700 text-white",
    joinDate: "Sep 2023",
    bio: "Outreach Head at MIC. Managing inter-college contingents, pan-India ambassador programs, and media relations.",
    skills: ["Media Relations", "Delegation Management", "Outreach Operations"],
    score: 95,
    pin: "1234"
  },
  {
    id: "user-head-3",
    name: "Anya",
    tier: "Core",
    subRole: "Department Head",
    role: "Marketing Head",
    department: "Marketing",
    email: "anya.marketing@mic.edu",
    phone: "+91 98765 00006",
    avatarInitials: "AY",
    avatarColor: "bg-pink-600 text-white",
    joinDate: "Sep 2023",
    bio: "Marketing Head at MIC. Digital footprint, viral social campaigns, creative visual direction, and fest PR.",
    skills: ["Campaign Strategy", "Social Growth", "Brand Building"],
    score: 96,
    pin: "1234"
  },
  {
    id: "user-head-4",
    name: "Gajanan",
    tier: "Core",
    subRole: "Department Head",
    role: "Marketing Head",
    department: "Marketing",
    email: "gajanan.marketing@mic.edu",
    phone: "+91 98765 00007",
    avatarInitials: "GJ",
    avatarColor: "bg-pink-700 text-white",
    joinDate: "Sep 2023",
    bio: "Marketing Head at MIC. Performance marketing, content funnels, sponsor deliverable branding, and reels.",
    skills: ["Content Marketing", "Performance Ads", "Analytics"],
    score: 94,
    pin: "1234"
  },
  {
    id: "user-head-5",
    name: "Niket",
    tier: "Core",
    subRole: "Department Head",
    role: "Tech Head",
    department: "Tech",
    email: "niket.tech@mic.edu",
    phone: "+91 98765 00008",
    avatarInitials: "NK",
    avatarColor: "bg-cyan-600 text-white",
    joinDate: "Sep 2023",
    bio: "Tech Head at MIC. Overseeing registration architectures, QR scanning apps, portal infrastructure, and security.",
    skills: ["Full Stack", "System Architecture", "Cloud Hosting", "QR Systems"],
    score: 98,
    pin: "1234"
  },

  // 4. CORE COMMITTEE MEMBERS
  {
    id: "user-core-anushruti",
    name: "Anushruti",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "anushruti.core@mic.edu",
    phone: "+91 98765 00009",
    avatarInitials: "AS",
    avatarColor: "bg-blue-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Spearheading event rundown, logistics synchronization, and member mentoring.",
    skills: ["Event Rundown", "Hospitality", "Operations"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-core-ashmeet",
    name: "Ashmeet",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "ashmeet.core@mic.edu",
    phone: "+91 98765 00010",
    avatarInitials: "AM",
    avatarColor: "bg-teal-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Driving sponsorship outreach pitches and corporate deck reviews.",
    skills: ["Sponsorship Pitching", "Corporate Relations"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-core-garima",
    name: "Garima",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "garima.core@mic.edu",
    phone: "+91 98765 00011",
    avatarInitials: "GR",
    avatarColor: "bg-amber-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Overseeing speaker hospitality, anchor scripts, and panel coordination.",
    skills: ["Speaker Curation", "Itinerary Planning"],
    score: 92,
    pin: "1234"
  },
  {
    id: "user-core-jarbera",
    name: "Jarbera",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "jarbera.core@mic.edu",
    phone: "+91 98765 00012",
    avatarInitials: "JB",
    avatarColor: "bg-emerald-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Ground logistics, venue allocations, and vendor clearances.",
    skills: ["Vendor Relations", "Ground Operations"],
    score: 92,
    pin: "1234"
  },
  {
    id: "user-core-kashak",
    name: "Kashak",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "kashak.core@mic.edu",
    phone: "+91 98765 00013",
    avatarInitials: "KH",
    avatarColor: "bg-fuchsia-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Editorial lead for society publications and case competition rubrics.",
    skills: ["Case Writing", "Editorial Review"],
    score: 94,
    pin: "1234"
  },
  {
    id: "user-core-khushi",
    name: "Khushi",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "khushi.core@mic.edu",
    phone: "+91 98765 00014",
    avatarInitials: "KS",
    avatarColor: "bg-indigo-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Delegate experience and registration operations.",
    skills: ["Delegate Relations", "Helpdesk Ops"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-core-mahi",
    name: "Mahi",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "mahi.core@mic.edu",
    phone: "+91 98765 00015",
    avatarInitials: "MH",
    avatarColor: "bg-sky-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Media management, stage visual curation, and photographer briefings.",
    skills: ["Creative Briefing", "Media Archiving"],
    score: 92,
    pin: "1234"
  },
  {
    id: "user-core-mohit",
    name: "Mohit",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "mohit.core@mic.edu",
    phone: "+91 98765 00016",
    avatarInitials: "MT",
    avatarColor: "bg-slate-700 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Financial budgeting, cash tracking, and vendor reconciliation.",
    skills: ["Budgeting", "GST Verification"],
    score: 94,
    pin: "1234"
  },
  {
    id: "user-core-shivam",
    name: "Shivam",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "shivam.core@mic.edu",
    phone: "+91 98765 00017",
    avatarInitials: "SV",
    avatarColor: "bg-orange-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Sound engineering, electrical clearances, and auditorium coordination.",
    skills: ["A/V Operations", "Stage Rigging"],
    score: 91,
    pin: "1234"
  },
  {
    id: "user-core-srisham",
    name: "Srisham",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "srisham.core@mic.edu",
    phone: "+91 98765 00018",
    avatarInitials: "SR",
    avatarColor: "bg-violet-600 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Cross-functional quality auditor and task deliverable verification.",
    skills: ["Quality Audit", "Process Mapping"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-core-tanishq",
    name: "Tanishq",
    tier: "Core",
    subRole: "Core Committee",
    role: "Core Committee",
    department: "Core Committee",
    email: "tanishq.core@mic.edu",
    phone: "+91 98765 00019",
    avatarInitials: "TQ",
    avatarColor: "bg-emerald-700 text-white",
    joinDate: "Oct 2023",
    bio: "Core Committee member at MIC. Hackathon and corporate case challenge execution.",
    skills: ["Hackathon Logistics", "Judge Rubrics"],
    score: 92,
    pin: "1234"
  },

  // 5. ORGANISING COMMITTEE (30 WORKING MEMBERS)
  {
    id: "user-oc-1",
    name: "Aadya Jain",
    tier: "Organising",
    subRole: "Working Member",
    role: "Sponsorship Executive",
    department: "Sponsorship",
    email: "aadya.jain@mic.edu",
    phone: "+91 98111 00001",
    avatarInitials: "AJ",
    avatarColor: "bg-blue-600 text-white",
    joinDate: "Aug 2024",
    bio: "Passionate about startup networking and corporate outreach. Closed 3 key brand deals.",
    skills: ["Cold Pitching", "CRM", "Contract Review"],
    score: 94,
    pin: "1234"
  },
  {
    id: "user-oc-2",
    name: "Ananya Yadav",
    tier: "Organising",
    subRole: "Working Member",
    role: "Creative Design Associate",
    department: "Design",
    email: "ananya.yadav@mic.edu",
    phone: "+91 98111 00002",
    avatarInitials: "AY",
    avatarColor: "bg-pink-600 text-white",
    joinDate: "Aug 2024",
    bio: "Specializing in visual branding, typography, and Instagram carousel storyboards.",
    skills: ["Figma", "Illustrator", "Brand Identity"],
    score: 92,
    pin: "1234"
  },
  {
    id: "user-oc-3",
    name: "Apoorv",
    tier: "Organising",
    subRole: "Working Member",
    role: "Tech & Systems Coordinator",
    department: "Tech",
    email: "apoorv@mic.edu",
    phone: "+91 98111 00003",
    avatarInitials: "AP",
    avatarColor: "bg-cyan-600 text-white",
    joinDate: "Aug 2024",
    bio: "Building automated RSVP bots, website forms, and hackathon judge scoring portals.",
    skills: ["React", "Node.js", "Cloudflare", "Tailwind"],
    score: 95,
    pin: "1234"
  },
  {
    id: "user-oc-4",
    name: "Atharva Nadarge",
    tier: "Organising",
    subRole: "Working Member",
    role: "Logistics Lead Coordinator",
    department: "Logistics",
    email: "atharva.nadarge@mic.edu",
    phone: "+91 98111 00004",
    avatarInitials: "AN",
    avatarColor: "bg-amber-600 text-white",
    joinDate: "Aug 2024",
    bio: "Handles campus auditorium permissions, transport logistics, and on-ground crowd flow.",
    skills: ["Inventory Management", "Ground Ops", "Resource Planning"],
    score: 89,
    pin: "1234"
  },
  {
    id: "user-oc-5",
    name: "Atharv Garg",
    tier: "Organising",
    subRole: "Working Member",
    role: "PR & Media Associate",
    department: "PR & Outreach",
    email: "atharv.garg@mic.edu",
    phone: "+91 98111 00005",
    avatarInitials: "AG",
    avatarColor: "bg-rose-600 text-white",
    joinDate: "Aug 2024",
    bio: "Campus influencer liaison, media coverage, and press release distribution.",
    skills: ["Media Relations", "Copywriting", "Interviews"],
    score: 88,
    pin: "1234"
  },
  {
    id: "user-oc-6",
    name: "Bhavleen Kaur",
    tier: "Organising",
    subRole: "Working Member",
    role: "Social Media Strategist",
    department: "Marketing",
    email: "bhavleen.kaur@mic.edu",
    phone: "+91 98111 00006",
    avatarInitials: "BK",
    avatarColor: "bg-violet-600 text-white",
    joinDate: "Aug 2024",
    bio: "Grew society IG account reach by 240% in Q3 via reel strategy and trending audio.",
    skills: ["Reels Editing", "Social Analytics", "Content Calendar"],
    score: 96,
    pin: "1234"
  },
  {
    id: "user-oc-7",
    name: "Bishmeet Malhotra",
    tier: "Organising",
    subRole: "Working Member",
    role: "Events Experience Lead",
    department: "Events",
    email: "bishmeet.m@mic.edu",
    phone: "+91 98111 00007",
    avatarInitials: "BM",
    avatarColor: "bg-teal-600 text-white",
    joinDate: "Aug 2024",
    bio: "Orchestrating audience engagement, emceeing, and speaker hospitality suites.",
    skills: ["Emceeing", "Hospitality", "Event Rundown"],
    score: 91,
    pin: "1234"
  },
  {
    id: "user-oc-8",
    name: "Darsh Tyagi",
    tier: "Organising",
    subRole: "Working Member",
    role: "Sponsorship Outreach Associate",
    department: "Sponsorship",
    email: "darsh.tyagi@mic.edu",
    phone: "+91 98111 00008",
    avatarInitials: "DT",
    avatarColor: "bg-indigo-500 text-white",
    joinDate: "Aug 2024",
    bio: "FMCG brand sponsor lead. Cold-outreach machine with over 50 verified contact points.",
    skills: ["Lead Generation", "Pitch Decks", "Negotiation"],
    score: 87,
    pin: "1234"
  },
  {
    id: "user-oc-9",
    name: "Harshal Jain",
    tier: "Organising",
    subRole: "Working Member",
    role: "Finance & Accounts Associate",
    department: "Logistics",
    email: "harshal.jain@mic.edu",
    phone: "+91 98111 00009",
    avatarInitials: "HJ",
    avatarColor: "bg-emerald-700 text-white",
    joinDate: "Aug 2024",
    bio: "Tracking petty cash, bills reconciliation, GST vouchers, and vendor payouts.",
    skills: ["Excel / Sheets", "Budget Tracking", "Auditing"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-oc-10",
    name: "Harsh Kankaria",
    tier: "Organising",
    subRole: "Working Member",
    role: "Motion Graphics & Video Lead",
    department: "Design",
    email: "harsh.kankaria@mic.edu",
    phone: "+91 98111 00010",
    avatarInitials: "HK",
    avatarColor: "bg-orange-600 text-white",
    joinDate: "Aug 2024",
    bio: "After Effects wizard. Produced teaser trailer for Flagship Fest viewed 15k times.",
    skills: ["After Effects", "Premiere Pro", "Sound Design"],
    score: 94,
    pin: "1234"
  },
  {
    id: "user-oc-11",
    name: "Idika Mehan",
    tier: "Organising",
    subRole: "Working Member",
    role: "Content & Editorial Lead",
    department: "Content",
    email: "idika.mehan@mic.edu",
    phone: "+91 98111 00011",
    avatarInitials: "IM",
    avatarColor: "bg-fuchsia-600 text-white",
    joinDate: "Aug 2024",
    bio: "Editor for society newsletter 'The Pulse'. Writes speaker blurbs and anchor scripts.",
    skills: ["Ghostwriting", "Scripting", "Newsletter Curating"],
    score: 95,
    pin: "1234"
  },
  {
    id: "user-oc-12",
    name: "Kavya Rampal",
    tier: "Organising",
    subRole: "Working Member",
    role: "PR & Campus Ambassador Lead",
    department: "PR & Outreach",
    email: "kavya.rampal@mic.edu",
    phone: "+91 98111 00012",
    avatarInitials: "KR",
    avatarColor: "bg-rose-500 text-white",
    joinDate: "Aug 2024",
    bio: "Managing the 40-member external Campus Ambassador program across 15 colleges.",
    skills: ["Community Building", "Ambassador Operations", "WhatsApp Ops"],
    score: 90,
    pin: "1234"
  },
  {
    id: "user-oc-13",
    name: "Krishna Khandelwal",
    tier: "Organising",
    subRole: "Working Member",
    role: "Stage & Sound Operations",
    department: "Logistics",
    email: "krishna.k@mic.edu",
    phone: "+91 98111 00013",
    avatarInitials: "KK",
    avatarColor: "bg-amber-700 text-white",
    joinDate: "Aug 2024",
    bio: "Audio console engineer, lighting patch coordination, and band technical riders.",
    skills: ["Sound Engineering", "Stage Setup", "Live Production"],
    score: 86,
    pin: "1234"
  },
  {
    id: "user-oc-14",
    name: "Mushini Murthy",
    tier: "Organising",
    subRole: "Working Member",
    role: "Web & Automation Specialist",
    department: "Tech",
    email: "mushini.murthy@mic.edu",
    phone: "+91 98111 00014",
    avatarInitials: "MM",
    avatarColor: "bg-sky-600 text-white",
    joinDate: "Aug 2024",
    bio: "Created WhatsApp automated ticket generator and QR check-in scanner app.",
    skills: ["JavaScript", "Python Scripts", "QR Scanning", "APIs"],
    score: 97,
    pin: "1234"
  },
  {
    id: "user-oc-15",
    name: "Naman Aggarwal",
    tier: "Organising",
    subRole: "Working Member",
    role: "Corporate Sponsorship Associate",
    department: "Sponsorship",
    email: "naman.aggarwal@mic.edu",
    phone: "+91 98111 00015",
    avatarInitials: "NA",
    avatarColor: "bg-blue-700 text-white",
    joinDate: "Aug 2024",
    bio: "Secured tech gear sponsor and beverage partner for internal hackathon.",
    skills: ["Deliverables Tracking", "B2B Outreach", "MoU Drafting"],
    score: 88,
    pin: "1234"
  },
  {
    id: "user-oc-16",
    name: "Naveen Singh",
    tier: "Organising",
    subRole: "Working Member",
    role: "Security & Crowd Flow In-Charge",
    department: "Logistics",
    email: "naveen.singh@mic.edu",
    phone: "+91 98111 00016",
    avatarInitials: "NS",
    avatarColor: "bg-slate-700 text-white",
    joinDate: "Aug 2024",
    bio: "Campus guards coordination, barricading, and VIP escort protocols.",
    skills: ["Crowd Control", "Security Briefings", "Emergency Protocols"],
    score: 85,
    pin: "1234"
  },
  {
    id: "user-oc-17",
    name: "Parth Toshiniwal",
    tier: "Organising",
    subRole: "Working Member",
    role: "Brand Design Associate",
    department: "Design",
    email: "parth.t@mic.edu",
    phone: "+91 98111 00017",
    avatarInitials: "PT",
    avatarColor: "bg-purple-500 text-white",
    joinDate: "Aug 2024",
    bio: "Poster layouts, ID card designs, merchandise prints, and lanyard artwork.",
    skills: ["Photoshop", "Print Specs", "Merch Layouts"],
    score: 91,
    pin: "1234"
  },
  {
    id: "user-oc-18",
    name: "Prachi Gupta",
    tier: "Organising",
    subRole: "Working Member",
    role: "Speaker Curation & Hospitality",
    department: "Events",
    email: "prachi.gupta@mic.edu",
    phone: "+91 98111 00018",
    avatarInitials: "PG",
    avatarColor: "bg-red-500 text-white",
    joinDate: "Aug 2024",
    bio: "Curates speaker lists, handles flight tickets, hotel stays, and speaker gifting.",
    skills: ["Speaker Outreach", "Hospitality", "Itinerary Planning"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-oc-19",
    name: "Priyansh",
    tier: "Organising",
    subRole: "Working Member",
    role: "Sponsorship Outreach Associate",
    department: "Sponsorship",
    email: "priyansh@mic.edu",
    phone: "+91 98111 00019",
    avatarInitials: "PR",
    avatarColor: "bg-indigo-700 text-white",
    joinDate: "Aug 2024",
    bio: "Fintech partnerships and educational voucher partner outreach.",
    skills: ["Financial Pitching", "Cold Calling", "Deck Design"],
    score: 84,
    pin: "1234"
  },
  {
    id: "user-oc-20",
    name: "Punish Anand",
    tier: "Organising",
    subRole: "Working Member",
    role: "Procurement & Vendor Associate",
    department: "Logistics",
    email: "punish.anand@mic.edu",
    phone: "+91 98111 00020",
    avatarInitials: "PA",
    avatarColor: "bg-yellow-700 text-white",
    joinDate: "Aug 2024",
    bio: "Tents, canopy rentals, stage lighting rigs, and flex print quotations.",
    skills: ["Vendor Negotiation", "Cost Optimization", "Invoicing"],
    score: 87,
    pin: "1234"
  },
  {
    id: "user-oc-21",
    name: "Ramesht",
    tier: "Organising",
    subRole: "Working Member",
    role: "Photography & Media Archivist",
    department: "Marketing",
    email: "ramesht@mic.edu",
    phone: "+91 98111 00021",
    avatarInitials: "RM",
    avatarColor: "bg-emerald-600 text-white",
    joinDate: "Aug 2024",
    bio: "DSLR coverage, rapid post-event photo album curation, and press drive links.",
    skills: ["Lightroom", "Event Photography", "Drive Storage"],
    score: 90,
    pin: "1234"
  },
  {
    id: "user-oc-22",
    name: "Saksham Gupta",
    tier: "Organising",
    subRole: "Working Member",
    role: "Competitions & Hackathon Lead",
    department: "Events",
    email: "saksham.gupta@mic.edu",
    phone: "+91 98111 00022",
    avatarInitials: "SG",
    avatarColor: "bg-blue-500 text-white",
    joinDate: "Aug 2024",
    bio: "Problem statement design, mentor allocation, and Discord server administration.",
    skills: ["Judging Rubrics", "Discord Bots", "Participant Support"],
    score: 94,
    pin: "1234"
  },
  {
    id: "user-oc-23",
    name: "Satyam Prajapati",
    tier: "Organising",
    subRole: "Working Member",
    role: "Inter-College Outreach Lead",
    department: "PR & Outreach",
    email: "satyam.p@mic.edu",
    phone: "+91 98111 00023",
    avatarInitials: "SP",
    avatarColor: "bg-teal-700 text-white",
    joinDate: "Aug 2024",
    bio: "Visited 12 Delhi-NCR campuses for in-person desk promotions and fest invites.",
    skills: ["Direct Marketing", "Campus Visits", "Student Networking"],
    score: 89,
    pin: "1234"
  },
  {
    id: "user-oc-24",
    name: "Shipra",
    tier: "Organising",
    subRole: "Working Member",
    role: "Social Media Engagement Lead",
    department: "Marketing",
    email: "shipra@mic.edu",
    phone: "+91 98111 00024",
    avatarInitials: "SH",
    avatarColor: "bg-pink-500 text-white",
    joinDate: "Aug 2024",
    bio: "Handles Twitter/X live threads, LinkedIn updates, and audience polling during events.",
    skills: ["LinkedIn Copy", "X / Twitter Threads", "Community Chat"],
    score: 92,
    pin: "1234"
  },
  {
    id: "user-oc-25",
    name: "Siddhant Kashyap",
    tier: "Organising",
    subRole: "Working Member",
    role: "Full-Stack Dev & Server Admin",
    department: "Tech",
    email: "siddhant.k@mic.edu",
    phone: "+91 98111 00025",
    avatarInitials: "SK",
    avatarColor: "bg-violet-700 text-white",
    joinDate: "Aug 2024",
    bio: "Maintains society main portal, handles server uptime during ticket sale rushes.",
    skills: ["Next.js", "Docker", "PostgreSQL", "Vercel"],
    score: 96,
    pin: "1234"
  },
  {
    id: "user-oc-26",
    name: "Sneha Kushwaha",
    tier: "Organising",
    subRole: "Working Member",
    role: "Sponsorship Deliverables Manager",
    department: "Sponsorship",
    email: "sneha.k@mic.edu",
    phone: "+91 98111 00026",
    avatarInitials: "SK",
    avatarColor: "bg-rose-600 text-white",
    joinDate: "Aug 2024",
    bio: "Ensures sponsor logo placements on stage, stall setups, and post-event sponsor reports.",
    skills: ["Sponsor Fulfillment", "Post-Event Reporting", "Stakeholder Relations"],
    score: 93,
    pin: "1234"
  },
  {
    id: "user-oc-27",
    name: "Tamanna Bansal",
    tier: "Organising",
    subRole: "Working Member",
    role: "UI/UX & Web Designer",
    department: "Design",
    email: "tamanna.bansal@mic.edu",
    phone: "+91 98111 00027",
    avatarInitials: "TB",
    avatarColor: "bg-purple-600 text-white",
    joinDate: "Aug 2024",
    bio: "Designed mobile-first UI wireframes for Annual Fest registration microsite.",
    skills: ["UI/UX Design", "Wireframing", "Design Systems"],
    score: 95,
    pin: "1234"
  },
  {
    id: "user-oc-28",
    name: "Tanmay Bhatt",
    tier: "Organising",
    subRole: "Working Member",
    role: "Field Logistics Associate",
    department: "Logistics",
    email: "tanmay.bhatt@mic.edu",
    phone: "+91 98111 00028",
    avatarInitials: "TB",
    avatarColor: "bg-orange-700 text-white",
    joinDate: "Aug 2024",
    bio: "Handles generator fuel supply, sound cord safety, and emergency electrician liaison.",
    skills: ["Field Operations", "Quick Troubleshooting", "Heavy Lifting"],
    score: 86,
    pin: "1234"
  },
  {
    id: "user-oc-29",
    name: "Tanmay Daryani",
    tier: "Organising",
    subRole: "Working Member",
    role: "Alumni Relations & Outreach",
    department: "PR & Outreach",
    email: "tanmay.daryani@mic.edu",
    phone: "+91 98111 00029",
    avatarInitials: "TD",
    avatarColor: "bg-cyan-700 text-white",
    joinDate: "Aug 2024",
    bio: "Reconnected with 20+ society alumni for judge panels and mentoring sessions.",
    skills: ["Alumni Engagement", "Networking", "Event Panels"],
    score: 90,
    pin: "1234"
  },
  {
    id: "user-oc-30",
    name: "Yashasvi Yadav",
    tier: "Organising",
    subRole: "Working Member",
    role: "Stage Flow & Master of Ceremonies",
    department: "Events",
    email: "yashasvi.yadav@mic.edu",
    phone: "+91 98111 00030",
    avatarInitials: "YY",
    avatarColor: "bg-indigo-600 text-white",
    joinDate: "Aug 2024",
    bio: "Anchored opening ceremony of E-Summit before 800+ attendees with zero hiccups.",
    skills: ["Public Speaking", "Stage Presence", "Rundown Execution"],
    score: 94,
    pin: "1234"
  }
];

export const SEED_EVENTS = [
  {
    id: "evt-1",
    title: "MIC Annual Management Conclave 2024",
    description: "Flagship 2-day business and management symposium with keynote founders, case finals, and corporate networking.",
    category: "Flagship Summit",
    startDate: "2024-11-15",
    endDate: "2024-11-16",
    status: "Completed",
    leads: ["user-coord-1", "user-head-1"], // Dhruv, Antra
    participants: ["user-oc-1", "user-oc-2", "user-oc-3", "user-oc-4", "user-oc-6", "user-oc-14", "user-oc-22"],
    budget: "₹3,50,000",
    location: "Main University Auditorium & Management Block"
  },
  {
    id: "evt-2",
    title: "MIC Freshers Interaction & Case Bootcamp",
    description: "Induction and talent scouting orientation workshop introducing 400+ freshmen to management problem-solving.",
    category: "Recruitment & Onboarding",
    startDate: "2024-10-04",
    endDate: "2024-10-05",
    status: "Completed",
    leads: ["user-coord-2", "user-head-3"], // Kashish, Anya
    participants: ["user-oc-5", "user-oc-8", "user-oc-11", "user-oc-12", "user-oc-18", "user-oc-24"],
    budget: "₹60,000",
    location: "Campus Amphitheatre"
  },
  {
    id: "evt-3",
    title: "All-India Consulting Case Championship 2024",
    description: "National management strategy competition with 180+ teams, evaluations by Tier-1 consulting partners.",
    category: "National Competition",
    startDate: "2024-12-05",
    endDate: "2024-12-07",
    status: "Ongoing",
    leads: ["user-pres-1", "user-head-2"], // Sahil, Shivay Jain
    participants: ["user-oc-1", "user-oc-2", "user-oc-14", "user-oc-15", "user-oc-22", "user-oc-27"],
    budget: "₹1,80,000",
    location: "Management Hall & Virtual Finals"
  },
  {
    id: "evt-4",
    title: "Corporate Brand Sponsorship Blitz 2025",
    description: "Targeted outreach to corporate partners to raise ₹10 Lakhs in title and co-sponsorships for the annual conclave.",
    category: "Fundraising Drive",
    startDate: "2024-12-01",
    endDate: "2025-01-25",
    status: "Upcoming",
    leads: ["user-head-1", "user-core-ashmeet"], // Antra, Ashmeet
    participants: ["user-oc-1", "user-oc-8", "user-oc-15", "user-oc-19", "user-oc-26"],
    budget: "₹45,000",
    location: "NCR Corporate Parks & Virtual Pitch Meets"
  }
];

export const SEED_TASKS = [
  {
    id: "task-1",
    title: "Finalize Title Sponsor Deck & Pitch to 25 FMCG Brands",
    description: "Update the sponsorship deck with confirmed past footfall metrics (8,000+), create personalized cover letters, and log all 25 outreach leads in the CRM tracker.",
    category: "Sponsorship",
    priority: "Urgent",
    status: "Verified",
    assignedTo: ["user-oc-1", "user-oc-8"], // Aadya Jain, Darsh Tyagi
    assignedBy: "user-pres-1", // Sahil (President)
    createdAt: "2024-10-01T10:00:00Z",
    deadline: "2024-10-10T23:59:59Z",
    evidenceRequired: true,
    points: 150,
    estimatedHours: 14,
    eventProjectId: "evt-1",
    tags: ["Sponsorship", "Pitch Deck", "B2B Outreach"]
  },
  {
    id: "task-2",
    title: "Design 5-Slide Instagram Carousel for Speaker Reveal",
    description: "Create an eye-catching visual teaser revealing our keynote founder (Founder & CEO of FinTech unicorn). Must match dark-mode cyber aesthetic.",
    category: "Design",
    priority: "High",
    status: "Verified",
    assignedTo: ["user-oc-2", "user-oc-27"], // Ananya Yadav, Tamanna Bansal
    assignedBy: "user-head-3", // Anya (Marketing Head)
    createdAt: "2024-10-12T11:00:00Z",
    deadline: "2024-10-15T18:00:00Z",
    evidenceRequired: true,
    points: 100,
    estimatedHours: 8,
    eventProjectId: "evt-1",
    tags: ["Design", "Social Media", "Figma"]
  },
  {
    id: "task-3",
    title: "Deploy Live Attendee QR Check-in Portal & Scanner App",
    description: "Build and deploy a responsive mobile scanner web app that integrates with our Google Sheet / Supabase database for lightning-fast gate verification of 800+ ticket holders.",
    category: "Tech",
    priority: "Urgent",
    status: "Verified",
    assignedTo: ["user-oc-3", "user-oc-14"], // Apoorv, Mushini Murthy
    assignedBy: "user-head-5", // Niket (Tech Head)
    createdAt: "2024-10-20T09:00:00Z",
    deadline: "2024-10-28T23:59:59Z",
    evidenceRequired: true,
    points: 200,
    estimatedHours: 20,
    eventProjectId: "evt-1",
    tags: ["Web Dev", "Automation", "QR Check-in"]
  },
  {
    id: "task-4",
    title: "Audit Audi Acoustics, Cord Lines & Reserve Backup Generator",
    description: "Coordinate with campus estate department for sound engineer walkthrough, test lapel mic batteries, and secure written slip for 40kVA standby DG set.",
    category: "Logistics",
    priority: "High",
    status: "Verified",
    assignedTo: ["user-oc-4", "user-oc-13"], // Atharva Nadarge, Krishna Khandelwal
    assignedBy: "user-coord-1", // Dhruv (Coordinator)
    createdAt: "2024-11-01T14:00:00Z",
    deadline: "2024-11-08T17:00:00Z",
    evidenceRequired: true,
    points: 120,
    estimatedHours: 10,
    eventProjectId: "evt-1",
    tags: ["Ground Ops", "Electricals", "Audi Prep"]
  },
  {
    id: "task-5",
    title: "Draft 8 Engaging Reel Hooks & Script 60-Sec Recap Reel",
    description: "Write viral format hooks for fest recap reel, edit dynamic montage with sync beats, and submit drafts for POR review before posting.",
    category: "Marketing",
    priority: "Medium",
    status: "Submitted", // In Review Queue
    assignedTo: ["user-oc-6"], // Bhavleen Kaur
    assignedBy: "user-head-4", // Gajanan (Marketing Head)
    createdAt: "2024-11-18T12:00:00Z",
    deadline: "2024-11-24T23:59:59Z",
    evidenceRequired: true,
    points: 80,
    estimatedHours: 6,
    eventProjectId: "evt-1",
    tags: ["Reels", "Video Editing", "Content"]
  },
  {
    id: "task-6",
    title: "Prepare Comprehensive Budget Utilization & GST Bill Folder",
    description: "Collate original paper invoices, vendor receipts for stage rent, flex printing, catering, and prepare an Excel audit sheet reconciled against sanction limit.",
    category: "Logistics",
    priority: "High",
    status: "Submitted", // In Review Queue
    assignedTo: ["user-oc-9"], // Harshal Jain
    assignedBy: "user-coord-2", // Kashish (Coordinator)
    createdAt: "2024-11-17T10:00:00Z",
    deadline: "2024-11-23T18:00:00Z",
    evidenceRequired: true,
    points: 130,
    estimatedHours: 12,
    eventProjectId: "evt-1",
    tags: ["Finance", "Audit", "Invoices"]
  },
  {
    id: "task-7",
    title: "Submit Case Study Problem Statement & Scoring Rubric",
    description: "Draft 12-page business case study on a quick-commerce unit economics dilemma with authentic data exhibits and evaluator rubric.",
    category: "Events",
    priority: "Urgent",
    status: "Needs Revision",
    assignedTo: ["user-oc-22"], // Saksham Gupta
    assignedBy: "user-pres-1", // Sahil (President)
    createdAt: "2024-11-10T10:00:00Z",
    deadline: "2024-11-21T23:59:59Z",
    evidenceRequired: true,
    points: 140,
    estimatedHours: 15,
    eventProjectId: "evt-3",
    tags: ["Case Study", "Academics", "Rubrics"]
  },
  {
    id: "task-8",
    title: "Contact 30 Top Engineering & B-School Councils for Registrations",
    description: "Direct outreach to student body presidents of 30 colleges via phone and WhatsApp with official invite PDF to drive 100+ contingent entries.",
    category: "Outreach",
    priority: "High",
    status: "In Progress",
    assignedTo: ["user-oc-23", "user-oc-12"], // Satyam Prajapati, Kavya Rampal
    assignedBy: "user-head-2", // Shivay Jain (Outreach Head)
    createdAt: "2024-11-19T10:00:00Z",
    deadline: "2024-11-25T18:00:00Z",
    evidenceRequired: true,
    points: 110,
    estimatedHours: 10,
    eventProjectId: "evt-3",
    tags: ["Inter-College", "Delegations", "PR"]
  },
  {
    id: "task-9",
    title: "Design Official Certifications & Merit Badges (Print + Digital)",
    description: "Create vector certificates for Winners, Runners-up, and all verified student participants with dynamic name placeholder fields.",
    category: "Design",
    priority: "Medium",
    status: "In Progress",
    assignedTo: ["user-oc-17"], // Parth Toshiniwal
    assignedBy: "user-head-3", // Anya (Marketing Head)
    createdAt: "2024-11-20T10:00:00Z",
    deadline: "2024-11-27T23:59:59Z",
    evidenceRequired: true,
    points: 75,
    estimatedHours: 6,
    eventProjectId: "evt-3",
    tags: ["Certificates", "Vector", "Design"]
  },
  {
    id: "task-10",
    title: "Submit Stage Backdrop 3D Mock & Standee Specs for Conclave",
    description: "Produce 3D render of main fest stage backdrop (40x20 ft), incorporate sponsor zones, and generate print-ready CMYK PDFs.",
    category: "Design",
    priority: "Urgent",
    status: "Pending",
    assignedTo: ["user-oc-2", "user-oc-10"], // Ananya Yadav, Harsh Kankaria
    assignedBy: "user-coord-1", // Dhruv (Coordinator)
    createdAt: "2024-11-21T09:00:00Z",
    deadline: "2024-11-23T20:00:00Z",
    evidenceRequired: true,
    points: 160,
    estimatedHours: 14,
    eventProjectId: "evt-4",
    tags: ["3D Render", "Stage Backdrop", "Print Specs"]
  },
  {
    id: "task-11",
    title: "Arrange Security Clearance & 20 Guard Allocation from Proctor",
    description: "Draft official security requirement letter to University Proctor Office, get Dean endorsement, and coordinate with Head Security Inspector.",
    category: "Logistics",
    priority: "Urgent",
    status: "Pending",
    assignedTo: ["user-oc-16", "user-oc-28"], // Naveen Singh, Tanmay Bhatt
    assignedBy: "user-core-jarbera", // Jarbera (Core Committee)
    createdAt: "2024-11-21T11:00:00Z",
    deadline: "2024-11-24T15:00:00Z",
    evidenceRequired: true,
    points: 90,
    estimatedHours: 8,
    eventProjectId: "evt-3",
    tags: ["Admin", "Security", "Permissions"]
  },
  {
    id: "task-12",
    title: "Complete In-Person Cold Pitch Visits to Connaught Place Offices",
    description: "Targeted visits to 6 energy drink, beverage, and tech accessory regional marketing headquarters to pitch Title & Co-Sponsorship.",
    category: "Sponsorship",
    priority: "High",
    status: "Pending",
    assignedTo: ["user-oc-15", "user-oc-19"], // Naman Aggarwal, Priyansh
    assignedBy: "user-head-1", // Antra (Outreach Head)
    createdAt: "2024-11-21T14:00:00Z",
    deadline: "2024-11-26T18:00:00Z",
    evidenceRequired: true,
    points: 130,
    estimatedHours: 12,
    eventProjectId: "evt-4",
    tags: ["Corporate Pitch", "In-Person", "Sponsorship"]
  },
  {
    id: "task-13",
    title: "Coordinate 15 External Judges for Case Study Preliminary Round",
    description: "Send invitation calendar invites, brief judges on 10-minute pitch slots, and set up Google Sheets scoring rubrics.",
    category: "Events",
    priority: "Medium",
    status: "Pending",
    assignedTo: ["user-oc-18", "user-oc-29"], // Prachi Gupta, Tanmay Daryani
    assignedBy: "user-core-anushruti", // Anushruti (Core Committee)
    createdAt: "2024-11-21T15:00:00Z",
    deadline: "2024-11-28T22:00:00Z",
    evidenceRequired: true,
    points: 100,
    estimatedHours: 8,
    eventProjectId: "evt-3",
    tags: ["Judges", "Hospitality", "Scheduling"]
  },
  {
    id: "task-14",
    title: "Submit MIC Annual Review Magazine 24-Page Layout Draft",
    description: "Compile society achievements, event photologs, President note, and member interviews into cohesive InDesign/Canva print publication.",
    category: "Content",
    priority: "Low",
    status: "Pending",
    assignedTo: ["user-oc-11", "user-oc-21"], // Idika Mehan, Ramesht
    assignedBy: "user-core-kashak", // Kashak (Core Committee)
    createdAt: "2024-11-15T12:00:00Z",
    deadline: "2024-12-10T23:59:59Z",
    evidenceRequired: true,
    points: 150,
    estimatedHours: 16,
    tags: ["Editorial", "Magazine", "Archive"]
  },
  {
    id: "task-15",
    title: "Submit Society Portal SEO Audit & Mobile Responsiveness Fixes",
    description: "Run Lighthouse performance audit on mic.edu, fix layout shifts on iOS Safari, and compress past event image galleries.",
    category: "Tech",
    priority: "Medium",
    status: "Submitted", // In Review Queue
    assignedTo: ["user-oc-25"], // Siddhant Kashyap
    assignedBy: "user-head-5", // Niket (Tech Head)
    createdAt: "2024-11-16T12:00:00Z",
    deadline: "2024-11-22T23:59:59Z",
    evidenceRequired: true,
    points: 110,
    estimatedHours: 10,
    tags: ["Performance", "Frontend", "SEO"]
  }
];

export const SEED_SUBMISSIONS = [
  {
    id: "sub-1",
    taskId: "task-1",
    submittedBy: "user-oc-1", // Aadya Jain
    submittedAt: "2024-10-09T18:30:00Z",
    status: "Verified",
    evidenceLink: "https://drive.google.com/drive/folders/mic-sponsorship-pitch-2024",
    evidenceNotes: "Completed outreach to 28 FMCG brands (3 above target). Secured tentative interest from Red Bull, Boat, and Unstop. Attached the complete Google Sheet lead tracker with email threads and customized pitch PDFs.",
    attachments: [
      { name: "MIC_Sponsorship_Pitch_Deck_v4.2.pdf", size: "14.8 MB", type: "PDF Document" },
      { name: "FMCG_Brand_Outreach_Tracker_Oct10.xlsx", size: "2.1 MB", type: "Excel Sheet" }
    ],
    timeSpentHours: 16,
    reviewedBy: "user-pres-1", // Sahil
    reviewedAt: "2024-10-10T14:15:00Z",
    reviewScore: 98,
    feedbackComment: "Exceptional rigor and professionalism from Aadya. The tailored decks for Boat and Red Bull were top tier. Awarded full points + commendation note."
  },
  {
    id: "sub-2",
    taskId: "task-2",
    submittedBy: "user-oc-2", // Ananya Yadav
    submittedAt: "2024-10-14T20:10:00Z",
    status: "Verified",
    evidenceLink: "https://figma.com/file/mic-speaker-reveal-carousel-v2",
    evidenceNotes: "Created 5-slide dark mode cyber aesthetic carousel with custom typography, speaker silhouette teaser, and event ticket QR link on slide 5. Exported at 1080x1350 for optimal IG resolution.",
    attachments: [
      { name: "Speaker_Reveal_Carousel_5Slides.zip", size: "24.5 MB", type: "Archive" }
    ],
    timeSpentHours: 9,
    reviewedBy: "user-head-3", // Anya
    reviewedAt: "2024-10-15T11:00:00Z",
    reviewScore: 96,
    feedbackComment: "Phenomenal visual aesthetics! The typography choices and holographic highlights made it one of our most saved posts of the year."
  },
  {
    id: "sub-3",
    taskId: "task-3",
    submittedBy: "user-oc-14", // Mushini Murthy
    submittedAt: "2024-10-27T16:45:00Z",
    status: "Verified",
    evidenceLink: "https://github.com/mic-cell/conclave-qr-scanner",
    evidenceNotes: "Built PWA QR scanner with offline camera buffer, latency under 120ms per scan. Handled 842 ticket validations during event morning without a single crash.",
    attachments: [
      { name: "scanner-build-production.apk", size: "8.2 MB", type: "Android Package" },
      { name: "Gate_Validation_Logs_842Attendees.csv", size: "480 KB", type: "CSV Log" }
    ],
    timeSpentHours: 22,
    reviewedBy: "user-head-5", // Niket
    reviewedAt: "2024-10-28T10:30:00Z",
    reviewScore: 100,
    feedbackComment: "World-class engineering execution. The zero-downtime gate check-in saved us from massive auditorium entryway queues."
  },
  {
    id: "sub-4",
    taskId: "task-4",
    submittedBy: "user-oc-4", // Atharva Nadarge
    submittedAt: "2024-11-07T16:00:00Z",
    status: "Verified",
    evidenceLink: "https://drive.google.com/drive/folders/mic-audi-logistics-signoffs",
    evidenceNotes: "Tested all 6 wireless handheld mics and 4 lapels. Signed clearance sheet with Estate Officer Mr. Saxena for 40kVA generator backup with 50L diesel reserve.",
    attachments: [
      { name: "Signed_Audi_Clearance_EstateOffice.pdf", size: "3.4 MB", type: "PDF Document" },
      { name: "Mic_Frequency_Allocation_Chart.jpg", size: "1.8 MB", type: "Image" }
    ],
    timeSpentHours: 11,
    reviewedBy: "user-coord-1", // Dhruv
    reviewedAt: "2024-11-08T09:20:00Z",
    reviewScore: 94,
    feedbackComment: "Solid groundwork. Having the written clearance beforehand prevented power issues when the campus main grid tripped."
  },
  {
    id: "sub-5",
    taskId: "task-5",
    submittedBy: "user-oc-6", // Bhavleen Kaur
    submittedAt: "2024-11-21T19:30:00Z",
    status: "Pending Review",
    evidenceLink: "https://drive.google.com/drive/folders/mic-reels-submission-bhavleen",
    evidenceNotes: "Edited 58-second high-energy recap reel with viral transition trends, custom sound effects, and color graded 4K footage. Also drafted 3 caption variations with optimized hashtags.",
    attachments: [
      { name: "MIC_Conclave_Recap_Reel_ColorGraded_v1.mp4", size: "64.2 MB", type: "Video" },
      { name: "Instagram_Captions_and_Hashtags.txt", size: "12 KB", type: "Text Document" }
    ],
    timeSpentHours: 8,
    reviewedBy: null,
    reviewedAt: null,
    reviewScore: null,
    feedbackComment: null
  },
  {
    id: "sub-6",
    taskId: "task-6",
    submittedBy: "user-oc-9", // Harshal Jain
    submittedAt: "2024-11-21T14:15:00Z",
    status: "Pending Review",
    evidenceLink: "https://docs.google.com/spreadsheets/d/mic-financial-audit-sheet-2024",
    evidenceNotes: "Collated all 34 vendor invoices across Sound, Catering, T-Shirts, Flex Print, and Mementoes. Total spent: ₹2,18,450 against allocated budget of ₹2,50,000 (Saved ₹31,550!). All GST numbers cross-checked.",
    attachments: [
      { name: "Conclave2024_Expense_Reconciliation.xlsx", size: "4.8 MB", type: "Excel Sheet" },
      { name: "Scanned_Vendor_Invoices_Pack_34Bills.pdf", size: "28.5 MB", type: "PDF Document" }
    ],
    timeSpentHours: 14,
    reviewedBy: null,
    reviewedAt: null,
    reviewScore: null,
    feedbackComment: null
  },
  {
    id: "sub-7",
    taskId: "task-7",
    submittedBy: "user-oc-22", // Saksham Gupta
    submittedAt: "2024-11-19T21:00:00Z",
    status: "Needs Revision",
    evidenceLink: "https://docs.google.com/document/d/mic-case-problem-v1",
    evidenceNotes: "Submitted first draft of case study regarding Dark Store density economics and customer acquisition churn in Tier-2 Indian cities.",
    attachments: [
      { name: "Case_Study_Draft_v1.docx", size: "1.2 MB", type: "Word Document" }
    ],
    timeSpentHours: 12,
    reviewedBy: "user-pres-1", // Sahil
    reviewedAt: "2024-11-20T11:45:00Z",
    reviewScore: 72,
    feedbackComment: "Strong premise, but the financial exhibits need actual balance sheet metrics (Exhibit 3 & 4 are missing EBITDA calculations). Also make the scoring rubric clearer for external judges. Please revise and resubmit by Nov 23."
  },
  {
    id: "sub-8",
    taskId: "task-15",
    submittedBy: "user-oc-25", // Siddhant Kashyap
    submittedAt: "2024-11-22T08:15:00Z",
    status: "Pending Review",
    evidenceLink: "https://github.com/mic-cell/society-portal/pull/42",
    evidenceNotes: "Boosted Google Lighthouse mobile score from 68 to 94. Implemented next/image lazy loading, compressed hero assets by 70%, and fixed viewport layout jump on mobile navbar.",
    attachments: [
      { name: "Lighthouse_Audit_Report_94Score.pdf", size: "1.1 MB", type: "PDF Document" }
    ],
    timeSpentHours: 10,
    reviewedBy: null,
    reviewedAt: null,
    reviewScore: null,
    feedbackComment: null
  }
];

export const SEED_CONTRIBUTIONS = [
  {
    id: "contrib-1",
    userId: "user-oc-4", // Atharva Nadarge
    title: "Stayed Back 4.5 Hours to Unload Stage Rigs & Rearrange 600 Audi Chairs",
    category: "Logistics",
    description: "When the campus night vendor arrived 3 hours late at 9:30 PM, the auditorium had to be vacated before morning inspection. Remained on campus until 2 AM with campus security to unload heavy aluminium trusses and seat markers.",
    date: "2024-11-14",
    hoursSpent: 4.5,
    evidenceLink: "https://drive.google.com/drive/folders/mic-stage-setup-night-photos",
    evidenceNotes: "Night security supervisor registered sign-off in campus gate logbook. Attached photos of finished auditorium layout.",
    status: "Verified",
    reviewedBy: "user-coord-1", // Dhruv
    reviewedAt: "2024-11-15T09:00:00Z",
    awardedPoints: 60,
    feedbackComment: "Exemplary commitment. This dedication saved the entire opening ceremony from getting delayed. Huge respect!"
  },
  {
    id: "contrib-2",
    userId: "user-oc-1", // Aadya Jain
    title: "Negotiated Emergency Free Printing of 500 Food Coupons on Fest Morning",
    category: "Sponsorship",
    description: "The primary print vendor failed to deliver lunch coupons on Day 1 morning. Leveraged personal relationship with local campus print shop owner to get 500 color-coded coupons printed within 45 minutes free of charge as goodwill sponsorship.",
    date: "2024-11-15",
    hoursSpent: 2,
    evidenceLink: "https://drive.google.com/drive/folders/mic-emergency-coupon-bills",
    evidenceNotes: "Coupons were distributed to all delegates at 12:30 PM smoothly without disruption.",
    status: "Verified",
    reviewedBy: "user-pres-1", // Sahil
    reviewedAt: "2024-11-16T10:00:00Z",
    awardedPoints: 50,
    feedbackComment: "Crisis averted thanks to your swift thinking and local network. Recorded into your verified portfolio."
  },
  {
    id: "contrib-3",
    userId: "user-oc-2", // Ananya Yadav
    title: "Designed 8 Urgent Last-Minute Speaker Quote Graphics in Under 2 Hours",
    category: "Design",
    description: "While the keynote was actively speaking, extracted top punchlines and live-designed quote cards on Canva and Figma for instant Twitter and Instagram story broadcasting.",
    date: "2024-11-15",
    hoursSpent: 2.5,
    evidenceLink: "https://instagram.com/stories/highlights/mic_quotes",
    evidenceNotes: "Stories received 3,400+ views and 2 speakers reposted them on their official LinkedIn profiles.",
    status: "Verified",
    reviewedBy: "user-head-3", // Anya
    reviewedAt: "2024-11-16T12:00:00Z",
    awardedPoints: 45,
    feedbackComment: "Unreal turnaround speed! The speakers specifically praised the aesthetic branding."
  },
  {
    id: "contrib-4",
    userId: "user-oc-14", // Mushini Murthy
    title: "Fixed Broken WhatsApp API Webhook on Saturday Midnight",
    category: "Tech",
    description: "The Meta WhatsApp Cloud API credentials token expired midway through ticket distribution, causing 120 students to miss entry barcodes. Diagnosed token refresh script and deployed hotfix patch at 1:15 AM.",
    date: "2024-11-10",
    hoursSpent: 3,
    evidenceLink: "https://github.com/mic-cell/society-portal/commit/a8f93e2",
    evidenceNotes: "Resent all 120 pending tickets with 100% verified delivery logs.",
    status: "Pending Review",
    reviewedBy: null,
    reviewedAt: null,
    awardedPoints: null,
    feedbackComment: null
  },
  {
    id: "contrib-5",
    userId: "user-oc-5", // Atharv Garg
    title: "Pitched MIC Conclave to 3 Campus Media Portals & Secured Feature Articles",
    category: "PR & Outreach",
    description: "Conducted proactive outreach to 'DU Beat', 'Campus Karma', and 'Youth Ki Awaaz'. Secured free pre-event features reaching an estimated 40,000 college students.",
    date: "2024-11-12",
    hoursSpent: 5,
    evidenceLink: "https://dubeat.com/sample-feature-mic-conclave-2024",
    evidenceNotes: "Attached live article links and media kit engagement analytics.",
    status: "Pending Review",
    reviewedBy: null,
    reviewedAt: null,
    awardedPoints: null,
    feedbackComment: null
  }
];

export const SEED_FEEDBACK = [
  {
    id: "fb-1",
    fromUserId: "user-pres-1", // Sahil (President)
    toUserId: "user-oc-1", // Aadya Jain
    taskId: "task-1",
    type: "Kudos",
    rating: 5,
    message: "Aadya has shown stellar initiative in closing corporate discussions. Her negotiation posture with FMCG brand managers reflects extreme maturity.",
    createdAt: "2024-10-10T14:30:00Z",
    tags: ["Leadership", "High Initiative", "Professionalism"]
  },
  {
    id: "fb-2",
    fromUserId: "user-coord-1", // Dhruv (Coordinator)
    toUserId: "user-oc-4", // Atharva Nadarge
    taskId: "task-4",
    type: "Kudos",
    rating: 5,
    message: "Atharva is the backbone of our ground operations. When emergencies occur, you can count on him to stay calm and solve vendor bottlenecks.",
    createdAt: "2024-11-08T09:30:00Z",
    tags: ["Ground Ops", "Reliability", "Crisis Management"]
  },
  {
    id: "fb-3",
    fromUserId: "user-head-3", // Anya (Marketing Head)
    toUserId: "user-oc-2", // Ananya Yadav
    taskId: "task-2",
    type: "Kudos",
    rating: 5,
    message: "Ananya's design precision has set an all-time visual benchmark for MIC. She is reliable, receptive to feedback, and exceptionally fast.",
    createdAt: "2024-10-15T11:15:00Z",
    tags: ["Design Excellence", "Speed", "Attention to Detail"]
  },
  {
    id: "fb-4",
    fromUserId: "user-pres-1", // Sahil (President)
    toUserId: "user-oc-22", // Saksham Gupta
    taskId: "task-7",
    type: "Constructive",
    rating: 3,
    message: "Great conceptual thinking on the case premise, but please ensure quantitative exhibits are complete before submitting. You have immense potential—push for higher analytical rigor.",
    createdAt: "2024-11-20T11:50:00Z",
    tags: ["Analytical Rigor", "Documentation Quality"]
  },
  {
    id: "fb-5",
    fromUserId: "user-head-5", // Niket (Tech Head)
    toUserId: "user-oc-14", // Mushini Murthy
    taskId: "task-3",
    type: "Kudos",
    rating: 5,
    message: "Flawless tech execution. The custom QR scanner reduced check-in waiting times from 4 minutes to 8 seconds. Superb technical acumen.",
    createdAt: "2024-10-28T10:45:00Z",
    tags: ["Technical Mastery", "Future Leadership Contender", "Impact"]
  }
];

export const SEED_NOTIFICATIONS = [
  {
    id: "notif-1",
    userId: "user-pres-1",
    title: "New Task Submission Awaiting Review",
    message: "Bhavleen Kaur submitted work for 'Draft 8 Engaging Reel Hooks & Script 60-Sec Recap Reel'.",
    type: "submission_received",
    link: "/core/reviews",
    read: false,
    createdAt: "2024-11-21T19:30:00Z"
  },
  {
    id: "notif-2",
    userId: "user-coord-1",
    title: "Financial Audit Submitted",
    message: "Harshal Jain submitted complete GST invoice folder for MIC Conclave 2024.",
    type: "submission_received",
    link: "/core/reviews",
    read: false,
    createdAt: "2024-11-21T14:15:00Z"
  },
  {
    id: "notif-3",
    userId: "user-coord-2",
    title: "New Self-Logged Contribution",
    message: "Mushini Murthy logged informal work: 'Fixed Broken WhatsApp API Webhook on Saturday Midnight'.",
    type: "submission_received",
    link: "/core/reviews",
    read: false,
    createdAt: "2024-11-21T10:00:00Z"
  },
  {
    id: "notif-4",
    userId: "user-oc-1", // Aadya
    title: "Work Verified & Commended! 🎉",
    message: "Sahil (President) verified 'Finalize Title Sponsor Deck' with 98/100 score.",
    type: "verified",
    link: "/member/tasks",
    read: true,
    createdAt: "2024-10-10T14:15:00Z"
  },
  {
    id: "notif-5",
    userId: "user-oc-22", // Saksham
    title: "Revision Requested ⚠️",
    message: "Task 'Submit Case Study Problem Statement' requires updates to exhibits and rubrics.",
    type: "revision_requested",
    link: "/member/tasks",
    read: false,
    createdAt: "2024-11-20T11:45:00Z"
  },
  {
    id: "notif-6",
    userId: "user-oc-2", // Ananya
    title: "Urgent Task Assigned",
    message: "Dhruv (Coordinator) assigned you 'Submit Stage Backdrop 3D Mock & Standee Specs'.",
    type: "task_assigned",
    link: "/member/tasks",
    read: false,
    createdAt: "2024-11-21T09:00:00Z"
  }
];
