import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
       await axios.post("/api/users/login");
      dispatch({ type: "HIDE_LOADING" });
      message.success("user login Succesfully");
      
      navigate("/");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  //currently login  user
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
   <>
   <div className="register">
      <div className="register-form">
        <h3><b>Welcome to EaseVoice</b></h3>
       
          <Form layout="vertical" onFinish={handleSubmit}>
           
            <Form.Item
              name="userId"
              label="User ID"
             
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
            >
              <Input.Password />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                Not Registered? <Link to="/register">Register Here!</Link>
              </p>
           
              <Button type="primary" htmlType="submit">
              <b>Login</b> 
              <br></br>
              </Button>
              
            </div>
          </Form>
       
      </div>
    </div>
   </>
  )
}

export default Login