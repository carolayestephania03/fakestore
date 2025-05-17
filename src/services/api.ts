import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const api = {
  // Listar todos los productos
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  // Obtener un producto por ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  // Crear un nuevo producto
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  }
}; 