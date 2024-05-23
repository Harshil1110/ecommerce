import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const url = "https://ecommerce-obdg.onrender.com";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await axios
        .post(`${url}/user/login`, data)
        .then((res) => {
          const { success, authToken, id } = res.data;
          // console.log(success);
          // console.log(authToken);
          // console.log(id);
          if (success) {
            localStorage.setItem("token", authToken);
            localStorage.setItem("id", id);
            window.location.reload();
            window.location.href = "/";
          }
        })
        .catch((err) => {
          // console.log(err.response.data.error);
          alert(err.response.data.error);
        });
    } catch (error) {
      res.status(404).send(error);
      res.json({ sucess: false });
    }
  };
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-md-6 col-sm-6">
            <h2>Login</h2>
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
                {errors.password && (
                  <p className="p">This field is required.</p>
                )}
              </div>
              <Link to="/forgotpassword">Forgotton Password ?</Link>
              <div className="padding-top-20" style={{ marginTop: 30 }}>
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
