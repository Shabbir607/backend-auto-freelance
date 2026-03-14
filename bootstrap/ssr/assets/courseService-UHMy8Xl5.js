import { x as buildQueryString, y as apiRequest } from "../ssr.js";
class CourseService {
  // -----------------------------------------------------------------------
  // Public Endpoints
  // -----------------------------------------------------------------------
  async getPublicCourses(params) {
    const query = buildQueryString(params || {});
    return apiRequest(`/courses${query}`);
  }
  async getPublicCourse(slug) {
    return apiRequest(`/courses/${slug}`);
  }
  async getPublicLesson(slug) {
    return apiRequest(`/lessons/${slug}`);
  }
  async getPublicCourseReviews(courseId, params) {
    const query = buildQueryString(params || {});
    return apiRequest(`/courses/${courseId}/reviews${query}`);
  }
  async submitCourseReview(courseId, data) {
    return apiRequest(`/courses/${courseId}/reviews`, "POST", data);
  }
  async updateLessonProgress(lessonId, data) {
    return apiRequest(`/lessons/${lessonId}/progress`, "POST", data);
  }
  // -----------------------------------------------------------------------
  // Admin Endpoints
  // -----------------------------------------------------------------------
  async getAdminCourses(params) {
    const query = buildQueryString(params || {});
    return apiRequest(`/admin/courses${query}`);
  }
  async getAdminCourse(id) {
    return apiRequest(`/admin/courses/${id}`);
  }
  async createCourse(data) {
    return apiRequest("/admin/courses", "POST", data);
  }
  async updateCourse(id, data) {
    return apiRequest(`/admin/courses/${id}`, "POST", data);
  }
  async deleteCourse(id) {
    return apiRequest(`/admin/courses/${id}`, "DELETE");
  }
  async togglePublishCourse(id) {
    return apiRequest(`/admin/courses/${id}/publish`, "PATCH");
  }
  // Modules
  async createModule(data) {
    return apiRequest("/admin/modules", "POST", data);
  }
  async updateModule(id, data) {
    return apiRequest(`/admin/modules/${id}`, "PUT", data);
  }
  async deleteModule(id) {
    return apiRequest(`/admin/modules/${id}`, "DELETE");
  }
  // Lessons
  async createLesson(data) {
    return apiRequest("/admin/lessons", "POST", data);
  }
  async updateLesson(id, data) {
    return apiRequest(`/admin/lessons/${id}`, "POST", data);
  }
  async deleteLesson(id) {
    return apiRequest(`/admin/lessons/${id}`, "DELETE");
  }
  async reorderLessons(data) {
    return apiRequest("/admin/lessons/reorder", "POST", data);
  }
  // Reviews Management
  async getAdminReviews(params) {
    const query = buildQueryString(params || {});
    return apiRequest(`/admin/reviews${query}`);
  }
  async approveReview(id) {
    return apiRequest(`/admin/reviews/${id}/approve`, "PATCH");
  }
  async rejectReview(id) {
    return apiRequest(`/admin/reviews/${id}/reject`, "PATCH");
  }
  async deleteReview(id) {
    return apiRequest(`/admin/reviews/${id}`, "DELETE");
  }
}
const courseService = new CourseService();
export {
  courseService as c
};
