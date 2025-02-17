import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/types';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const parsedCartItems = storedCartItems.map((item: CartItem) => ({
      ...item,
      price: Number(item.price), // Ensure price is a number
    }));
    setCartItems(parsedCartItems);
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleToggleFilter = () => {
    // No filter functionality needed here
  };

  const handleCheckout = () => {
    localStorage.setItem('orderedItems', JSON.stringify(cartItems));
    localStorage.removeItem('cartItems');
    setCartItems([]);
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Navbar onToggleFilter={handleToggleFilter} />
      <h1 className="text-2xl font-bold mb-4 mt-16 text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row w-260">
          <div className="flex-grow">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 mb-4 bg-gray-50 hover:bg-gray-200 rounded-lg shadow-md">
                <img src={item.img_url} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded"
                      min="1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 lg:ml-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Total: ${getTotalPrice()}</h2>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-black text-black py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                data-testid="checkout-button"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
