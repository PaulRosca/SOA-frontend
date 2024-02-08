import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Cart, CarContextProps } from "../types";


export const CartContext = createContext<CarContextProps>({
  cart: [],
  setCart: () => {}
});

function getInitialState() {
  const localCart = localStorage.getItem("cart");
  const cart = localCart ? JSON.parse(localCart) : [];
  return cart;
}

export const CartProvider = ({ children }: PropsWithChildren<React.ReactNode>) => {
  const [cart, setCart] = useState<Cart>(getInitialState());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );

};
