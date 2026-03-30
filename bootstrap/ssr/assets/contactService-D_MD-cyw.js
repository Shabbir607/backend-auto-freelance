import { aP as apiRequest } from "../ssr.js";
const contactService = {
  /**
   * Submit contact form to public contact endpoint
   */
  submitContactForm: async (data) => {
    const response = await apiRequest("/contact", "POST", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Subscribe email to public newsletter endpoint
   */
  subscribeNewsletter: async (data) => {
    const response = await apiRequest("/newsletter", "POST", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Get all contact messages (admin only)
   */
  getAllMessages: async (page = 1) => {
    const response = await apiRequest(`/admin/contact-messages?page=${page}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Get single contact message by ID (admin only)
   */
  getMessageById: async (id) => {
    const response = await apiRequest(`/admin/contact-messages/${id}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  /**
   * Reply to a contact message (admin only)
   */
  replyToMessage: async (id, replyMessage) => {
    const response = await apiRequest(`/admin/contact-messages/${id}/reply`, "POST", { reply_message: replyMessage });
    return { success: response.success, message: response.message, data: response.data?.data };
  }
};
export {
  contactService as c
};
