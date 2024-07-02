'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCart } from '../../../lib/createCart';
import createCheckout from '../../../lib/createCheckout';

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
  checkout: () => Promise<string>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const addToCart = async (item: CartItem) => {
    let updatedCart: Cart;

    if (!cart) {
      const newCart = await createCart([item]);
      updatedCart = { ...newCart, items: [item] };
    } else {
      updatedCart = { ...cart, items: [...cart.items] };

      const existingItemIndex = updatedCart.items.findIndex(
        (cartItem) => cartItem.variantId === item.variantId,
      );

      if (existingItemIndex !== -1) {
        updatedCart.items[existingItemIndex].quantity += item.quantity;
      } else {
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

  const checkout = async (): Promise<string> => {
    if (!cart) throw new Error('Cart is empty');

    const lineItems = cart.items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    try {
      const checkoutUrl = await createCheckout(lineItems);
      return checkoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
      throw new Error('Checkout failed, please try again.');
    }
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
        checkout,
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
