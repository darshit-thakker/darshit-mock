import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import StarRating from './StarRating';
import { Product } from '../types/types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/items/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: Product) => item.id === product.id);

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart!');
  };

  const handleBuyNow = () => {
    const orderedItems = [{ ...product, quantity }];
    localStorage.setItem('orderedItems', JSON.stringify(orderedItems));
    navigate('/checkout');
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="w-full mx-auto p-4 mt-25">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img src={product.img_url} alt={product.title} className="w-full h-96 object-cover mb-4 rounded" />
          </div>
          <div className="lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-900 mb-2">Category: {product.category}</p>
            <p className="text-gray-950 mb-2">Collection: {product.collection}</p>
            <p className="text-gray-900 mb-2">Price: ${product.price}</p>
            <div className="flex items-center mb-2">
              <span className="text-gray-950 mr-2">Rating:</span>
              <StarRating rating={product.rating} />
            </div>
            <div className="flex space-x-2 mb-4">
              <span className="block w-6 h-6 rounded-full" style={{ backgroundColor: product.color1 }}></span>
              <span className="block w-6 h-6 rounded-full" style={{ backgroundColor: product.color2 }}></span>
            </div>
            <p className="text-gray-900 mb-4">{product.desc}</p>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="p-2 border rounded w-20"
              />
            </div>
            <p className="text-lg font-bold mb-4">Total: ${(Number(product.price) * quantity).toFixed(2)}</p>
            <button
              className="bg-orange-500 text-black px-4 py-2 rounded mr-2"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="bg-white text-black px-4 py-2 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;