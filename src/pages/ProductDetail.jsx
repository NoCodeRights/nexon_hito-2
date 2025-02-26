import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  const product = { id, title: `Producto ${id}`, description: `Descripción completa del producto ${id}`, price: 150, image_url: 'https://via.placeholder.com/600' };

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.image_url} alt={product.title} className="img-fluid mb-3" />
      <p>{product.description}</p>
      <p className="fw-bold">Precio: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;