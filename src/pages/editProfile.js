import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import RootLayout from "@/components/Layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, setUserInfo } from "@/redux/features/userSlice";
import { useUpdateUserMutation } from "@/redux/api/api";
import { useRouter } from "next/router";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const handleSave = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await updateUser(values);
      console.log("uid: " + values._id);

      if (isError) {
        console.error("Update error:", isError);
        return;
      }

      if (response.data) {
        const { data } = response;

        if (data.success) {
          dispatch(setUserInfo(data.data));
          message.success("Profile updated successful!");
          route.push("/");
        } else {
          console.error("profile update failed:", data.message);
        }
      }
    } catch (error) {
      console.error("An error occurred during profile update:", error);
    }
  };

  if (userInfo) {
    return (
      <RootLayout>
        <div
          style={{
            height: "100vh",
          }}
        >
          <Card title="Edit Profile">
            <Form form={form} onFinish={handleSave} initialValues={userInfo}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="id" name="_id" style={{ display: "none" }}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </RootLayout>
    );
  } else {
    return <div>User information not available.</div>;
  }
};

export default EditProfile;
