const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const cors = require("cors");
router.use(express.json());
const morgan = require("morgan");
var nodemailer = require("nodemailer");
router.use(morgan("dev"));
const env = require("dotenv");
env.config();
const secretkey = process.env.SESSION_SECRET;
router.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_PORT,
  })
);

//register new user
router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    number,
    address,
    country,
    city,
    state,
    pincode,
    password,
  } = req.body;
  // console.log(req.body);
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log("Error in hashing the password");
    }
    try {
      const response = await db.query(
        "INSERT INTO customer (first_name,last_name,email,address,country,state,city,pincode,phone,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;",
        [
          first_name,
          last_name,
          email,
          address,
          country,
          state,
          city,
          pincode,
          number,
          hash,
        ]
      );
      const newUser = response.rows[0];
      // console.log("New user registered:", newUser);
      res.json({ success: "true", newUser });
    } catch (error) {
      res.status(500).send("Error in inserting the data", error);
    }
  });
});

//login user
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const response = await db.query("SELECT * FROM customer WHERE email = $1", [
    email,
  ]);
  // console.log(response.rowCount > 0);
  if (!response.rowCount > 0) {
    return res
      .status(400)
      .json({ error: "Please register yourself before login." });
  }
  try {
    const hashPassword = response.rows[0].password;
    const user = response.rows[0];
    bcrypt.compare(password, hashPassword, (err, done) => {
      if (err) {
        console.log("Error in comparing the password");
      }
      if (!done) {
        return res.status(400).json({ error: "Invalid password" });
      }
      //genrating the token
      jwt.sign(user, secretkey, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: "Failed to generate token" });
        }
        res.json({ success: true, authToken: token, id: response.rows[0].id });
      });
    });
  } catch (error) {
    res.status(404).send(error);
    res.json({ sucess: false });
  }
});

//post order
router.post("/order", async (req, res) => {
  console.log(req.body);
  const { data, details } = req.body;
  const customer_id = details[0].user_id;
  const total_price = req.body.totalPrice;
  // console.log(total_price);
  // console.log(customer_id);
  //post order
  const resposne1 = await db.query(
    "INSERT INTO orders (customer_id, total_amount) VALUES ($1,$2) RETURNING *;",
    [customer_id, total_price]
  );
  const orders = resposne1.rows[0];
  // console.log(order);
  //post item detais in order items table
  for (const orderDetail of details) {
    const { product_id, quantity, color, size, price } = orderDetail;
    await db.query(
      "INSERT INTO orders_details (order_id, product_id, quantity, color, size, price) VALUES ($1, $2, $3, $4, $5, $6)",
      [orders.id, product_id, quantity, color, size, price]
    );
    console.log("Inserted order detail:", orderDetail);
  }

  //add payment method in payment table
  await db.query(
    "INSERT INTO payment_methods (method_name,order_id) VALUES ($1, $2)",
    [data.payment, orders.id]
  );

  // Assuming you're using PostgreSQL and your database library supports parameterized queries

  // Execute an UPDATE query to update the quantity in product_details table
  // for (const orderDetail of details) {
  //   const { product_id, color, size } = orderDetail;
  //   await db.query(
  //     `UPDATE product_details AS pd
  //     SET quantity = (pd.quantity -
  //         (SELECT COALESCE(SUM(od.quantity), 0)
  //         FROM orders_details AS od
  //         JOIN color ON od.color = color.name
  //         JOIN sizes ON od.size = sizes.name
  //         WHERE color.name = $1
  //         AND sizes.name = $2
  //         AND od.product_id = $3))
  //     WHERE pd.product_id = $4
  //     AND pd.color_id = (SELECT id FROM color WHERE name = $5)
  //     AND pd.size_id = (SELECT id FROM sizes WHERE name = $6);

  //     `,
  //     [color, size, product_id, product_id, color, size]
  //   );
  // }

  //remove items from cart
  await db.query("DELETE FROM cart WHERE user_id = $1", [customer_id]);
  console.log("ORDER:", orders);

  //get details for invoice
  const response = await db.query(
    "select product.name,od.quantity,od.price, orders.total_amount from orders_details as od inner join orders on od.order_id = orders.id inner join product on product.id = od.product_id where customer_id = $1",
    [customer_id]
  );
  const allOrders = response.rows[0];
  res.json({ success: true, od: allOrders, cd: details });
});
//get all customers
router.get("/editprofile/:id", verifyuser, async (req, res) => {
  const response = await db.query("SELECT * FROM customer WHERE id = $1", [
    req.params.id,
  ]);
  const allcustomer = response.rows;
  res.json(allcustomer);
});

//update user data
router.put("/editprofile/:id", async (req, res) => {
  // console.log(req.body);
  const response = await db.query("SELECT * FROM customer WHERE id = $1", [
    req.params.id,
  ]);
  const user = response.rows[0];
  console.log(user);
  user.first_name = req.body.first_name || user.first_name;
  user.last_name = req.body.last_name || user.last_name;
  user.email = req.body.email || user.email;
  user.phone = req.body.number || user.phone;
  user.address = req.body.address || user.address;
  user.country = req.body.country || user.country;
  user.city = req.body.city || user.city;
  user.state = req.body.state || user.state;
  user.pincode = req.body.pincode || user.pincode;

  const responsee = await db.query(
    `UPDATE customer 
     SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5, 
         country = $6, city = $7, state = $8, pincode = $9
     WHERE id = $10 RETURNING *`,
    [
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.address,
      user.country,
      user.city,
      user.state,
      user.pincode,
      req.params.id,
    ]
  );
  const updatedUser = responsee.rows[0];
  console.log(updatedUser);
  res.json({ success: true });
});

//forgot password
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  const response = await db.query("SELECT * FROM customer WHERE email = $1", [
    email,
  ]);
  const result = response.rowCount;
  // console.log(result);
  if (!result) {
    return res.json({ error: "user not found" });
  }
  let otpcode = Math.floor(Math.random() * 9000) + 1000;
  const otpResponse = await db.query(
    "INSERT INTO otps (email,otp) VALUES ($1, $2) RETURNING *;",
    [email, otpcode]
  );
  mailer(email, otpcode);
  if (otpResponse.rowCount !== 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false, error: "Error saving OTP data." });
  }
});
//mailer function to sent the mail to the user.
const mailer = async (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: process.env.GMAIL_SERVICE,
    port: process.env.GMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "sending Otp",
    html: `<p>Your OTP: ${otp}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
      // res.json(info)
    }
  });
};

//check otp
router.post("/checkotp", async (req, res) => {
  const { otp } = req.body;
  // console.log(otp);
  const response = await db.query("SELECT * FROM otps where otp = $1", [otp]);
  // const allDetails = response.rows[0];
  // console.log(allDetails);
  if (response.rowCount === 0) {
    return res.json({ error: "Invalid otp" });
  } else {
    return res.json({ success: true });
  }
});

//update the password
router.put("/resetpassword", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const response = await db.query("SELECT * FROM otps WHERE email = $1", [
    email,
  ]);
  console.log(response.rowCount);
  if (response.rowCount !== 1) {
    return res.json({ error: "please provide valid email." });
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.json({ error: "error in hashing the password" });
    }
    try {
      const response = await db.query(
        `UPDATE customer
         SET password = $1
         WHERE email = $2 RETURNING *`,
        [hash, email]
      );
      const updatedUser = response.rows[0];
      console.log(updatedUser);
      res.json({ success: true });
    } catch (error) {
      res.json({ error: "Error in updating the data." });
    }
  });
});

//change password
router.put("/changepassword/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const { oldpassword, password } = req.body;
  // console.log(oldpassword, password);
  const response = await db.query("SELECT * FROM customer WHERE id = $1", [id]);
  const user = response.rows[0];
  // console.log(user);
  if (response.rowCount !== 1) {
    return res.json({ error: "invalid user." });
  }
  bcrypt.compare(oldpassword, user.password, async (err, success) => {
    if (err) {
      return res.json({ error: "Invalid Password." });
    }
    if (!success) {
      return res.json({ error: "Old password is incorrect." });
    }
    // console.log(success);
    if (success) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.log("error in hashing the password");
        }
        try {
          await db.query(
            `UPDATE customer
             SET password = $1
             WHERE id = $2 RETURNING *`,
            [hash, id]
          );
          res.json({ success: true });
        } catch (error) {
          res.json({ error: "Error in updating the password." });
        }
      });
    }
  });
});

function verifyuser(req, res, next) {
  const token = req.headers["authorization"];
  // console.log(token);
  if (!token) {
    return res.status(400).json({ error: "Unauthorize user" });
  }
  jwt.verify(token, process.env.SESSION_SECRET, async (err, decode) => {
    if (err) {
      return res.status(400).json({ error: "Unauthorize user" });
    }
    // console.log(decode);
    // res.json(decode);
    req.user = decode;
    next();
  });
}
module.exports = router;
