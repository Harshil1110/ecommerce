import React, { useEffect, useState } from "react";
import Fetch_products from "./Fetch_products";
const url = "https://ecommerce-obdg.onrender.com";
import { Link } from "react-router-dom";
import axios from "axios";
const Shop = () => {
  const [data] = Fetch_products(`${url}/product/allproducts`);
  const [search, setSearch] = useState(null);
  const [searchProducts, setSearchProducts] = useState([]);
  let filterProduct = [];
  const [prices, setPrices] = useState({
    price1: false,
    price2: false,
    price3: false,
    price4: false,
    price5: false,
  });
  // console.log(data);
  useEffect(() => {
    if (search !== null && search.trim() !== "") {
      const timeOut = setTimeout(() => {
        try {
          axios
            .get(`${url}/product/products?search=${search}`)
            .then((res) => {
              setSearchProducts(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }, 1000);

      return () => clearTimeout(timeOut);
    }
  }, [search]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPrices({ ...prices, [name]: checked });
  };
  // let x = [];
  // console.log(data);
  if (prices.price1) {
    filterProduct = data.filter((product) => product.price >= 0);
  } else if (prices.price2) {
    filterProduct = data.filter(
      (product) => product.price >= 0 && product.price <= 100
    );
  } else if (prices.price3) {
    filterProduct = data.filter(
      (product) => product.price >= 100 && product.price <= 200
    );
  } else if (prices.price4) {
    filterProduct = data.filter(
      (product) => product.price >= 200 && product.price <= 300
    );
  } else if (prices.price5) {
    filterProduct = data.filter(
      (product) => product.price >= 300 && product.price <= 400
    );
  }
  // console.log(filterProduct);
  const productsToDisplay =
    searchProducts.length > 0
      ? searchProducts
      : filterProduct.length > 0
      ? filterProduct
      : data;

  return (
    <>
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Our Shop
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="#">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop</p>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-12">
            {/* Price Start */}
            <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                    name="price1"
                    checked={prices.price1}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="price-all">
                    All Price
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-1"
                    name="price2"
                    checked={prices.price2}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="price-1">
                    $0 - ₹100
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-2"
                    name="price3"
                    checked={prices.price3}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="price-2">
                    ₹100 - ₹200
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-3"
                    name="price4"
                    checked={prices.price4}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="price-3">
                    ₹200 - ₹300
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-4"
                    name="price5"
                    checked={prices.price5}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="price-4">
                    ₹300 - ₹400
                  </label>
                </div>
              </form>
            </div>
            {/* Price End */}
          </div>
          {/* Shop Sidebar End */}
          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search" />
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {productsToDisplay.map((product, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
                  <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                      <img
                        className="img-fluid w-100"
                        src={product.image_url}
                        alt="image"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "350px",
                        }}
                      />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                      <h6 className="text-truncate mb-3">{product.name}</h6>
                      <div className="d-flex justify-content-center">
                        <h6>₹ {product.price}</h6>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                      <Link
                        to={`/product_details/${product.id}`}
                        className="btn btn-sm text-dark p-0"
                      >
                        <i className="fas fa-eye text-primary mr-1" />
                        View Detail
                      </Link>
                      <Link
                        to={`/product_details/${product.id}`}
                        className="btn btn-sm text-dark p-0"
                      >
                        <i className="fas fa-shopping-cart text-primary mr-1" />
                        Add To Cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
    </>
  );
};

export default Shop;
