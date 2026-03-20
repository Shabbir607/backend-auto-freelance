"use strict";
const ssr = require("../ssr.cjs");
const contactService = {
  /**
   * Submit contact form to public contact endpoint
   */
  submitContactForm: async (data) => {
    const response = await ssr.apiRequest("/contact", "POST", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Subscribe email to public newsletter endpoint
   */
  subscribeNewsletter: async (data) => {
    const response = await ssr.apiRequest("/newsletter", "POST", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Get all contact messages (admin only)
   */
  getAllMessages: async (page = 1) => {
    const response = await ssr.apiRequest(`/admin/contact-messages?page=${page}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Get single contact message by ID (admin only)
   */
  getMessageById: async (id) => {
    const response = await ssr.apiRequest(`/admin/contact-messages/${id}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Reply to a contact message (admin only)
   */
  replyToMessage: async (id, replyMessage) => {
    const response = await ssr.apiRequest(`/admin/contact-messages/${id}/reply`, "POST", { reply_message: replyMessage });
    return { success: response.success, message: response.message, data: response.data?.data };
  }
};
exports.contactService = contactService;
