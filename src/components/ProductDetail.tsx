import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../services/api';

interface ProductDetailProps {
  productId: number;
}

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(productId);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
      </div>
    </div>
  );
}; 