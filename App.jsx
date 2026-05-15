import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div>
      {currentPage === 'landing' && (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button
            className="get-started-btn"
            onClick={() => setCurrentPage('products')}
          >
            Get Started
          </button>
        </div>
      )}

      {currentPage === 'products' && (
        <ProductList
          onNavigateCart={() => setCurrentPage('cart')}
          onNavigateHome={() => setCurrentPage('landing')}
        />
      )}

      {currentPage === 'cart' && (
        <CartItem
          onNavigateProducts={() => setCurrentPage('products')}
          onNavigateHome={() => setCurrentPage('landing')}
        />
      )}
    </div>
  );
}

export default App;
