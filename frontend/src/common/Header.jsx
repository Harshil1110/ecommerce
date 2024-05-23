import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const url = "https://ecommerce-obdg.onrender.com";
const Header = () => {
  const [categories, setCategories] = useState([]);
  console.log("component rendered");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`${url}/product/allcategories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark" href="#">
                FAQs
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="#">
                Help
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="#">
                Support
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-dark px-2" href="#">
                <i className="fab fa-twitter" />
              </a>
              <a className="text-dark px-2" href="#">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-dark px-2" href="#">
                <i className="fab fa-instagram" />
              </a>
              <a className="text-dark pl-2" href="#">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Link to="/" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  E
                </span>
                Shopper
              </h1>
            </Link>
          </div>
          <div className="col-lg-6 col-6 text-left"></div>

          <div className="col-lg-3 col-6 text-right">
            <Link to="/wishlist" className="btn border">
              <i className="fas fa-heart text-primary" />
              {/* <span className="badge">0</span> */}
            </Link>
            <Link to="/cart" className="btn border">
              <i className="fas fa-shopping-cart text-primary" />
              {/* <span className="badge">0</span> */}
            </Link>
          </div>
        </div>
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-0">CATEGORIES</h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 1 }}
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: 130 }}
              >
                {/* <div className="nav-item dropdown">
                  <a href="#" className="nav-link" data-toggle="dropdown">
                    Dresses <i className="fa fa-angle-down float-right mt-1" />
                  </a>
                  <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <a href className="dropdown-item">
                      Men's Dresses
                    </a>
                    <a href className="dropdown-item">
                      Women's Dresses
                    </a>
                    <a href className="dropdown-item">
                      Baby's Dresses
                    </a>
                  </div>
                </div> */}
                {categories.map((c) => (
                  <>
                    <div key={c.id}>
                      <Link to={`/${c.name}`} className="nav-item nav-link">
                        {c.name.toUpperCase()}
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="#" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link">
                    HOME
                  </Link>
                  <Link to="/shop" className="nav-item nav-link">
                    SHOP
                  </Link>
                  {categories.map((c) => (
                    <>
                      <div key={c.id}>
                        <Link to={`/${c.name}`} className="nav-item nav-link">
                          {c.name.toUpperCase()}
                        </Link>
                      </div>
                    </>
                  ))}
                  <Link to="/contact" className="nav-item nav-link">
                    CONTACT
                  </Link>
                </div>
                <div className="navbar-nav ml-auto py-0">
                  {!localStorage.getItem("token") ? (
                    <>
                      <Link to="/login" className="nav-item nav-link">
                        LOGIN
                      </Link>
                      <Link to="/register" className="nav-item nav-link">
                        REGISTER
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/editprofile" className="btn border">
                        <i
                          className="fas fa-regular fa-user text-primary"
                          style={{
                            borderColor: "white",
                            paddingTop: "15px",
                            fontSize: "19px",
                          }}
                        ></i>
                      </Link>
                      {/* <i class="fas fa-regular fa-user"></i> */}
                      <Link
                        onClick={handleLogout}
                        className="nav-item nav-link"
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
