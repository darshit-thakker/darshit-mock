import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FavouriteItem } from '../types/types';


const Favourites: React.FC = () => {
  const [favouriteItems, setFavouriteItems] = useState<FavouriteItem[]>([]);

  useEffect(() => {
    // Fetch favourite items from local storage or API
    const items = JSON.parse(localStorage.getItem('favouriteItems') || '[]');
    setFavouriteItems(items);
  }, []);

  const handleRemove = (id: number) => {
    const updatedItems = favouriteItems.filter(item => item.id !== id);
    setFavouriteItems(updatedItems);
    localStorage.setItem('favouriteItems', JSON.stringify(updatedItems));
  };

  const handleToggleFilter = () => {
    // No filter functionality needed here
  };

  return (
    <div>
      <Navbar onToggleFilter={handleToggleFilter} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Favourites</h1>
        {favouriteItems.length === 0 ? (
          <p>You have no favourite items.</p>
        ) : (
          <div>
            {favouriteItems.map(item => (
              <div key={item.id} className="border p-4 rounded-lg shadow-md mb-4 bg-white">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700">Price: ${item.price}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;