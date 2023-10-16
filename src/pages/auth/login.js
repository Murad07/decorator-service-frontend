import RootLayout from "@/components/Layouts/RootLayout";
import Login from "@/components/auth/Login";

const LoginPage = () => {
  return (
    // <RootLayout>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Login />
    </div>
    // {/* </RootLayout> */}
  );
};

export default LoginPage;
