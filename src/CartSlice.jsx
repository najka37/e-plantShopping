import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  },

  reducers: {
    // Add a plant to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Check whether this plant is already in the cart
      const existingItem = state.items.find(
        (item) => item.name === name
      );

      if (existingItem) {
        // If it already exists, increase quantity
        existingItem.quantity++;
      } else {
        // Otherwise add it with quantity 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // Remove a plant completely from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    // Update the quantity of a plant
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const itemToUpdate = state.items.find(
        (item) => item.name === name
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export action creators
export const {
  addItem,
  removeItem,
  updateQuantity,
} = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;