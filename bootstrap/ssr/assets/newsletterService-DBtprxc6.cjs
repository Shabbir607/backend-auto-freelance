"use strict";
const ssr = require("../ssr.cjs");
const newsletterService = {
  getAllSubscribers: async (page = 1) => {
    const response = await ssr.apiRequest(`/admin/newsletter-subscribers?page=${page}`, "GET");
    const payload = response.data;
    const data = payload?.data ?? payload;
    return {
      success: response.success,
      message: response.message,
      data
    };
  },
  deleteSubscriber: async (id) => {
    const response = await ssr.apiRequest(`/admin/newsletter-subscribers/${id}`, "DELETE");
    return {
      success: response.success,
      message: response.message,
      data: response.data
    };
  }
};
exports.newsletterService = newsletterService;
