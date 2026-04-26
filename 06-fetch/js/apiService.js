
'use strict';


const ApiService = {
  baseUrl: 'https://jsonplaceholder.typicode.com',

  /**
   * Método genérico para hacer peticiones HTTP
   * @param {string} endpoint - Ruta del endpoint (ej: '/posts')
   * @param {object} options - Opciones de fetch (method, body, headers)
   * @returns {Promise} - Promesa con los datos parseados
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();

    } catch (error) {
      console.error('Error en petición:', error);
      throw error;
    }
  },

  /**
   * GET 
   */
  async getPosts(limit = 10) {
    return this.request(`/posts?_limit=${limit}`);
  },

  /**
   * GET 
   */
  async getPostById(id) {
    return this.request(`/posts/${id}`);
  },

  /**
   * POST
   */
  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  },

  /**
   * PUT 
   */
  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData)
    });
  },

  /**
   * DELETE
   */
  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE'
    });
  },

  /**
   * GET 
   */
  async getPostsByUser(userId) {
    return this.request(`/posts?userId=${userId}`);
  }
};