import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils";

// Signup form component with modal
class SignupForm extends React.Component {
  // Component state to control modal visibility
  state = {
    displayModal: false,
  };

  // Close the signup modal
  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  // Open the signup modal
  signupOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  // Handle form submission
  onFinish = (data) => {
    signup(data)
      .then(() => {
        // Close modal and show success message
        this.setState({
          displayModal: false,
        });
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render = () => {
    return (
      <>
        {/* Register button to open modal */}
        <Button shape="round" type="primary" onClick={this.signupOnClick}>
          Register
        </Button>
        {/* Signup modal with form */}
        <Modal
          title="Register"
          open={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
            {/* Email input field */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            {/* Password input field */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            {/* First name input field */}
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="firstname" />
            </Form.Item>
            {/* Last name input field */}
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="lastname" />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default SignupForm;

