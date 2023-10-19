// Cart.js
import React from "react";
import { Modal, List, Button, Row, Col, Form } from "antd";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/features/cartSlice";

const Cart = ({ visible, cartItems, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const onFinish = (values) => {
    console.log("Selected items:", cartItems);
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
      {/* <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              {item.title} - ${item.price}
            </div>
            <div>
              <Button onClick={() => handleRemoveFromCart(item)}>Remove</Button>
            </div>
          </List.Item>
        )}
      /> */}
      <Form form={form} onFinish={onFinish}>
        <List
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {item.title} - ${item.price}
              </div>
              <div>
                <Button onClick={() => handleRemoveFromCart(item)}>
                  Remove
                </Button>
              </div>
            </List.Item>
          )}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Book Now
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Cart;
