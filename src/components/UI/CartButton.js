import React, { useState } from "react";
import { Button } from "antd";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/redux/features/cartSlice";

const CartButton = () => {
  const [isCartVisible, setCartVisible] = useState(false);
  const cartItems = useSelector(selectCartItems);

  const showCart = () => {
    setCartVisible(true);
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  return (
    <div>
      <Button onClick={showCart}>Open Cart</Button>
      <Cart visible={isCartVisible} onClose={closeCart} cartItems={cartItems} />
    </div>
  );
};

export default CartButton;
