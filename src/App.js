import { Layout, Typography } from "antd";
import { useState } from "react";
import FoodList from "./components/FoodList";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";

const { Header, Content } = Layout;
const { Title } = Typography;

// Main application component
function App() {
  // State to track user authentication status
  const [authed, setAuthed] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header section with title and action buttons */}
      <Header>
        <div className="header" style={{ display: "flex", justifyContent: "space-between" }}>
          <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >
            Jun's Restaurant
          </Title>
          {/* Show cart if logged in, otherwise show signup button */}
          <div>{authed ? <MyCart /> : <SignupForm />}</div>
        </div>
      </Header>
      {/* Main content area */}
      <Content
        style={{
          padding: "50px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      >
        {/* Show food list if logged in, otherwise show login form */}
        {authed ? (
          <FoodList />
        ) : (
          <LoginForm onSuccess={() => setAuthed(true)} />
        )}
      </Content>
    </Layout>
  );
}

export default App;