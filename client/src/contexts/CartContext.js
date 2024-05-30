import React, { createContext, useContext, useMemo, useState } from 'react';
import { numberRound } from '../utils/global/Numbers';
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from './CurrencyContext';

export const CartProvider = ({ children }) => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const { getCurrency } = useContext(CurrencyContext);

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

  const getTotalPrice = () => {
    return numberRound(cart.reduce((acc, product) => acc + product.price, 0));
  };

  const resetCart = () => {
    setCart([]);
  };

  const resetDocumentTitle = () => {
    document.title = `${t('shop.shopCart.title')} - ${getTotalPrice()} ${t(`parameters.currency.${getCurrency()}`)}`;
  };

  const cartContext = useMemo(
    () => ({ cart, addToCart, removeFromCart, resetCart, getTotalNumber, getTotalPrice, resetDocumentTitle }),
    [cart, addToCart, removeFromCart, resetCart, getTotalNumber, getTotalPrice, resetDocumentTitle]
  );

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export const CartContext = createContext();
