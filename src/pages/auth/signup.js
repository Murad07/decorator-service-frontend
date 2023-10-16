import RootLayout from "@/components/Layouts/RootLayout";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <RootLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          <SignupForm />
        </div>
      </div>
    </RootLayout>
  );
};

export default SignupPage;
