
import { apiRequest, buildQueryString, PaginatedResponse } from '@/lib/apiConfig';

// --- Interfaces ---

export interface CourseSeo {
    title?: string;
    description?: string;
    keywords?: string;
    meta_tags?: string;
    og_image?: string;
    canonical_url?: string;
}

export interface LessonResource {
    id: number;
    title: string;
    file_url: string;
    file_type?: string;
    file_size?: number;
    created_at?: string;
}

export interface UserProgress {
    id: number;
    user_id: number;
    lesson_id: number;
    is_completed: boolean;
    watched_percentage?: number;
    last_watched_pos?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Lesson {
    id: number;
    title: string;
    slug: string;
    video_url?: string;
    thumbnail?: string;
    text_content?: string;
    is_free_preview: boolean;
    order: number;
    seo?: CourseSeo;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    seo_meta_tags?: string;
    seo_canonical_url?: string;
    og_image?: string;
    module?: Module;
    resources?: LessonResource[];
    user_progress?: UserProgress | null;
    created_at: string;
    updated_at: string;
}

export interface Module {
    id: number;
    title: string;
    order: number;
    lessons?: Lesson[];
    course?: Course;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    level: string;
    is_published: boolean;
    average_rating?: number;
    reviews_count?: number;
    seo?: CourseSeo;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    seo_meta_tags?: string;
    seo_canonical_url?: string;
    og_image?: string;
    modules?: Module[];
    created_at: string;
    updated_at: string;
}

export interface CourseReviewUser {
    id: number | null;
    name: string;
}

export interface CourseReview {
    id: number;
    course_id: number;
    user_id?: number | null;
    rating: number;
    title: string;
    comment: string;
    is_approved: boolean;
    user?: CourseReviewUser;
    guest_email?: string;
    created_at: string;
    updated_at: string;
}

// --- API Service Calls ---

class CourseService {
    // -----------------------------------------------------------------------
    // Public Endpoints
    // -----------------------------------------------------------------------

    async getPublicCourses(params?: { page?: number; per_page?: number; search?: string }) {
        const query = buildQueryString(params || {});
        return apiRequest<PaginatedResponse<Course>>(`/courses${query}`);
    }

    async getPublicCourse(slug: string) {
        return apiRequest<Course>(`/courses/${slug}`);
    }

    async getPublicLesson(slug: string) {
        return apiRequest<Lesson>(`/lessons/${slug}`);
    }

    async getPublicCourseReviews(courseId: number, params?: { page?: number; per_page?: number }) {
        const query = buildQueryString(params || {});
        return apiRequest<PaginatedResponse<CourseReview>>(`/courses/${courseId}/reviews${query}`);
    }

    async submitCourseReview(courseId: number, data: { rating: number; title: string; comment: string; guest_name?: string; guest_email?: string; }) {
        return apiRequest<CourseReview>(`/courses/${courseId}/reviews`, 'POST', data);
    }

    async updateLessonProgress(lessonId: number, data: { watched_percentage: number }) {
        return apiRequest<{ message: string; progress: UserProgress }>(`/lessons/${lessonId}/progress`, 'POST', data);
    }

    // -----------------------------------------------------------------------
    // Admin Endpoints
    // -----------------------------------------------------------------------

    async getAdminCourses(params?: { page?: number; per_page?: number; search?: string }) {
        const query = buildQueryString(params || {});
        return apiRequest<PaginatedResponse<Course>>(`/admin/courses${query}`);
    }

    async getAdminCourse(id: number) {
        return apiRequest<Course>(`/admin/courses/${id}`);
    }

    async createCourse(data: Partial<Course> | FormData) {
        return apiRequest<Course>('/admin/courses', 'POST', data);
    }

    async updateCourse(id: number, data: Partial<Course> | FormData) {
        return apiRequest<Course>(`/admin/courses/${id}`, 'POST', data);
    }

    async deleteCourse(id: number) {
        return apiRequest<{ message: string }>(`/admin/courses/${id}`, 'DELETE');
    }

    async togglePublishCourse(id: number) {
        return apiRequest<Course>(`/admin/courses/${id}/publish`, 'PATCH');
    }

    // Modules
    async createModule(data: { course_id: number; title: string; order?: number }) {
        return apiRequest<Module>('/admin/modules', 'POST', data);
    }

    async updateModule(id: number, data: { title?: string; order?: number; course_id?: number }) {
        return apiRequest<Module>(`/admin/modules/${id}`, 'PUT', data);
    }

    async deleteModule(id: number) {
        return apiRequest<{ message: string }>(`/admin/modules/${id}`, 'DELETE');
    }

    // Lessons
    async createLesson(data: Partial<Lesson> | FormData) {
        return apiRequest<Lesson>('/admin/lessons', 'POST', data);
    }

    async updateLesson(id: number, data: Partial<Lesson> | FormData) {
        return apiRequest<Lesson>(`/admin/lessons/${id}`, 'POST', data);
    }

    async deleteLesson(id: number) {
        return apiRequest<{ message: string }>(`/admin/lessons/${id}`, 'DELETE');
    }

    async reorderLessons(data: { lessons: { id: number; order: number }[] }) {
        return apiRequest<{ message: string }>('/admin/lessons/reorder', 'POST', data);
    }

    // Reviews Management
    async getAdminReviews(params?: { page?: number; per_page?: number }) {
        const query = buildQueryString(params || {});
        return apiRequest<PaginatedResponse<CourseReview>>(`/admin/reviews${query}`);
    }

    async approveReview(id: number) {
        return apiRequest<{ message: string; review: CourseReview }>(`/admin/reviews/${id}/approve`, 'PATCH');
    }

    async rejectReview(id: number) {
        return apiRequest<{ message: string; review: CourseReview }>(`/admin/reviews/${id}/reject`, 'PATCH');
    }

    async deleteReview(id: number) {
        return apiRequest<{ message: string }>(`/admin/reviews/${id}`, 'DELETE');
    }
}

export const courseService = new CourseService();
