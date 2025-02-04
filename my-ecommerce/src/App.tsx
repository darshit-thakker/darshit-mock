import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
// import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetail from './components/ProductDetails';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/Checkout';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;