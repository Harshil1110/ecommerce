import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const url = "https://ecommerce-obdg.onrender.com";
const Check_otp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    await axios
      .post(`${url}/user/checkotp`, data)
      .then((res) => {
        if (res.data.success) {
          navigate("/resetpassword");
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
            <h2>Checking Otp</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="password-login">Enter Your Otp here</label>
                <input
                  type="password"
                  name="otp"
                  id="password-login"
                  className="form-control"
                  {...register("otp", { required: true })}
                />
                {errors.otp && <p className="p">This field is required.</p>}
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

export default Check_otp;
