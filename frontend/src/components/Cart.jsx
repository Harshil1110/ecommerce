import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const url = "https://ecommerce-obdg.onrender.com";
const Cart = () => {
  const [details, setDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const id = localStorage.getItem("id");
  const shippingCharge = 100;
  useEffect(() => {
    axios
      .get(`${url}/product/cart_details/${id}`)
      .then((res) => {
        // console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${url}/product/allproducts`)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function reducer(state, action) {
    // console.log(state);
    // console.log(action.type);
    switch (action.type) {
      case "ADD":
        return state < stock ? state + 1 : state;
      case "SUB":
        return state > 1 ? state - 1 : state;
      case "SET":
        return action.payload >= 0 && action.payload <= stock
          ? action.payload
          : state;
      default:
        return state;
    }
  }
  const handleRemove = async (product_id) => {
    try {
      await axios
        .delete(`${url}/product/delete_item/${id}`, { data: { product_id } })
        .then((res) => {
          const { success } = res.data;
          if (success) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(productName && productName.name);
  const totalPrice = details.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  // console.log(totalPrice);
  return (
    <div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          {details.length > 0 ? (
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-bordered text-center mb-0">
                <thead className="bg-secondary text-dark">
                  <tr>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {details.map((details, index) => {
                    const productName = products.find(
                      (product) => product.id === details.product_id
                    );
                    return (
                      <tr key={index}>
                        <td className="align-middle">
                          <img
                            src={productName && productName.image_url}
                            alt="image"
                            style={{
                              objectFit: "contain",
                              // height: "80px",
                              width: "70px",
                            }}
                          />
                        </td>
                        <td className="align-middle">
                          <p
                            style={{
                              color: "#d19c97",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            {productName && productName.name}
                          </p>
                          <span>{`item ${++index} - Color: ${details.color.toUpperCase()}, Size: ${details.size.toUpperCase()}`}</span>
                        </td>
                        <td className="align-middle"> ₹ {details.price}</td>
                        <td className="align-middle">
                          <div
                            className="input-group quantity mx-auto"
                            style={{ width: 100 }}
                          >
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-primary btn-minus"
                                type="button"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm bg-secondary text-center"
                              defaultValue={details.quantity}
                            />
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-primary btn-plus"
                                type="button"
                              >
                                <i className="fa fa-plus" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          ₹ {details.quantity * details.price}
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn btn-sm btn-primary"
                            type="button"
                            onClick={() => handleRemove(details.product_id)}
                          >
                            <i className="fa fa-times" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="col-lg-8 table-responsive mb-5">
              <h4>Your Shopping cart is empty!</h4>
            </div>
          )}
          {details.length > 0 && (
            <div className="col-lg-4">
              <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0">
                  <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <h6 className="font-weight-medium">Subtotal</h6>
                    <h6 className="font-weight-medium">₹ {totalPrice}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">₹ {shippingCharge}</h6>
                  </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                  <div className="d-flex justify-content-between mt-2">
                    <h5 className="font-weight-bold">Total</h5>
                    <h5 className="font-weight-bold">
                      ₹{totalPrice + shippingCharge}
                    </h5>
                  </div>

                  <Link to="/checkout">
                    <button className="btn btn-block btn-primary my-3 py-3">
                      Proceed To Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
