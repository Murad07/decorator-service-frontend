import React from "react";
import { Spin, Card, Descriptions } from "antd";
import { useGetUserProfileQuery } from "@/redux/api/api";
import RootLayout from "@/components/Layouts/RootLayout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, setUserInfo } from "@/redux/features/userSlice";
import { useState } from "react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { data, isLoading, isError } = useGetUserProfileQuery();
  const [userData, setUserData] = useState(userInfo);

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

  if (!userInfo) {
    dispatch(setUserInfo(data.data));
    setUserData(data.data);
  }

  return (
    <RootLayout>
      <div
        style={{
          height: "100vh",
        }}
      >
        <Card title="User Profile">
          <Descriptions layout="vertical">
            <Descriptions.Item label="Name">{userData.name}</Descriptions.Item>
            <Descriptions.Item label="Email">
              {userData.email}
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
