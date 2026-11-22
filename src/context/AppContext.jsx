import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SOCIETY_INFO,
  SEED_USERS,
  SEED_TASKS,
  SEED_SUBMISSIONS,
  SEED_CONTRIBUTIONS,
  SEED_FEEDBACK,
  SEED_EVENTS,
  SEED_NOTIFICATIONS
} from '../data/seedData';

const AppContext = createContext();

const STORAGE_KEY = 'socflow_mic_state_v3';
const CURRENT_USER_KEY = 'socflow_mic_current_user_v3';
const THEME_KEY = 'socflow_mic_theme_mode_v3';
const DATA_VERSION = 'mic_v3_hansul'; // bump this whenever seed users change

export const AppProvider = ({ children }) => {
  // Initialize data from localStorage or fallback to seed data
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check data version — if stale (missing Hansul), force fresh seed
        const hasHansul = parsed.users && parsed.users.some(u => u.id === 'user-vp-1');
        if (hasHansul) {
          return parsed;
        }
        // Stale data — clear and fall through to seed
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Error loading stored state', e);
    }
    return {
      society: SOCIETY_INFO,
      users: SEED_USERS,
      tasks: SEED_TASKS,
      submissions: SEED_SUBMISSIONS,
      contributions: SEED_CONTRIBUTIONS,
      feedback: SEED_FEEDBACK,
      events: SEED_EVENTS,
      notifications: SEED_NOTIFICATIONS
    };
  });

  // Current logged in user (defaults to Sahil - President)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUserId = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUserId) {
        const found = data.users.find(u => u.id === savedUserId);
        if (found) return found;
      }
    } catch (e) {
      console.error('Error loading current user', e);
    }
    return data.users.find(u => u.id === 'user-pres-1') || data.users[0];
  });

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Permissions rule requested by user:
  // "Allow task assigning power to all except organizing committee member Core Committee, Department Heads, Coordinator and President has power of assigning task and make sure if i shift to organizing committe the dash board of assigning task should be removed"
  const canAssignTasks = (user = currentUser) => {
    if (!user) return false;
    // Organising Committee members CANNOT assign tasks
    if (user.tier === 'Organising') return false;
    // Core Committee, Department Heads, Coordinator and President CAN assign tasks
    return true;
  };

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving state', e);
    }
  }, [data]);

  // Synchronize current user
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(CURRENT_USER_KEY, currentUser.id);
      } catch (e) {}
    }
  }, [currentUser]);

  // Synchronize dark mode class on <html>
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const loginUser = (userId) => {
    const user = data.users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // Reset all data back to fresh initial seed
  const resetToDefaultSeed = () => {
    const pristine = {
      society: SOCIETY_INFO,
      users: SEED_USERS,
      tasks: SEED_TASKS,
      submissions: SEED_SUBMISSIONS,
      contributions: SEED_CONTRIBUTIONS,
      feedback: SEED_FEEDBACK,
      events: SEED_EVENTS,
      notifications: SEED_NOTIFICATIONS
    };
    setData(pristine);
    setCurrentUser(pristine.users[0]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pristine));
    localStorage.setItem(CURRENT_USER_KEY, pristine.users[0].id);
  };

  // Helper: Calculate member performance metrics
  const getMemberStats = (userId) => {
    const memberTasks = data.tasks.filter(t => t.assignedTo.includes(userId));
    const completedTasks = memberTasks.filter(t => t.status === 'Verified');
    const pendingTasks = memberTasks.filter(t => t.status === 'Pending' || t.status === 'In Progress' || t.status === 'Needs Revision');
    const submittedTasks = memberTasks.filter(t => t.status === 'Submitted');

    const now = new Date();
    const overdueTasks = memberTasks.filter(t => {
      if (t.status === 'Verified') return false;
      return new Date(t.deadline) < now;
    });

    // Submissions for this user
    const memberSubs = data.submissions.filter(s => s.submittedBy === userId);
    const verifiedSubs = memberSubs.filter(s => s.status === 'Verified');

    // On-time completion
    let onTimeCount = 0;
    verifiedSubs.forEach(sub => {
      const task = data.tasks.find(t => t.id === sub.taskId);
      if (task && new Date(sub.submittedAt) <= new Date(task.deadline)) {
        onTimeCount++;
      }
    });

    const onTimeRate = verifiedSubs.length > 0 
      ? Math.round((onTimeCount / verifiedSubs.length) * 100) 
      : (completedTasks.length > 0 ? 92 : 100);

    // Self-logged verified contributions
    const memberContribs = data.contributions.filter(c => c.userId === userId);
    const verifiedContribs = memberContribs.filter(c => c.status === 'Verified');
    const extraHours = verifiedContribs.reduce((acc, c) => acc + (Number(c.hoursSpent) || 0), 0);
    const contribPoints = verifiedContribs.reduce((acc, c) => acc + (Number(c.awardedPoints) || 0), 0);

    // Task points earned
    const taskPoints = completedTasks.reduce((acc, t) => acc + (Number(t.points) || 0), 0);
    const totalPoints = taskPoints + contribPoints;

    // Events participated or led
    const eventsParticipated = data.events.filter(e => e.participants.includes(userId) || e.leads.includes(userId));
    const eventsLed = data.events.filter(e => e.leads.includes(userId));

    // Feedback rating
    const memberFeedbacks = data.feedback.filter(f => f.toUserId === userId);
    const avgRating = memberFeedbacks.length > 0
      ? (memberFeedbacks.reduce((acc, f) => acc + f.rating, 0) / memberFeedbacks.length).toFixed(1)
      : '5.0';

    // Objective appraisal score (0-100 index)
    const completionRatio = memberTasks.length > 0 ? (completedTasks.length / memberTasks.length) : 1;
    const computedScore = Math.min(100, Math.round(
      (completionRatio * 40) +
      ((onTimeRate / 100) * 25) +
      ((parseFloat(avgRating) / 5) * 20) +
      (Math.min(extraHours, 10) / 10 * 15)
    ));

    return {
      assigned: memberTasks.length,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      submitted: submittedTasks.length,
      overdue: overdueTasks.length,
      onTimeRate,
      verifiedSubsCount: verifiedSubs.length,
      verifiedContribsCount: verifiedContribs.length,
      extraHours,
      taskPoints,
      contribPoints,
      totalPoints,
      eventsCount: eventsParticipated.length,
      eventsLedCount: eventsLed.length,
      avgRating,
      feedbackCount: memberFeedbacks.length,
      score: computedScore
    };
  };

  // Task Operations
  const createTask = (taskData) => {
    // Only non-OC members can assign tasks
    if (!canAssignTasks(currentUser)) {
      alert("Permission Denied: Only President, Coordinators, Department Heads, and Core Committee members can assign tasks.");
      return null;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      points: Number(taskData.points) || 100,
      estimatedHours: Number(taskData.estimatedHours) || 8,
      tags: taskData.tags || [taskData.category],
      assignedBy: currentUser.id,
      ...taskData
    };

    setData(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
      notifications: [
        ...newTask.assignedTo.map(uid => ({
          id: `notif-${Date.now()}-${uid}`,
          userId: uid,
          title: `New Task Assigned: ${newTask.title}`,
          message: `${currentUser?.name} (${currentUser?.role}) assigned you a new ${newTask.priority} priority task with deadline ${new Date(newTask.deadline).toLocaleDateString()}.`,
          type: 'task_assigned',
          link: '/member/tasks',
          read: false,
          createdAt: new Date().toISOString()
        })),
        ...prev.notifications
      ]
    }));

    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
    }));
  };

  const deleteTask = (taskId) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId),
      submissions: prev.submissions.filter(s => s.taskId !== taskId)
    }));
  };

  // Submit Work (Member)
  const submitWork = ({ taskId, evidenceLink, evidenceNotes, attachments, timeSpentHours }) => {
    const newSubmission = {
      id: `sub-${Date.now()}`,
      taskId,
      submittedBy: currentUser.id,
      submittedAt: new Date().toISOString(),
      status: 'Pending Review',
      evidenceLink: evidenceLink || '',
      evidenceNotes: evidenceNotes || '',
      attachments: attachments || [],
      timeSpentHours: Number(timeSpentHours) || 4,
      reviewedBy: null,
      reviewedAt: null,
      reviewScore: null,
      feedbackComment: null
    };

    setData(prev => {
      const task = prev.tasks.find(t => t.id === taskId);
      const updatedTasks = prev.tasks.map(t =>
        t.id === taskId ? { ...t, status: 'Submitted' } : t
      );

      // Notify core leadership
      const leadership = prev.users.filter(u => u.tier === 'Core');
      const newNotifs = leadership.map(c => ({
        id: `notif-${Date.now()}-${c.id}`,
        userId: c.id,
        title: 'New Deliverable Awaiting Verification',
        message: `${currentUser.name} submitted work for '${task?.title || 'a task'}'.`,
        type: 'submission_received',
        link: '/core/reviews',
        read: false,
        createdAt: new Date().toISOString()
      }));

      return {
        ...prev,
        tasks: updatedTasks,
        submissions: [newSubmission, ...prev.submissions],
        notifications: [...newNotifs, ...prev.notifications]
      };
    });

    return newSubmission;
  };

  // Review Task Submission
  const reviewSubmission = (submissionId, { status, reviewScore, feedbackComment }) => {
    const sub = data.submissions.find(s => s.id === submissionId);
    if (!sub) return;

    const task = data.tasks.find(t => t.id === sub.taskId);
    const isApproved = status === 'Verified';

    setData(prev => {
      const updatedSubmissions = prev.submissions.map(s =>
        s.id === submissionId
          ? {
              ...s,
              status,
              reviewScore: Number(reviewScore) || 90,
              feedbackComment,
              reviewedBy: currentUser.id,
              reviewedAt: new Date().toISOString()
            }
          : s
      );

      const updatedTasks = prev.tasks.map(t =>
        t.id === sub.taskId
          ? {
              ...t,
              status: isApproved ? 'Verified' : 'Needs Revision'
            }
          : t
      );

      let updatedFeedback = prev.feedback;
      if (feedbackComment) {
        const newFb = {
          id: `fb-${Date.now()}`,
          fromUserId: currentUser.id,
          toUserId: sub.submittedBy,
          taskId: sub.taskId,
          type: isApproved ? 'Kudos' : 'Constructive',
          rating: isApproved ? 5 : 3,
          message: feedbackComment,
          createdAt: new Date().toISOString(),
          tags: isApproved ? ['Verified Deliverable', 'MIC Standard'] : ['Revision Needed']
        };
        updatedFeedback = [newFb, ...prev.feedback];
      }

      const memberNotif = {
        id: `notif-${Date.now()}-${sub.submittedBy}`,
        userId: sub.submittedBy,
        title: isApproved ? 'Work Verified & Recorded! 🎉' : 'Revision Requested on Submission ⚠️',
        message: isApproved
          ? `${currentUser.name} (${currentUser.role}) verified your work for '${task?.title || 'Task'}'. Score: ${reviewScore || 95}/100.`
          : `${currentUser.name} (${currentUser.role}) requested updates for '${task?.title || 'Task'}': "${feedbackComment || 'See feedback'}"`,
        type: isApproved ? 'verified' : 'revision_requested',
        link: '/member/tasks',
        read: false,
        createdAt: new Date().toISOString()
      };

      return {
        ...prev,
        tasks: updatedTasks,
        submissions: updatedSubmissions,
        feedback: updatedFeedback,
        notifications: [memberNotif, ...prev.notifications]
      };
    });
  };

  // Self-Log Additional Contribution
  const logContribution = ({ title, category, description, date, hoursSpent, evidenceLink, evidenceNotes }) => {
    const newContrib = {
      id: `contrib-${Date.now()}`,
      userId: currentUser.id,
      title,
      category: category || 'General Operations',
      description,
      date: date || new Date().toISOString().split('T')[0],
      hoursSpent: Number(hoursSpent) || 2,
      evidenceLink: evidenceLink || '',
      evidenceNotes: evidenceNotes || '',
      status: 'Pending Review',
      reviewedBy: null,
      reviewedAt: null,
      awardedPoints: null,
      feedbackComment: null
    };

    setData(prev => {
      const leadership = prev.users.filter(u => u.tier === 'Core');
      const coreNotifs = leadership.map(c => ({
        id: `notif-${Date.now()}-${c.id}`,
        userId: c.id,
        title: 'New Self-Logged Contribution For Verification',
        message: `${currentUser.name} logged informal work: "${title}".`,
        type: 'submission_received',
        link: '/core/reviews',
        read: false,
        createdAt: new Date().toISOString()
      }));

      return {
        ...prev,
        contributions: [newContrib, ...prev.contributions],
        notifications: [...coreNotifs, ...prev.notifications]
      };
    });

    return newContrib;
  };

  // Review Self-Logged Contribution
  const reviewContribution = (contributionId, { status, awardedPoints, feedbackComment }) => {
    const contrib = data.contributions.find(c => c.id === contributionId);
    if (!contrib) return;

    const isApproved = status === 'Verified';

    setData(prev => {
      const updatedContribs = prev.contributions.map(c =>
        c.id === contributionId
          ? {
              ...c,
              status,
              awardedPoints: isApproved ? (Number(awardedPoints) || 50) : 0,
              feedbackComment,
              reviewedBy: currentUser.id,
              reviewedAt: new Date().toISOString()
            }
          : c
      );

      const notif = {
        id: `notif-${Date.now()}-${contrib.userId}`,
        userId: contrib.userId,
        title: isApproved ? 'Self-Logged Contribution Verified! 🌟' : 'Contribution Update ✕',
        message: isApproved
          ? `${currentUser.name} (${currentUser.role}) verified your additional contribution: "${contrib.title}" (+${awardedPoints || 50} pts).`
          : `${currentUser.name} (${currentUser.role}) reviewed your contribution: "${feedbackComment || 'Not verified'}"`,
        type: isApproved ? 'verified' : 'revision_requested',
        link: '/member/portfolio',
        read: false,
        createdAt: new Date().toISOString()
      };

      return {
        ...prev,
        contributions: updatedContribs,
        notifications: [notif, ...prev.notifications]
      };
    });
  };

  // Give Direct Feedback
  const giveFeedback = ({ toUserId, taskId, type, rating, message, tags }) => {
    const newFeedback = {
      id: `fb-${Date.now()}`,
      fromUserId: currentUser.id,
      toUserId,
      taskId: taskId || null,
      type: type || 'Kudos',
      rating: Number(rating) || 5,
      message,
      createdAt: new Date().toISOString(),
      tags: tags || ['Management Interaction Cell', 'Society Leadership']
    };

    setData(prev => ({
      ...prev,
      feedback: [newFeedback, ...prev.feedback],
      notifications: [
        {
          id: `notif-${Date.now()}-${toUserId}`,
          userId: toUserId,
          title: `New Feedback Received from ${currentUser.name} (${currentUser.role})`,
          message: `"${message.slice(0, 80)}..."`,
          type: 'feedback',
          link: '/member/feedback',
          read: false,
          createdAt: new Date().toISOString()
        },
        ...prev.notifications
      ]
    }));

    return newFeedback;
  };

  // Member Management
  const addMember = (memberData) => {
    const initials = memberData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const colors = [
      'bg-indigo-600 text-white',
      'bg-purple-600 text-white',
      'bg-pink-600 text-white',
      'bg-blue-600 text-white',
      'bg-emerald-600 text-white',
      'bg-amber-600 text-white',
      'bg-cyan-600 text-white'
    ];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    const newMember = {
      id: `user-${memberData.tier.toLowerCase()}-${Date.now()}`,
      avatarInitials: initials || 'MC',
      avatarColor,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      skills: memberData.skills || ['Management Operations'],
      score: 85,
      pin: '1234',
      bio: memberData.bio || 'Active MIC society member.',
      ...memberData
    };

    setData(prev => ({
      ...prev,
      users: [...prev.users, newMember]
    }));

    return newMember;
  };

  const updateMember = (memberId, updates) => {
    setData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === memberId ? { ...u, ...updates } : u)
    }));
    if (currentUser?.id === memberId) {
      setCurrentUser(prev => ({ ...prev, ...updates }));
    }
  };

  const removeMember = (memberId) => {
    setData(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== memberId),
      tasks: prev.tasks.map(t => ({
        ...t,
        assignedTo: t.assignedTo.filter(id => id !== memberId)
      }))
    }));
    if (currentUser?.id === memberId) {
      const fallback = data.users.find(u => u.id !== memberId && u.tier === 'Core') || data.users[0];
      setCurrentUser(fallback);
    }
  };

  // Events / Projects Management
  const createEvent = (eventData) => {
    const newEvent = {
      id: `evt-${Date.now()}`,
      status: 'Upcoming',
      leads: eventData.leads || [],
      participants: eventData.participants || [],
      budget: eventData.budget || '₹1,00,000',
      ...eventData
    };

    setData(prev => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));

    return newEvent;
  };

  const updateEvent = (eventId, updates) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === eventId ? { ...e, ...updates } : e)
    }));
  };

  const markNotificationRead = (notifId) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === notifId ? { ...n, read: true } : n)
    }));
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.userId === currentUser.id ? { ...n, read: true } : n)
    }));
  };

  return (
    <AppContext.Provider
      value={{
        data,
        society: data.society || SOCIETY_INFO,
        currentUser,
        isDarkMode,
        canAssignTasks,
        toggleDarkMode,
        loginUser,
        logoutUser,
        resetToDefaultSeed,
        getMemberStats,
        createTask,
        updateTask,
        deleteTask,
        submitWork,
        reviewSubmission,
        logContribution,
        reviewContribution,
        giveFeedback,
        addMember,
        updateMember,
        removeMember,
        createEvent,
        updateEvent,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
