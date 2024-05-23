import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const url = "https://ecommerce-obdg.onrender.com";
const Editprofile = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [users, setusers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios
        .put(`${url}/user/editprofile/${id}`, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            alert("Profile updated Sucessfully :)");
            navigate("/");
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
  useEffect(() => {
    axios
      .get(`${url}/user/editprofile/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        // console.log(error);
        setusers(res.data);
        // console.log(res.data.error);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }, []);
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-12">
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Edit your profile</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                {users.map((user) => (
                  <div className="row" key={user.id}>
                    <div className="col-md-6 form-group">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        name="first_name"
                        type="text"
                        defaultValue={user.first_name}
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
                        defaultValue={user.last_name}
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
                        defaultValue={user.email}
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
                        defaultValue={user.phone}
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
                        defaultValue={user.address}
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
                        defaultValue={user.country}
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
                        defaultValue={user.city}
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
                      {errors.city && (
                        <p className="p">This field is required</p>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <label>State</label>
                      <input
                        className="form-control"
                        type="text"
                        name="state"
                        defaultValue={user.state}
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
                        defaultValue={user.pincode}
                        {...register("pincode", { required: true })}
                      />
                      {errors.pincode && (
                        <p className="p">This field is required</p>
                      )}
                    </div>
                    <div className="col-md-6"></div>
                    <div
                      className="padding-top-20"
                      style={{ marginLeft: 15, marginTop: 10 }}
                    >
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                ))}
              </form>
              <p className="subText" style={{ marginTop: "20px" }}>
                Reset Password ? {""}
                <Link to="/changepassword"> Click Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
