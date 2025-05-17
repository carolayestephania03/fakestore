import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../services/api';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className="product-image" />
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <p className="category">{product.category}</p>
        </div>
      ))}
    </div>
  );
}; 