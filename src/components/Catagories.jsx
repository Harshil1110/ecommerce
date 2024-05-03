import React from "react";
import { Link } from "react-router-dom";

const Catagories = () => {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: 30 }}
          >
            <Link
              to="/men"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <img
                className="img-fluid"
                src="img/men.jpg"
                alt="men"
                width="70%"
                style={{ margin: "0 80px" }}
              />
            </Link>
            <h5
              className="font-weight-semi-bold m-0"
              style={{ textAlign: "center" }}
            >
              Shop For Men
            </h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: 30 }}
          >
            <Link
              to="/women"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <img
                className="img-fluid"
                src="img/women.jpg"
                alt="women"
                width="70%"
                style={{ margin: "0 80px" }}
              />
            </Link>
            <h5
              className="font-weight-semi-bold m-0"
              style={{ textAlign: "center" }}
            >
              Shop For Women
            </h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 pb-1">
          <div
            className="cat-item d-flex flex-column border mb-4"
            style={{ padding: 30 }}
          >
            <Link
              to="/kids"
              className="cat-img position-relative overflow-hidden mb-3"
            >
              <img
                className="img-fluid"
                src="img/kid (2).jpg"
                alt="kids"
                width="54%"
                style={{ margin: "0 80px" }}
              />
            </Link>
            <h5
              className="font-weight-semi-bold m-0"
              style={{ textAlign: "center" }}
            >
              Shop For Kids
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catagories;
