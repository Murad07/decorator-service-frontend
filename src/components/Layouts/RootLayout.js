import React from "react";
import Head from "next/head";
import { Button, Layout, Menu } from "antd";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const RootLayout = ({ children }) => {
  const { data: session } = useSession();

  const menuItems = [
    { key: "1", label: "Home", link: "/" },
    { key: "2", label: "Categories", link: "/two", subMenu: true },
    { key: "3", label: "Decorator Service", link: "/pcBuilder" },
  ];

  const categorySubItems = [
    { key: "1", label: "CPU / Processor", link: "/categories/1" },
    { key: "2", label: "Motherboard", link: "/categories/2" },
    { key: "3", label: "RAM", link: "/categories/3" },
    {
      key: "4",
      label: "Power Supply Unit",
      link: "/categories/5",
    },
    { key: "5", label: "Storage Device", link: "/categories/6" },
    { key: "6", label: "Monitor", link: "/categories/4" },
    { key: "7", label: "Others", link: "/categories/7" },
  ];

  const isLogedIn =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : false;
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  };

  return (
    <>
      <Head>
        <title>Decorator Service</title>
      </Head>
      {/* <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={menuItems.map((item) => {
              if (item.subMenu && item.key == 2) {
                return {
                  key: item.key,
                  label: item.label,
                  children:
                    item.key === "2"
                      ? categorySubItems.map((subItem) => ({
                          key: `${item.key}-${subItem.key}`,
                          label: (
                            <Link href={subItem.link}>{subItem.label}</Link>
                          ),
                        }))
                      : [
                          {
                            key: `${item.key}-1`,
                            label: (
                              <a
                                href={`${item.link}`}
                                rel="noopener noreferrer"
                              >
                                Sub-Menu 1
                              </a>
                            ),
                          },
                        ],
                };
              } else {
                return {
                  key: item.key,
                  label: <Link href={`${item.link}`}>{item.label}</Link>,
                };
              }
            })}
          />
          {session?.user ? (
            <Button type="primary" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Button type="primary" onClick={() => signIn()}>
              Login
            </Button>
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            flex: "1 0 auto",
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <h3>Decorator Service ©2023 Created by murad.pi22 </h3>
          <p>Lakhirchar, Keranigonj, Dhaka-1310</p>
        </Footer>
      </Layout> */}

      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="vertical">
            <Menu.Item key="dashboard">
              <Link href="/dashboard">Dashboard</Link>
            </Menu.Item>
            {isLogedIn ? (
              <Menu.Item key="logout" onClick={handleLogout}>
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="login">
                <Link href="/auth/login">Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              // background: colorBgContainer,
              color: "white",
            }}
          >
            <div style={{ marginLeft: 10 }}>Decorator Service</div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              flex: "1 0 auto",
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <h3>Decorator Service ©2023 Created by murad.pi22 </h3>
            <p>Lakhirchar, Keranigonj, Dhaka-1310</p>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default RootLayout;
