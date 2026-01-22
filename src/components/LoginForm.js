import { Button, Form, Input, message } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

// Login form component
class LoginForm extends React.Component {
  // Component state to track loading status
  state = {
    loading: false,
  };

  // Handle form submission
  onFinish = (data) => {
    this.setState({
      loading: true,
    });
    login(data)
      .then(() => {
        // Show success message and trigger parent callback
        message.success(`Login Successful`);
        this.props.onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render = () => {
    return (
      <Form
        name="normal_login"
        onFinish={this.onFinish}
        style={{
          width: 300,
          margin: "auto",
        }}
      >
        {/* Username input field */}
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        {/* Password input field */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  };
}

export default LoginForm;

