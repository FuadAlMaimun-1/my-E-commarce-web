import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialProducts } from "../data/product";

export type Product = (typeof initialProducts)[0];

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string, removeAll?: boolean) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const products = initialProducts;

  // Add item into the cart
  
 const addToCart = (product: Product) => {
  // toast.dismiss(); // Ager ongoing toast gulo remove kore dibe jeno stacking error na hoy
  // toast.success("Item Added to Cart", {
  //   autoClose: 1500,
  //   closeOnClick: true,
  //   pauseOnHover: false,
  // });

  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);
    if (existingItem) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

  // Remove Item from cart
  const removeFromCart = (productId: number | string, removeAll = false) => {
    // toast.info("Item Removed From Cart", {
    //   position: "top-right",
    //   autoClose: 1500,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   theme: "dark",
    //   transition: Bounce,
    // });

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (!existingItem) return prevCart;

      if (removeAll || existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      } else {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    // toast.warn("Cart Cleared", {
    //   position: "top-right",
    //   autoClose: 1500,
    //   theme: "dark",
    //   transition: Bounce,
    // });
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        cartTotal,
        cartCount,
      }}
    >
      <ToastContainer autoClose={1500} closeOnClick />
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