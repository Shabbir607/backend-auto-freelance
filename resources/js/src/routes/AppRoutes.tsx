import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

// Public Pages - Eager loaded for SSR support
import HomePage from "../pages/website/HomePage";
import BlogPage from "../pages/website/BlogPage";
import BlogSlugPage from "../pages/website/BlogSlugPage";
import WorkflowsPage from "../pages/website/WorkflowsPage";
import WorkflowDetailsPage from "../pages/website/WorkflowDetailsPage";

// Lazy Pages (Admin & Less Critical)
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"));
const ContactPage = lazy(() => import("../pages/website/ContactPage"));
const SitemapPage = lazy(() => import("../pages/website/SitemapPage"));
const CoursesListPage = lazy(() => import("../pages/website/CoursesListPage"));
const CourseDetailsPage = lazy(() => import("../pages/website/CourseDetailsPage"));
const LessonViewerPage = lazy(() => import("../pages/website/LessonViewerPage"));
const NotFoundPage = lazy(() => import("../pages/website/NotFoundPage"));
const SecureInterviewClient = lazy(() => import("../pages/interview/SecureInterviewClient"));

// Admin Admin Layout & Pages
import { DashboardLayout } from "../components/layout/DashboardLayout";
const AdminDashboard = lazy(() => import("../pages/app/Dashboard"));
const BlogsManagement = lazy(() => import("../pages/app/BlogManagement"));
const PagesManagement = lazy(() => import("../pages/PageManagement"));
const FAQsManagement = lazy(() => import("../pages/FAQManagement"));
const CourseManagement = lazy(() => import("../pages/app/AdminCoursesPage"));
const CourseReviews = lazy(() => import("../pages/app/AdminCourseReviewsPage"));
const ContactEnquiries = lazy(() => import("../pages/ContactEnquiries"));
const NewsletterSubscribers = lazy(() => import("../pages/NewsletterSubscribers"));
const SupportChatAdmin = lazy(() => import("../pages/app/SupportChatAdmin"));
const AutomationHub = lazy(() => import("../pages/app/AutomationHub"));
const WorkflowTemplates = lazy(() => import("../pages/app/WorkflowTemplates"));

// SuperAdmin layout
const SuperAdminDashboard = lazy(() => import("../pages/superadmin/SuperAdminDashboard"));

import LoadingScreen from "../components/LoadingScreen";
import { Suspense } from "react";

const LazyLoad = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<LoadingScreen />}>
        {children}
    </Suspense>
);

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LazyLoad><LoginPage /></LazyLoad>} />
            <Route path="/signup" element={<LazyLoad><SignupPage /></LazyLoad>} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:slug" element={<BlogSlugPage />} />
            <Route path="/contact" element={<LazyLoad><ContactPage /></LazyLoad>} />
            <Route path="/sitemap" element={<LazyLoad><SitemapPage /></LazyLoad>} />
            <Route path="/workflow/:slug" element={<WorkflowDetailsPage />} />
            <Route path="/workflow" element={<Navigate to="/workflows" replace />} />
            <Route path="/workflow-library" element={<WorkflowsPage />} />
            <Route path="/templates" element={<WorkflowsPage />} />
            <Route path="/workflows" element={<WorkflowsPage />} />
            <Route path="/courses" element={<LazyLoad><CoursesListPage /></LazyLoad>} />
            <Route path="/courses/:slug" element={<LazyLoad><CourseDetailsPage /></LazyLoad>} />
            <Route path="/courses/:courseSlug/:lessonSlug" element={<LazyLoad><LessonViewerPage /></LazyLoad>} />
            <Route path="/workflow-categories/:slug" element={<WorkflowsPage />} />
            <Route path="/blog-categories/:slug" element={<BlogPage />} />
            <Route path="/interview/:token" element={<LazyLoad><SecureInterviewClient /></LazyLoad>} />

            {/* Admin Protected Routes */}
            <Route path="/app" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
                <Route element={<DashboardLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<LazyLoad><AdminDashboard /></LazyLoad>} />
                    <Route path="blogs" element={<LazyLoad><BlogsManagement /></LazyLoad>} />
                    <Route path="pages" element={<LazyLoad><PagesManagement /></LazyLoad>} />
                    <Route path="faqs" element={<LazyLoad><FAQsManagement /></LazyLoad>} />
                    <Route path="courses" element={<LazyLoad><CourseManagement /></LazyLoad>} />
                    <Route path="course-reviews" element={<LazyLoad><CourseReviews /></LazyLoad>} />
                    <Route path="contact-enquiries" element={<LazyLoad><ContactEnquiries /></LazyLoad>} />
                    <Route path="newsletter-subscribers" element={<LazyLoad><NewsletterSubscribers /></LazyLoad>} />
                    <Route path="support-chat" element={<LazyLoad><SupportChatAdmin /></LazyLoad>} />
                    <Route path="workflows" element={<LazyLoad><AutomationHub /></LazyLoad>} />
                    <Route path="workflow-templates" element={<LazyLoad><WorkflowTemplates /></LazyLoad>} />
                </Route>
            </Route>

            <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['superadmin']} />}>
                <Route index element={<LazyLoad><SuperAdminDashboard /></LazyLoad>} />
            </Route>

            <Route path="*" element={<LazyLoad><NotFoundPage /></LazyLoad>} />
        </Routes>
    );
}
