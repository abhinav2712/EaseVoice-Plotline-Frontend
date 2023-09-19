import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      dispatch({ type: "SHOW_LOADING" });
      const response = await axios.post("/api/users/register",values);
      if (response.status === 200) {
        message.success("Registration Successful. Please login.");
        navigate("/login");
      } else {
        message.error("Registration Failed. Please try again.");
      }
    } catch (error) {
      message.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      dispatch({ type: "HIDE_LOADING" });
    }
  };


  return (
    <>
    <div className="register">
      <div className="register-form">
        <h1>EaseVoice</h1>
        <h3><b>Register Page</b></h3>
        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userId"
              label="User ID"
              rules={[
                { required: true, message: "Please enter a user ID" },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: "User ID must contain only letters and numbers",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter a password" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                Already Registered? <Link to="/login">Login Here!</Link>
              </p>
              <Button type="primary" htmlType="submit" disabled={loading}>
                <b>Register</b>
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
    </>
  );
};

export default Register;