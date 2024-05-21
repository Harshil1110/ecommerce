import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Fetch_products from "./Fetch_products";
const url = "http://localhost:5000";
const Men = () => {
  const [data] = Fetch_products(`${url}/product/allproducts`);
  const filteredProduct = data.filter((product) => product.category_id === 1);
  const [search, setSearch] = useState(null);
  const [searchProducts, setSearchProducts] = useState([]);
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

  const filterSearch = searchProducts.filter((p) => p.category_id === 1);

  const producttoDisplay =
    filterSearch.length > 0 ? filterSearch : filteredProduct;
  return (
    <>
      <div className="container-fluid">
        <div className="col-lg-12 col-md-12">
          <div className="row pb-3 pt-5">
            <div className="col-12 pb-1 pt-5">
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
            {producttoDisplay.map((product) => (
              <div
                className="col-lg-3 col-md-6 col-sm-12 pb-1"
                key={product.id}
              >
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid"
                      src={product.image_url}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{product.name}</h6>
                    <div className="d-flex justify-content-center">
                      <h6>₹{product.price}</h6>
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
            {/* <div className="col-12 pb-1">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mb-3">
                <li className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Men;
