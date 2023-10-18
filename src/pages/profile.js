import React from "react";
import { Spin, Card, Descriptions } from "antd";
import { useGetUserProfileQuery } from "@/redux/api/api";
import RootLayout from "@/components/Layouts/RootLayout";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/features/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetUserProfileQuery();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading profile information.</div>;
  }

  dispatch(setUserInfo(data.data));

  return (
    <RootLayout>
      <div
        style={{
          height: "100vh",
        }}
      >
        <Card title="User Profile">
          <Descriptions layout="vertical">
            <Descriptions.Item label="Name">{data.data.name}</Descriptions.Item>
            <Descriptions.Item label="Email">
              {data.data.email}
            </Descriptions.Item>
            {/* Add more profile fields as needed */}
          </Descriptions>

          <Link href="/editProfile">Edit Profile</Link>
        </Card>
      </div>
    </RootLayout>
  );
};

export default UserProfile;
