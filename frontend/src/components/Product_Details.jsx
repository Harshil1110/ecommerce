import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { useParams, useNavigate } from "react-router-dom";
const url = "https://ecommerce-obdg.onrender.com";
import { useForm } from "react-hook-form";
import Ratings from "./Ratings";

const Product_Details = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [csdetails, setcsDetails] = useState([]);
  const [stock, setStock] = useState(1);
  const { id } = useParams();
  const user_id = localStorage.getItem("id");
  const [rating, setRating] = useState(0);
  const [allratings, setAllRating] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  // get particular product detail
  useEffect(() => {
    axios
      .get(`${url}/product/product_details/${id}`)
      .then((res) => {
        // console.log(res.data.pd);
        // console.log(res.data.cs);
        setDetails(res.data.pd);
        setcsDetails(res.data.cs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  //to display available color and sizes
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (size !== "" || color !== "") {
        await axios
          .post(`${url}/product/details`, { size, color, id })
          .then((res) => {
            if (res.data.length > 0) {
              const { quantity } = res.data[0];
              console.log(quantity);
              setStock(quantity);
            } else {
              setStock(0);
              // console.log(stock);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [size, color, id]);

  const colorsArray = csdetails.map((item) => item.colors_name);
  const sizesArray = csdetails.map((item) => item.sizes_name);
  // console.log(colorsArray);
  // console.log(sizesArray);
  const [state, dispatch] = useReducer(reducer, 1);

  //add to cart function
  const handleSubmitt = (e) => {
    e.preventDefault();
    // console.log(`${size} ${color} ${state}`);
    try {
      axios
        .post(`${url}/product/addtocart`, {
          size,
          color,
          quantity: state,
          product_id: id,
          user_id: user_id,
          price: details[0].price,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            navigate("/cart");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //add review of product
  const onSubmit = async (data) => {
    // console.log(`${rating} ${data.message} ${data.name}`);
    try {
      await axios
        .post(`${url}/product/rating/${id}`, { rating, data })
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            alert("Feedback gave successfully :)");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //fetch all the reviews
  useEffect(() => {
    axios
      .get(`${url}/product/ratings`)
      .then((res) => {
        // console.log(res.data);
        setAllRating(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const filteredRating = allratings.filter(
    (ratings) => ratings.product_id == id
  );
  let averageRating = 0;
  if (filteredRating.length > 0) {
    const totalRating = filteredRating.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    averageRating = totalRating / filteredRating.length;
  }
  // console.log(averageRating.toFixed(1));
  return (
    <>
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Product Detail
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="#">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Product Detail</p>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        {details.map((product) => (
          <div key={product.id}>
            <div className="row px-xl-5">
              <div className="col-lg-5 pb-5">
                <div className="carousel-inner border">
                  <div className="carousel-item active">
                    <img
                      src={product.image_url}
                      alt="Image"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "500px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 pb-5">
                <h3 className="font-weight-semi-bold">{product.name}</h3>
                <Ratings ratingss={averageRating} />
                <h3 className="font-weight-semi-bold mb-4">₹{product.price}</h3>
                <form onSubmit={handleSubmitt}>
                  <div className="d-flex mb-3">
                    <p className="text-dark font-weight-medium mb-0 mr-3">
                      Sizes:
                    </p>
                    {sizesArray.map((size, index) => (
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        key={index}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`size-${index}`}
                          name="size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`size-${index}`}
                        >
                          {size.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">
                      Colors:
                    </p>
                    {colorsArray.map((color, index) => (
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        key={index}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`color-${index}`}
                          name="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`color-${index}`}
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex align-items-center mb-4 pt-2">
                    <div
                      className="input-group quantity mr-3"
                      style={{ width: 130 }}
                    >
                      <div className="input-group-btn">
                        <button
                          type="button"
                          className="btn btn-primary btn-minus"
                          onClick={() => dispatch({ type: "SUB" })}
                        >
                          <i className="fa fa-minus" />
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control bg-secondary text-center"
                        value={state}
                        onChange={(e) => {
                          dispatch({
                            type: "SET",
                            payload: parseInt(e.target.value),
                          });
                        }}
                        min={0}
                        max={stock}
                      />

                      <div className="input-group-btn">
                        <button
                          type="button"
                          className="btn btn-primary btn-plus"
                          onClick={() => dispatch({ type: "ADD" })}
                        >
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary px-3"
                      type="submit"
                      disabled={!localStorage.getItem("id")}
                    >
                      <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row px-xl-5">
              <div className="col">
                <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                  <a
                    className="nav-item nav-link active"
                    data-toggle="tab"
                    href="#tab-pane-1"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link"
                    data-toggle="tab"
                    href="#tab-pane-3"
                  >
                    Reviews {filteredRating && filteredRating.length}
                  </a>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-pane-1">
                    <h4 className="mb-3">Product Description</h4>
                    <p>{product.description}</p>
                  </div>
                  <div className="tab-pane fade" id="tab-pane-3">
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="mb-4">Reviews for {product.name}</h4>
                        {filteredRating.length > 0 ? (
                          filteredRating.map((rating, index) => {
                            const dateString = rating.created_at;
                            const date = new Date(dateString);

                            const day = date.getDate();
                            const month = date.toLocaleString("en-US", {
                              month: "long",
                            });
                            const year = date.getFullYear();

                            const formattedDate = `${day} ${month} ${year}`;
                            return (
                              <div className="media mb-4" key={index}>
                                <div className="media-body">
                                  <h6>
                                    {rating.name}
                                    <small>
                                      {" "}
                                      - <i>{formattedDate}</i>
                                    </small>
                                  </h6>
                                  <Ratings ratingss={rating.rating} />
                                  <p>{rating.comment}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>
                            <h2>There are no reviews for this product</h2>
                          </div>
                        )}
                      </div>
                      {localStorage.getItem("id") ? (
                        <div className="col-md-6">
                          <h4 className="mb-4">Leave a review</h4>
                          <small>
                            Your email address will not be published. Required
                            fields are marked *
                          </small>

                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex my-3">
                              <p className="mb-0 mr-2">Your Rating * :</p>
                              <Rating
                                onClick={(rate) => {
                                  setRating(rate);
                                }}
                                size={25}
                                label
                                transition
                                fillColor="orange"
                                emptyColor="gray"
                                className="foo"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="message">Your Review *</label>
                              <textarea
                                id="message"
                                cols={30}
                                rows={5}
                                className="form-control"
                                defaultValue={""}
                                name="message"
                                {...register("message", { required: true })}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Your Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                {...register("name", { required: true })}
                              />
                            </div>

                            <div className="form-group mb-0">
                              <input
                                type="submit"
                                defaultValue="Leave Your Review"
                                className="btn btn-primary px-3"
                              />
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div className="col-md-6">
                          <h3>Please Login to give review.</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Product_Details;
