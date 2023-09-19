import React ,{useState,useEffect} from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";

import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Button.css";
import { Table ,Button, Modal, message, Form, Input, Select} from "antd";
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const { cartItems } = useSelector((state) => state.rootReducer);
  

  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  
  const handleEmptyCart = () => {
    dispatch({
      type: "EMPTY_CART",
    });
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);


  // Calculate tax for each item:

  const calculateTax = (item) => {
    const isProduct = item.category === "product"; 
    if (isProduct) {
      if (item.price > 1000 && item.price <= 5000) {
        return (item.price * 0.12).toFixed(2); // Tax PA
      } else if (item.price > 5000) {
        return (item.price * 0.18).toFixed(2); // Tax PB
      } else {
        return item.price-200; // TAX PC
      }
    } else {
      if (item.price > 1000 && item.price <= 8000) {
        return (item.price * 0.10) // Tax SA
      } else if (item.price > 8000) {
        return (item.price * 0.15).toFixed(2); // Tax SB
      } else {
        return  item.price-100; // TAX SC
      }
    }
  };

  // Table columns:

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncreament(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecreament(record)}
          />
        </div>
      ),
    },
    {
      title: "Tax",
      dataIndex: "price",
      render: (price, record) => calculateTax(record),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];





  const handleSubmit = async (value) => {
   
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(calculateTotalTax()),
        totalAmount: Number(calculateGrandTotal()),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
       
      };
      console.log(newObject);
      // await axios.post("/api/bills/add-bills", newObject);
      // message.success("Bill Generated");
      // navigate("/bills");
    
  };

  const calculateTotalTax = () => {
    let totalTax = 0;
  
    // Iterate through cart items and calculate tax for each item
    cartItems.forEach((item) => {
      const tax = calculateTax(item); 
      totalTax += parseFloat(tax);
    });
  
    return totalTax.toFixed(2);
  };

  const calculateGrandTotal = () => {
    const totalTax = parseFloat(calculateTotalTax());
    return (subTotal + totalTax).toFixed(2);
  };


  return (
    <DefaultLayout>
      <h1>Your Cart </h1>
      <Button type="danger" onClick={handleEmptyCart} className="empty-cart-button">
      Clear Cart
    </Button>
      <Table columns={columns} dataSource={cartItems} bordered />
      
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUB TOTAL : ₹ <b> {subTotal}</b> /-{" "}
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
         <Form
            layout="vertical"
            
            onFinish={handleSubmit}
          >
            <Form.Item name="customerName" label="Customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="customerContact" label="Contact">
              <Input />
            </Form.Item>
          
            <Form.Item name="payementMode" label="Payment Method">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
               
              </Select>
            </Form.Item>
            <div className="bill-it">
            <h5>
              Sub Total : {" "}<b>{subTotal}</b>
            </h5>
            <h4>
              TAX : {" "}
             
              <b>
              {calculateTotalTax()}
              </b>
              
            </h4>
            <h4>
              TOTAL BILL :{" "}
              <b>
                
                
           {calculateGrandTotal()}
              </b>
              
            </h4>
          </div>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
               Place Order
              </Button>
            </div>
          </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;