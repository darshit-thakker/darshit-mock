import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Product, ProductListProps } from '../types/types';


const ProductList: React.FC<ProductListProps> = ({ filters, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => filters.colors.includes(product.color));
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    if (filters.collections.length > 0) {
      filtered = filtered.filter(product => filters.collections.includes(product.collection));
    }

    filtered = filtered.filter(product => Number(product.price) <= filters.priceRange);

    if (searchQuery) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [filters, products, searchQuery]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const updatedCartItems = [...cartItems, { ...product, quantity: 1, color: product.color }];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <div className="container mx-auto p-4 mt-5 max-w-7xl">
    <h1 className="text-2xl font-bold mb-4 text-center mt-15 mx-15">Furniture Shop</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentProducts.map(product => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white ">
            <img src={product.img_url} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline hover:scale-105 transition duration-300 ease-in-out">View Details</Link>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            {/* <p className="text-gray-500 mb-2">{product.desc}</p> */}
            <p className="text-gray-500 mb-2">Rating:</p>
            <StarRating rating={product.rating} />
            <div className="flex space-x-2 mb-2">
              <span className="block w-6 h-6 rounded-full" style={{ backgroundColor: product.color1 }}></span>
              <span className="block w-6 h-6 rounded-full" style={{ backgroundColor: product.color2 }}></span>
              </div>
              <button
              aria-label={`Add ${product.title} to cart`}
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-black px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded border ${currentPage === index + 1 ? 'bg-blue-500 text-black border-blue-500' : 'bg-pink-200 border-gray-900'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;