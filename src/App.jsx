import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { CoreDashboard } from './pages/core/CoreDashboard';
import { TasksManagement } from './pages/core/TasksManagement';
import { ReviewQueue } from './pages/core/ReviewQueue';
import { MembersDirectory } from './pages/core/MembersDirectory';
import { MemberDetail } from './pages/core/MemberDetail';
import { PerformanceAppraisal } from './pages/core/PerformanceAppraisal';
import { EventsProjects } from './pages/core/EventsProjects';
import { MemberDashboard } from './pages/member/MemberDashboard';
import { MyTasks } from './pages/member/MyTasks';
import { FeedbackInbox } from './pages/member/FeedbackInbox';
import { VerifiedPortfolio } from './pages/member/VerifiedPortfolio';
import { SocietyCalendar } from './pages/shared/SocietyCalendar';

// Protected Route for leadership / task-assigning roles
const LeadershipOnlyRoute = ({ children }) => {
  const { currentUser, canAssignTasks } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  // If shifted to Organising Committee, the assigning task dashboard is removed!
  if (!canAssignTasks(currentUser)) {
    return <Navigate to="/member/dashboard" replace />;
  }
  return children;
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isPublicPage = location.pathname === '/' || location.pathname === '/login';

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-200 overflow-x-hidden">
      <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <div className="flex-1 flex min-w-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 lg:pl-64 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public Routes — Root goes straight to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Shared Route: Everyone (Core & OC) can see all deadlines & delegation calendar */}
            <Route path="/calendar" element={<SocietyCalendar />} />

            {/* Core Leadership & Task Assigning Routes (President, Coordinators, Heads, Core Committee) */}
            <Route
              path="/core/dashboard"
              element={
                <LeadershipOnlyRoute>
                  <CoreDashboard />
                </LeadershipOnlyRoute>
              }
            />
            <Route
              path="/core/tasks"
              element={
                <LeadershipOnlyRoute>
                  <TasksManagement />
                </LeadershipOnlyRoute>
              }
            />
            <Route
              path="/core/reviews"
              element={
                <LeadershipOnlyRoute>
                  <ReviewQueue />
                </LeadershipOnlyRoute>
              }
            />
            <Route
              path="/core/members"
              element={
                <LeadershipOnlyRoute>
                  <MembersDirectory />
                </LeadershipOnlyRoute>
              }
            />
            <Route
              path="/core/members/:memberId"
              element={
                <LeadershipOnlyRoute>
                  <MemberDetail />
                </LeadershipOnlyRoute>
              }
            />
            <Route
              path="/core/appraisals"
              element={
                <LeadershipOnlyRoute>
                  <PerformanceAppraisal />
                </LeadershipOnlyRoute>
              }
            />
            <Route
              path="/core/events"
              element={
                <LeadershipOnlyRoute>
                  <EventsProjects />
                </LeadershipOnlyRoute>
              }
            />

            {/* Organising Committee Member Routes */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/tasks" element={<MyTasks />} />
            <Route path="/member/feedback" element={<FeedbackInbox />} />
            <Route path="/member/portfolio" element={<VerifiedPortfolio />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
