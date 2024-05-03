import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const url = "http://localhost:5000";
const Resetpassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);

    await axios
      .put(`${url}/user/resetpassword`, data)
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.error);
      });
  };
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-md-6 col-sm-6">
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="text"
                  id="email-login"
                  className="form-control"
                  name="email"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="p">This field is required.</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password-login">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password-login"
                  className="form-control"
                  {...register("password", { required: true })}
                />
                {errors.password && <p className="p">This field is required.</p>}
              </div>
              <div className="padding-top-20" style={{ marginTop: 30 }}>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
