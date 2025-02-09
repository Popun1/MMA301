import { createContext, useState, useContext, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Dùng string thay vì require()
}

interface CartContextType {
  cart: Record<string, number>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => string;
  products: Product[]; // Đưa products vào context
}

export const products: Product[] = [ // Export products
    { id: "1", name: "Noodles Ramen", price: 5.35, image: require("../../assets/images/ramen.webp") },
    { id: "2", name: "Dumplings", price: 3.27, image: require("../../assets/images/dumbling.webp") },
    { id: "3", name: "Pizza Sicilia", price: 6.50, image: require("../../assets/images/pizza.webp") },
    { id: "4", name: "Beef Burger", price: 4.21, image: require("../../assets/images/burger.webp") },
  ];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (id: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      if (!prevCart[id]) return prevCart;
      const updatedCart = { ...prevCart, [id]: prevCart[id] - 1 };
      if (updatedCart[id] <= 0) delete updatedCart[id];
      return updatedCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.keys(cart).reduce((total: number, id: string) => {
      const product = products.find((p) => p.id === id);
      return total + (product ? product.price * cart[id] : 0);
    }, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, products }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

