import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuantity,
  removeItem,
} from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  // Calculate total cost of all items
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const cost = parseFloat(
        String(item.cost).replace('$', '')
      );

      total += cost * item.quantity;
    });

    return total.toFixed(2);
  };

  // Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(
      String(item.cost).replace('$', '')
    );

    return (cost * item.quantity).toFixed(2);
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Checkout
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <button
            className="continue-shopping"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.name}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>

                  <p>
                    Unit Cost: {item.cost}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Subtotal: $
                    {calculateTotalCost(item)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleDecrement(item)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        handleIncrement(item)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleRemove(item)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>
              Total: ${calculateTotalAmount()}
            </h2>

            <div className="cart-buttons">
              <button
                className="continue-shopping"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>

              <button
                className="checkout-button"
                onClick={handleCheckoutShopping}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;