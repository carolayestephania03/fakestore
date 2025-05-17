import { useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../services/api';

export const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      await api.createProduct(newProduct);
      setSuccess(true);
      setFormData({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
    } catch (err) {
      setError('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product">
      <h2>Crear Nuevo Producto</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Producto creado exitosamente</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la imagen:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
}; 