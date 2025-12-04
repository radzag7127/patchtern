import { apiClient, ApiResponse } from './client';
import { Product } from '@/types/models';

export const productsApi = {
  async getProducts(category?: string): Promise<ApiResponse<Product[]>> {
    const endpoint = category && category !== 'all'
      ? `/api/products?category=${category}`
      : '/api/products';
    return apiClient.get<Product[]>(endpoint);
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/api/products/${id}`);
  },
};
