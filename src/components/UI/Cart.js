// Cart.js
import React from "react";
import { Modal, List, Button } from "antd";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/features/cartSlice";

const Cart = ({ visible, cartItems, onClose }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    // Dispatch the removeFromCart action with the item to remove from the cart
    dispatch(removeFromCart(item));
  };

  return (
    <Modal
      title="Shopping Cart"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            {item.title} - ${item.price}
            <Button onClick={() => handleRemoveFromCart(item)}>
              Remove from Cart
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default Cart;
