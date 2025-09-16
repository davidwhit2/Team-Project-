import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const STORAGE_KEY = "eztech.cart";

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const hasSubscription = useMemo(
    () => items.some(i => i.type === "subscription"),
    [items]
  );

  const count = useMemo(
    () => items.reduce((n, i) => n + i.qty, 0),
    [items]
  );

  const addItem = useCallback((product, { onWarn } = {}) => {
    if (product.type === "subscription") {
      const already = items.find(i => i.type === "subscription");
      if (already) {
        onWarn?.("Only one subscription can be added at a time.");
        return false;
      }
    }
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    return true;
  }, [items]);

  const updateQty = useCallback((id, qty) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const value = { items, count, total, hasSubscription, addItem, updateQty, removeItem, clear };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
