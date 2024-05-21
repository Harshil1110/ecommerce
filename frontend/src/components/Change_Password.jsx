import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const url = "http://localhost:5000";
const id = localStorage.getItem("id");
console.log(id);
const Change_Password = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);

    if (data.password == data.cpassword) {
      await axios
        .put(`${url}/user/changepassword/${id}`, data)
        .then((res) => {
          if (res.data.success) {
            alert("Password change successfully :)");
            navigate("/login");
          } else {
            alert(res.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
          // alert(err.response.data.error);
        });
    } else {
      alert("Password Mismatch.");
    }
  };
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-md-6 col-sm-6">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="oldpassword">Old Password</label>
                <input
                  type="password"
                  name="oldpassword"
                  id="oldpassword"
                  className="form-control"
                  autoComplete="new-password"
                  {...register("oldpassword", { required: true })}
                />
                {errors.oldpassword && (
                  <p className="p">This field is required.</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password-login">New Password</label>
                <input
                  type="password"
                  name="password"
                  id="password-login"
                  className="form-control"
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="p">This field is required.</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="form-control"
                  {...register("cpassword", {
                    required: true,
                  })}
                />
                {errors.cpassword && (
                  <p className="p">{errors.cpassword.message}</p>
                )}
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

export default Change_Password;
