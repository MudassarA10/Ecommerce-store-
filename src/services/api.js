import axios from 'axios';

const BASE_URL = 'http://backend.test/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Global error handler
const handleError = (error) => {
  console.error('API Error:', error.response || error.message);
  return error.response?.data?.message || 'An unexpected error occurred';
};

const API_BASE_URL = 'http://backend.test/api/categories'; // Adjust based on your Laravel setup

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(API_BASE_URL, categoryData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create category');
    }
  }
};

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

    // getCategories: async () => {
    //   try {
    //     const response = await api.get('/products/categories');
    //     return response.data;
    //   } catch (error) {
    //     return handleError(error);
    //   }
    // },

    createProduct: async (productData) => {
      try {
        const response = await api.post('/products', productData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("Created product:", response);

        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create product');
      }
    },
    

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('adminToken');
    } catch (error) {
      return handleError(error);
    }
  },
};

// Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
