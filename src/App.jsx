import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Shop from "./components/Shop";
import Product_Details from "./components/Product_Details";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Men from "./components/Men";
import Women from "./components/Women";
import Kids from "./components/Kids";
import Login from "./components/Login";
import Register from "./components/Register";
import Editprofile from "./components/Editprofile";
import Forgot_Password from "./components/Forgot_Password";
import Resetpassword from "./components/Resetpassword";
import Change_Password from "./components/Change_Password";
import Check_otp from "./components/Check_otp";
import Invoice from "./components/Invoice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product_details/:id" element={<Product_Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/forgotpassword" element={<Forgot_Password />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/changepassword" element={<Change_Password />} />
          <Route path="/checkotp" element={<Check_otp />} />
          <Route path="/invoice" element={<Invoice/>} />
          {/* <Route path="/demo" element={<Demo1 />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
