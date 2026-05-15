import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plants = [
  // Air Purifying Plants
  { id: 1, name: 'Peace Lily', price: 12.99, category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=400' },
  { id: 2, name: 'Spider Plant', price: 9.99, category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400' },
  { id: 3, name: 'Snake Plant', price: 14.99, category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400' },
  { id: 4, name: 'Boston Fern', price: 11.99, category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { id: 5, name: 'Aloe Vera', price: 8.99, category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
  { id: 6, name: 'Bamboo Palm', price: 19.99, category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a917be6?w=400' },

  // Low Light Plants
  { id: 7, name: 'Pothos', price: 7.99, category: 'Low Light Plants',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400' },
  { id: 8, name: 'ZZ Plant', price: 15.99, category: 'Low Light Plants',
    image: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?w=400' },
  { id: 9, name: 'Cast Iron Plant', price: 13.99, category: 'Low Light Plants',
    image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400' },
  { id: 10, name: 'Dracaena', price: 16.99, category: 'Low Light Plants',
    image: 'https://images.unsplash.com/photo-1604762512526-b7b0373d4e68?w=400' },
  { id: 11, name: 'Philodendron', price: 11.99, category: 'Low Light Plants',
    image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400' },
  { id: 12, name: 'Chinese Evergreen', price: 10.99, category: 'Low Light Plants',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400' },

  // Tropical Plants
  { id: 13, name: 'Bird of Paradise', price: 29.99, category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=400' },
  { id: 14, name: 'Monstera', price: 24.99, category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400' },
  { id: 15, name: 'Hibiscus', price: 18.99, category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400' },
  { id: 16, name: 'Bromeliad', price: 21.99, category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=400' },
  { id: 17, name: 'Anthurium', price: 22.99, category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400' },
  { id: 18, name: 'Heliconia', price: 26.99, category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400' },
];

const categories = [...new Set(plants.map((p) => p.category))];

function ProductList({ onNavigateCart, onNavigateHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <ul className="navbar-links">
          <li><a href="#" onClick={onNavigateHome}>Home</a></li>
          <li><a href="#">Plants</a></li>
          <li>
            <span className="cart-icon" onClick={onNavigateCart}>
              🛒
              {totalCartCount > 0 && (
                <span className="cart-count">{totalCartCount}</span>
              )}
            </span>
          </li>
        </ul>
      </nav>

      {/* Product Listing */}
      <div className="product-list">
        <h1 style={{ color: '#2E7D32', marginBottom: '30px' }}>
          Our Plants
        </h1>

        {categories.map((category) => (
          <div key={category} className="category">
            <h2>{category}</h2>
            <div className="plants-grid">
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <div key={plant.id} className="plant-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
