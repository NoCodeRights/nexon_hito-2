import React, { useState } from 'react';
import ImagePreview from '../components/ImagePreview';

const PublishProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('nuevo');
  const [selectedImages, setSelectedImages] = useState([]);
  const [categories, setCategories] = useState([]); // Se almacenarán las categorías en forma de arreglo

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se debe realizar la llamada a la API para publicar el producto.
    // Los datos a enviar: title, description, price, condition, categories, selectedImages
    console.log({ title, description, price, condition, categories, selectedImages });
  };

  return (
    <div className="container">
      <h2>Publicar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea 
            className="form-control" 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio</label>
          <input 
            type="number" 
            className="form-control" 
            id="price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="condition" className="form-label">Estado del Producto</label>
          <select 
            className="form-select" 
            id="condition" 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Categorías</label>
          {/* Aquí se puede usar un componente multiselect o checkboxes; en este ejemplo se usan como texto separado por comas */}
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ej: Hombre, Pantalones, Accesorios" 
            value={categories.join(', ')} 
            onChange={(e) => setCategories(e.target.value.split(',').map(cat => cat.trim()))} 
          />
          <small className="text-muted">Separa las categorías con comas</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Imágenes</label>
          <ImagePreview onFilesSelected={setSelectedImages} />
        </div>
        <button type="submit" className="btn btn-primary">Publicar Producto</button>
      </form>
    </div>
  );
};

export default PublishProduct;