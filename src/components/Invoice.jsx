import React from "react";
import "./invoice.css";
const Invoice = ({ od, cd }) => {
  console.log(od, cd);
  return (
    <>
      <div className="invoice">
        <div className="header">
          <h1>Invoice</h1>
        </div>
        <div className="details">
          <div className="customer-info">
            <h2>Customer Information</h2>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            <p>Address: 123 Main Street, Cityville</p>
          </div>
          <div className="order-info">
            <h2>Order Information</h2>
            <p>Invoice #: INV123456</p>
            <p>Date: January 1, 2024</p>
          </div>
        </div>
        <div className="items">
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>T-Shirt</td>
                <td>2</td>
                <td>$20.00</td>
              </tr>
              <tr>
                <td>Jeans</td>
                <td>1</td>
                <td>$50.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="total">
          <h2>Total: $90.00</h2>
        </div>
      </div>
    </>
  );
};

export default Invoice;
