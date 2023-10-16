import { Form, Input, Button } from "antd";
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

  const handleLogin = async (email, password) => {
    console.log("data: " + email, password);
    try {
      const response = await login({ email, password });

      if (isError) {
        console.error("Login error:", isError);
        return;
      }

      if (response.data) {
        const { data } = response;

        if (data.success) {
          const accessToken = data.data.accessToken;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }

          //   dispatch(loginSuccess({ user, token: accessToken }));

          route.push("/");
          console.log("login successfull");
        } else {
          console.error("Login failed:", data.message);
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const onSubmit = (data) => {
    // Handle form submission here (data.username and data.password)
    handleLogin(email, password);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
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
