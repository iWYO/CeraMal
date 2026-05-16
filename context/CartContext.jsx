"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);

  const totalForints = items.reduce(
    (sum, it) => sum + it.product.price * it.quantity,
    0,
  );

  function addToCart(product, quantity = 1) {
    const qty = Math.max(1, Number(quantity) || 1);
    setItems((prev) => {
      const i = prev.findIndex((it) => it.product.id === product.id);
      if (i === -1) {
        return [
          ...prev,
          {
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            },
            quantity: qty,
          },
        ];
      }
      const next = [...prev];
      next[i] = { ...next[i], quantity: next[i].quantity + qty };
      return next;
    });
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((it) => it.product.id !== productId));
  }

  function setQuantity(productId, quantity) {
    const qty = Math.max(1, Number(quantity) || 1);
    setItems((prev) =>
      prev.map((it) =>
        it.product.id === productId ? { ...it, quantity: qty } : it,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalForints,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
