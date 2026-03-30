import { aP as apiRequest } from "../ssr.js";
const newsletterService = {
  getAllSubscribers: async (page = 1) => {
    const response = await apiRequest(`/admin/newsletter-subscribers?page=${page}`, "GET");
    const payload = response.data;
    const data = payload?.data ?? payload;
    return {
      success: response.success,
      message: response.message,
      data
    };
  },
  deleteSubscriber: async (id) => {
    const response = await apiRequest(`/admin/newsletter-subscribers/${id}`, "DELETE");
    return {
      success: response.success,
      message: response.message,
      data: response.data
    };
  }
};
export {
  newsletterService as n
};
