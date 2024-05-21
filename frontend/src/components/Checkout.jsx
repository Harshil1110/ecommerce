import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Fetch_products from "./Fetch_products";
const url = "http://localhost:5000";
const Checkout = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const id = localStorage.getItem("id");
  // console.log(id);
  const shippingCharge = 100;
  const [data] = Fetch_products(`${url}/product/allproducts`);
  // console.log(data);
  useEffect(() => {
    axios
      .get(`${url}/product/cart_details/${id}`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log(details);
  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${url}/user/order`, { data, details, totalPrice })
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            alert("Order Place Sucessfully :)");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  };
  // console.log(inputdata);
  const totalPrice = details.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  return (
    <>
      <div className="container-fluid pt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <div className="mb-4">
                <h4 className="font-weight-semi-bold mb-4">Billig Address</h4>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      name="first_name"
                      type="text"
                      {...register("first_name", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="last_name"
                      {...register("last_name", { required: true })}
                    />
                    {errors.last_name && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <input
                      className="form-control"
                      type="text"
                      name="number"
                      {...register("number", { required: true })}
                    />
                    {errors.number && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address</label>
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Country</label>
                    <select
                      className="custom-select"
                      name="country"
                      {...register("country", { required: true })}
                    >
                      <option value="">---Select---</option>
                      <option value="united_states">United States</option>
                      <option value="china">China</option>
                      <option value="india">India</option>
                      <option value="russia">Russia</option>
                      <option value="brazil">Brazil</option>
                      <option value="uk">United Kingdom</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                    </select>
                    {errors.country && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>City</label>
                    <select
                      className="custom-select"
                      name="city"
                      {...register("city", { required: true })}
                    >
                      <option value="">---Select---</option>
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="london">London</option>
                      <option value="paris">Paris</option>
                      <option value="tokyo">Tokyo</option>
                      <option value="sydney">Sydney</option>
                      <option value="mumbai">Mumbai</option>
                    </select>
                    {errors.city && <p className="p">This field is required</p>}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>State</label>
                    <input
                      className="form-control"
                      type="text"
                      name="state"
                      {...register("state", { required: true })}
                    />
                    {errors.state && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Pin Code</label>
                    <input
                      className="form-control"
                      type="text"
                      name="pincode"
                      {...register("pincode", { required: true })}
                    />
                    {errors.pincode && (
                      <p className="p">This field is required</p>
                    )}
                  </div>
                  <div className="col-md-6"></div>
                  {/* <div
                    className="padding-top-20"
                    style={{ marginLeft: 15, marginTop: 10 }}
                  >
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0">
                  <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                </div>
                <div className="card-body">
                  <h5 className="font-weight-medium mb-3">Products</h5>
                  {details.map((detail, index) => {
                    const productName = data.find(
                      (product) => product.id === detail.product_id
                    );
                    return (
                      <div
                        className="d-flex justify-content-between"
                        key={index}
                      >
                        <p>
                          {productName && productName.name} X {detail.quantity}
                        </p>
                        <p>₹ {detail.quantity * detail.price}</p>
                      </div>
                    );
                  })}

                  <hr className="mt-0" />
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
                </div>
              </div>
              <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0">
                  <h4 className="font-weight-semi-bold m-0">Payment</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="paypal"
                        value="paypal"
                        {...register("payment", { required: true })}
                      />
                      <label className="custom-control-label" htmlFor="paypal">
                        Paypal
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="cash"
                        value="cod"
                        {...register("payment", { required: true })}
                      />
                      <label className="custom-control-label" htmlFor="cash">
                        Cash on delivery
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="payment"
                        id="upi"
                        value="upi"
                        {...register("payment", { required: true })}
                      />
                      <label className="custom-control-label" htmlFor="upi">
                        UPI
                      </label>
                    </div>
                  </div>
                  {errors.payment && (
                    <p className="p">This field is required</p>
                  )}
                </div>
                <div className="card-footer border-secondary bg-transparent">
                  <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
