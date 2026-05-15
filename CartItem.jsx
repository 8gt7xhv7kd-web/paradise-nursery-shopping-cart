import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onNavigateProducts, onNavigateHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <ul className="navbar-links">
          <li><a href="#" onClick={onNavigateHome}>Home</a></li>
          <li><a href="#" onClick={onNavigateProducts}>Plants</a></li>
          <li>
            <span className="cart-icon">
              🛒
              {totalCartCount > 0 && (
                <span className="cart-count">{totalCartCount}</span>
              )}
            </span>
          </li>
        </ul>
      </nav>

      {/* Cart Page */}
      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ fontSize: '1.2rem' }}>Your cart is empty.</p>
            <button
              className="continue-btn"
              style={{ marginTop: '20px' }}
              onClick={onNavigateProducts}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Total: ${totalCost.toFixed(2)}</h2>
              <button
                className="continue-btn"
                onClick={onNavigateProducts}
              >
                Continue Shopping
              </button>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
