"use strict";
const ssr = require("../ssr.cjs");
class CourseService {
  // -----------------------------------------------------------------------
  // Public Endpoints
  // -----------------------------------------------------------------------
  async getPublicCourses(params) {
    const query = ssr.buildQueryString(params || {});
    return ssr.apiRequest(`/courses${query}`);
  }
  async getPublicCourse(slug) {
    return ssr.apiRequest(`/courses/${slug}`);
  }
  async getPublicLesson(slug) {
    return ssr.apiRequest(`/lessons/${slug}`);
  }
  async getPublicCourseReviews(courseId, params) {
    const query = ssr.buildQueryString(params || {});
    return ssr.apiRequest(`/courses/${courseId}/reviews${query}`);
  }
  async submitCourseReview(courseId, data) {
    return ssr.apiRequest(`/courses/${courseId}/reviews`, "POST", data);
  }
  async updateLessonProgress(lessonId, data) {
    return ssr.apiRequest(`/lessons/${lessonId}/progress`, "POST", data);
  }
  // -----------------------------------------------------------------------
  // Admin Endpoints
  // -----------------------------------------------------------------------
  async getAdminCourses(params) {
    const query = ssr.buildQueryString(params || {});
    return ssr.apiRequest(`/admin/courses${query}`);
  }
  async getAdminCourse(id) {
    return ssr.apiRequest(`/admin/courses/${id}`);
  }
  async createCourse(data) {
    return ssr.apiRequest("/admin/courses", "POST", data);
  }
  async updateCourse(id, data) {
    return ssr.apiRequest(`/admin/courses/${id}`, "POST", data);
  }
  async deleteCourse(id) {
    return ssr.apiRequest(`/admin/courses/${id}`, "DELETE");
  }
  async togglePublishCourse(id) {
    return ssr.apiRequest(`/admin/courses/${id}/publish`, "PATCH");
  }
  // Modules
  async createModule(data) {
    return ssr.apiRequest("/admin/modules", "POST", data);
  }
  async updateModule(id, data) {
    return ssr.apiRequest(`/admin/modules/${id}`, "PUT", data);
  }
  async deleteModule(id) {
    return ssr.apiRequest(`/admin/modules/${id}`, "DELETE");
  }
  // Lessons
  async createLesson(data) {
    return ssr.apiRequest("/admin/lessons", "POST", data);
  }
  async updateLesson(id, data) {
    return ssr.apiRequest(`/admin/lessons/${id}`, "POST", data);
  }
  async deleteLesson(id) {
    return ssr.apiRequest(`/admin/lessons/${id}`, "DELETE");
  }
  async reorderLessons(data) {
    return ssr.apiRequest("/admin/lessons/reorder", "POST", data);
  }
  // Reviews Management
  async getAdminReviews(params) {
    const query = ssr.buildQueryString(params || {});
    return ssr.apiRequest(`/admin/reviews${query}`);
  }
  async approveReview(id) {
    return ssr.apiRequest(`/admin/reviews/${id}/approve`, "PATCH");
  }
  async rejectReview(id) {
    return ssr.apiRequest(`/admin/reviews/${id}/reject`, "PATCH");
  }
  async deleteReview(id) {
    return ssr.apiRequest(`/admin/reviews/${id}`, "DELETE");
  }
}
const courseService = new CourseService();
exports.courseService = courseService;
