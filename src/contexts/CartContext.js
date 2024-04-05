import React, { createContext, useMemo, useState } from 'react';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex((product) => product.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const getTotalNumber = () => {
    return cart.length;
  };

  const resetCart = () => {
    setCart([]);
  };

  const cartContext = useMemo(
    () => ({ cart, addToCart, removeFromCart, resetCart, getTotalNumber }),
    [cart, removeFromCart, resetCart, getTotalNumber]
  );

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export const CartContext = createContext();
