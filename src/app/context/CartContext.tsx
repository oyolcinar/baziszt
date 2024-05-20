'use client';
import React, { createContext, useContext, useState } from 'react';
import { createCart } from '../../../lib/createCart';

interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  image: string;
  price: string;
  size: string;
  currency: string;
  color: string;
}

interface Cart {
  id: string;
  webUrl: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  menuOpened: boolean;
  addToCart: (item: CartItem) => Promise<void>;
  incrementItem: (variantId: string, size: string) => void;
  decrementItem: (variantId: string, size: string) => void;
  removeItem: (variantId: string, size: string) => void;
  clearCart: () => void;
  toggleCartMenu: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [menuOpened, setMenuOpened] = useState(false);

  const addToCart = async (item: CartItem) => {
    let updatedCart: Cart;

    if (!cart) {
      const newCart = await createCart([item]);
      updatedCart = { ...newCart, items: [item] };
    } else {
      // Clone the cart to avoid direct state mutation
      updatedCart = { ...cart, items: [...cart.items] };

      // Check if the item already exists in the cart
      const existingItemIndex = updatedCart.items.findIndex(
        (cartItem) => cartItem.variantId === item.variantId,
      );

      if (existingItemIndex !== -1) {
        // Increase the quantity of the existing item
        updatedCart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Add the new item to the cart
        updatedCart.items.push(item);
      }
    }

    setCart(updatedCart);
    setMenuOpened(true);
  };

  const incrementItem = (variantId: string, size: string) => {
    if (!cart) return;

    const updatedCart = { ...cart, items: [...cart.items] };
    const itemIndex = updatedCart.items.findIndex(
      (cartItem) => cartItem.variantId === variantId && cartItem.size === size,
    );

    if (itemIndex !== -1) {
      updatedCart.items[itemIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  const decrementItem = (variantId: string, size: string) => {
    if (!cart) return;

    const updatedCart = { ...cart, items: [...cart.items] };
    const itemIndex = updatedCart.items.findIndex(
      (cartItem) => cartItem.variantId === variantId && cartItem.size === size,
    );

    if (itemIndex !== -1) {
      if (updatedCart.items[itemIndex].quantity > 1) {
        updatedCart.items[itemIndex].quantity -= 1;
      } else {
        updatedCart.items.splice(itemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const removeItem = (variantId: string, size: string) => {
    if (!cart) return;

    const updatedCart = { ...cart, items: [...cart.items] };
    updatedCart.items = updatedCart.items.filter(
      (cartItem) =>
        !(cartItem.variantId === variantId && cartItem.size === size),
    );

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart(null);
  };

  const toggleCartMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        menuOpened,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        toggleCartMenu,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
