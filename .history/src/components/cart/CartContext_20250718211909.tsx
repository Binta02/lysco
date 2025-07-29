import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Charger le panier au lancement
  useEffect(() => {
    const loadCart = async () => {
      try {
        const saved = await AsyncStorage.getItem("lysco-cart");
        if (saved) {
          setItems(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Erreur de chargement du panier:", error);
      }
    };
    loadCart();
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("lysco-cart", JSON.stringify(items));
      } catch (error) {
        console.error("Erreur de sauvegarde du panier:", error);
      }
    };
    saveCart();
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = async () => {
    setItems([]);
    try {
      await AsyncStorage.removeItem("lysco-cart");
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        subtotal,
        tax,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
