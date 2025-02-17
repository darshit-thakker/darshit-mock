import React, { useEffect, useState } from 'react';
import { OrderedItem } from '../types/types';

const CheckoutPage: React.FC = () => {
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);

  useEffect(() => {
    const storedOrderedItems = JSON.parse(localStorage.getItem('orderedItems') || '[]');
    setOrderedItems(storedOrderedItems);
  }, []);

  return (
    <div className="container mx-auto p-4 mt-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-700 mb-4">Your product will be delivered within a week. Thank you!</p>
      <h2 className="text-xl font-bold mb-2">Ordered Items:</h2>
      <ul className="list-disc list-inside">
        {orderedItems.map(item => (
          <li key={item.id} className="text-gray-700">
            {item.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutPage;