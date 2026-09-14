import { createContext, useContext } from "react";
import React from "react";
import { initialProducts } from "../data/product";

const CartContext = createContext<{ products: typeof initialProducts } | null>(null);

export const CartProvider = ( props:any) => {
  const products = initialProducts;

  return (
    <CartContext.Provider value={{ products }}>
      {props.children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
