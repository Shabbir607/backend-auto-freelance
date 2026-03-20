"use strict";
const ssr = require("../ssr.cjs");
class PageService extends ssr.BaseService {
  constructor() {
    super();
  }
  async listPages() {
    const response = await fetch(`${this.baseUrl}/admin/pages`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }
    return response.json();
  }
  async getUserPages() {
    const response = await fetch(`${this.baseUrl}/user/pages`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user pages: ${response.statusText}`);
    }
    return response.json();
  }
  async getPageBySlug(slug) {
    const response = await fetch(`${this.baseUrl}/pages/${slug}`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    return response.json();
  }
  async getPageBody(slug) {
    const response = await fetch(`${this.baseUrl}/pagebody/${slug}`, {
      method: "GET",
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch page body: ${response.statusText}`);
    }
    return response.json();
  }
  async getPage(id) {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    return response.json();
  }
  async createPage(data) {
    const response = await fetch(`${this.baseUrl}/admin/pages`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create page");
    }
    return response.json();
  }
  async updatePage(id, data) {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update page");
    }
    return response.json();
  }
  async deletePage(id) {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete page");
    }
    return response.json();
  }
  validSlugs = null;
  async getValidSlugs() {
    if (this.validSlugs) {
      return this.validSlugs;
    }
    try {
      const response = await fetch(`${this.baseUrl}/page-slugs`, {
        headers: {
          "Accept": "application/json"
          // No auth headers needed for public endpoint, but consistent header helper is fine if public
        }
      });
      if (!response.ok) {
        console.warn("Failed to fetch page slugs");
        return [];
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        this.validSlugs = result.data;
        return result.data;
      }
      return [];
    } catch (error) {
      console.warn("Error fetching page slugs", error);
      return [];
    }
  }
}
const pageService = new PageService();
exports.pageService = pageService;
