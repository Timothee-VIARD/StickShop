import React, { createContext, useEffect, useMemo, useState } from 'react';

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'euro');

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const getCurrency = () => {
    return currency || 'euro';
  };

  const updateCurrency = (currency) => {
    setCurrency(currency);
  };

  const currencyContext = useMemo(() => ({ getCurrency, updateCurrency }), [getCurrency, updateCurrency]);

  return <CurrencyContext.Provider value={currencyContext}>{children}</CurrencyContext.Provider>;
};

export const CurrencyContext = createContext();
