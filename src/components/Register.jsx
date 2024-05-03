import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
const url = "http://localhost:5000";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${url}/user/register`, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            alert("Registration Sucessfully :)");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(inputdata);
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-12">
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Register Your Self</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <div className="col-md-6 form-group">
                    <label htmlFor="password-login">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password-login"
                      className="form-control"
                      {...register("password", { required: true })}
                    />
                    {errors.email && (
                      <p className="p">This field is required.</p>
                    )}
                  </div>
                  <div className="col-md-6"></div>
                  <div
                    className="padding-top-20"
                    style={{ marginLeft: 15, marginTop: 10 }}
                  >
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
