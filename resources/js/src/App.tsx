import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ConfirmationProvider } from "./components/ConfirmationDialog";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";

// SSR Context
import { SSRContext } from "./contexts/SSRContext";

// Components
import LoadingScreen from "./components/LoadingScreen";
import SupportChatFloat from "./components/SupportChatFloat";
import GlobalLoadingOverlay from "./components/GlobalLoadingOverlay";

// Public Pages - Eager loaded for SSR support
import HomePage from "./pages/website/HomePage";
import BlogPage from "./pages/website/BlogPage";
import BlogSlugPage from "./pages/website/BlogSlugPage";
import WorkflowsPage from "./pages/website/WorkflowsPage";
import WorkflowDetailsPage from "./pages/website/WorkflowDetailsPage";
import TemplatesShowcasePage from "./pages/website/TemplatesShowcasePage";

// Lazy Pages (Admin & Less Critical)
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const ContactPage = lazy(() => import("./pages/website/ContactPage"));
const SitemapPage = lazy(() => import("./pages/website/SitemapPage"));
const CoursesListPage = lazy(() => import("./pages/website/CoursesListPage"));
const CourseDetailsPage = lazy(() => import("./pages/website/CourseDetailsPage"));
const LessonViewerPage = lazy(() => import("./pages/website/LessonViewerPage"));
const NotFoundPage = lazy(() => import("./pages/website/NotFoundPage"));
const SecureInterviewClient = lazy(() => import("./pages/interview/SecureInterviewClient"));

// Admin Admin Layout & Pages
import { DashboardLayout } from "./components/layout/DashboardLayout";
const AdminDashboard = lazy(() => import("./pages/app/Dashboard"));
const BlogsManagement = lazy(() => import("./pages/app/BlogManagement"));
const PagesManagement = lazy(() => import("./pages/PageManagement"));
const FAQsManagement = lazy(() => import("./pages/FAQManagement"));
const CourseManagement = lazy(() => import("./pages/app/AdminCoursesPage"));
const CourseReviews = lazy(() => import("./pages/app/AdminCourseReviewsPage"));
const ContactEnquiries = lazy(() => import("./pages/ContactEnquiries"));
const NewsletterSubscribers = lazy(() => import("./pages/NewsletterSubscribers"));
const SupportChatAdmin = lazy(() => import("./pages/app/SupportChatAdmin"));
const AutomationHub = lazy(() => import("./pages/app/AutomationHub"));
const WorkflowTemplates = lazy(() => import("./pages/app/WorkflowTemplates"));

// SuperAdmin layout
const SuperAdminDashboard = lazy(() => import("./pages/superadmin/SuperAdminDashboard"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blogs/:slug" element={<BlogSlugPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/templates" element={<TemplatesShowcasePage />} />
      <Route path="/sitemap" element={<SitemapPage />} />
      <Route path="/workflow/:slug" element={<WorkflowDetailsPage />} />
      <Route path="/workflow" element={<Navigate to="/workflows" replace />} />
      <Route path="/workflows" element={<WorkflowsPage />} />
      <Route path="/courses" element={<CoursesListPage />} />
      <Route path="/courses/:slug" element={<CourseDetailsPage />} />
      <Route path="/courses/:courseSlug/:lessonSlug" element={<LessonViewerPage />} />
      <Route path="/workflow-categories/:slug" element={<WorkflowsPage />} />
      <Route path="/blog-categories/:slug" element={<BlogPage />} />
      <Route path="/interview/:token" element={<SecureInterviewClient />} />

      {/* Admin Protected Routes */}
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="blogs" element={<BlogsManagement />} />
        <Route path="pages" element={<PagesManagement />} />
        <Route path="faqs" element={<FAQsManagement />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="course-reviews" element={<CourseReviews />} />
        <Route path="contact-enquiries" element={<ContactEnquiries />} />
        <Route path="newsletter-subscribers" element={<NewsletterSubscribers />} />
        <Route path="support-chat" element={<SupportChatAdmin />} />
        <Route path="workflows" element={<AutomationHub />} />
        <Route path="workflow-templates" element={<WorkflowTemplates />} />
      </Route>

      <Route path="/superadmin" element={<SuperAdminDashboard />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  // Get initial data from window if present (Hydration) or from global if server
  const ssrData = typeof window !== 'undefined'
    ? (window as any).__SSR_DATA__ || {}
    : (globalThis as any).context || {};

  return (
    <SSRContext.Provider value={ssrData}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <ConfirmationProvider>
              <Suspense fallback={<LoadingScreen />}>
                <AppRoutes />
                <SupportChatFloat />
                <GlobalLoadingOverlay />
              </Suspense>
            </ConfirmationProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </SSRContext.Provider>
  );
}

export default App;
