import React from "react";
import { Form, Input, Button } from "antd";
import { useSignupMutation } from "@/redux/api/api";

const SignupForm = () => {
  const [signup, { isLoading, isError }] = useSignupMutation();

  const onFinish = async (values) => {
    console.log("Received values:", values);

    try {
      const response = await signup(values);

      if (isError) {
        console.error("Signup error:", isError);
        return;
      }

      if (response.data) {
        const { data } = response;

        if (data.success) {
          route.push("/");
        } else {
          console.error("signup failed:", data.message);
        }
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  return (
    <Form name="signup" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
