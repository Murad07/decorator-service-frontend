import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/api";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const [login, { isLoading, isError }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const { data, error } = await login({ email, password });

      if (error) {
        message.error("Something Wrong!");
        console.error("Login error:", error);
        return;
      }

      if (data.success) {
        message.success("Login successful!");
        const accessToken = data.data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        route.push("/");
      } else {
        message.error("Login failed:", data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      message.error("An error occurred during login");
    }
  };

  // const onSubmit = (data) => {
  //   // Handle form submission here (data.username and data.password)
  //   handleLogin(email, password);
  // };

  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name="email" // Make sure the name matches the form data structure
        rules={[
          { required: true, message: "Please enter your email address" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          {...register("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password" // Make sure the name matches the form data structure
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          {...register("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
