const express = require("express");
const db = require("../db");
const router = new express.Router();
const cors = require("cors");
router.use(express.json());
const morgan = require("morgan");
router.use(morgan("dev"));
env.config();
router.use(cors());

//add category
router.post("/addcategory", async (req, res) => {
  //   console.log(req.body);
  const { name, description } = req.body;
  const response = await db.query(
    "INSERT INTO category (name,description) VALUES ($1,$2) RETURNING *;",
    [name, description]
  );
  const newProduct = response.rows[0];
  //   console.log(newProduct);
  res.status(201).send(newProduct);
});

//add products
router.post("/addproduct", async (req, res) => {
  //   console.log(req.body);
  const {
    name,
    description,
    price,
    color,
    size,
    category_id,
    stock_quantity,
    image_url,
  } = req.body;
  try {
    const response = await db.query(
      "INSERT INTO product ( name, description, price, color, size, category_id, stock_quantity, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;",
      [
        name,
        description,
        price,
        color,
        size,
        category_id,
        stock_quantity,
        image_url,
      ]
    );
    const newProduct = response.rows[0];
    // console.log("New Product Added:", newProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(500).send("Error in inserting the data", error);
  }
});

//get all products
router.get("/allproducts", async (req, res) => {
  const response = await db.query("SELECT * FROM product");
  const allProducts = response.rows;
  res.json(allProducts);
});

//get product details by product id
router.get("/product_details/:id", async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const response1 = await db.query("SELECT * FROM product WHERE id = $1;", [
      id,
    ]);
    const productDetails = response1.rows;
    const response2 = await db.query(
      "SELECT color.name as colors_name, sizes.name as sizes_name FROM product_details as pd JOIN color ON pd.color_id = color.id JOIN sizes ON pd.size_id = sizes.id WHERE pd.product_id = $1",
      [req.params.id]
    );
    const data = response2.rows;
    // console.log(productDetails, data);
    res.json({ pd: productDetails, cs: data });
  } catch (error) {
    return res.json({ error: "error in finding the data" });
  }
});

//get the quantity accorinng to size and color
router.post("/details", async (req, res) => {
  const { size, color, id } = req.body;
  const response = await db.query(
    "SELECT pd.quantity FROM product_details as pd JOIN color ON pd.color_id = color.id JOIN sizes ON pd.size_id = sizes.id WHERE color.name = $1 AND sizes.name = $2 AND pd.product_id = $3",
    [color, size, id]
  );
  if (response.rowCount < 0) {
    return res.status(500).json({ error: "Out of stock" });
  }
  const qty = response.rows;
  //   console.log(qty);
  res.json(qty);
});

//add to cart
router.post("/addtocart", async (req, res) => {
  //   console.log(req.body);
  const { size, color, quantity, product_id, user_id, price } = req.body;
  //   console.log(req.body);
  const respose = await db.query(
    "INSERT INTO cart (size,color,quantity,product_id,user_id,price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;",
    [size, color, quantity, product_id, user_id, price]
  );
  const addCart = respose.rows;
  console.log(addCart);
  res.json({ success: true, addCart });
});

//get cart details
router.get("/cart_details/:id", async (req, res) => {
  try {
    const response = await db.query(
      "SELECT cart.user_id,cart.product_id,cart.quantity,cart.color,cart.size,cart.price FROM cart join customer on cart.user_id = customer.id where customer.id = $1",
      [req.params.id]
    );
    const allCartDetails = response.rows;
    res.json(allCartDetails);
  } catch (error) {
    return res.status(400).json({ error: "Cant find the data." });
  }
});

//delete the item from the cart
router.delete("/delete_item/:id", async (req, res) => {
  const id = req.params.id;
  const { product_id } = req.body;
  //   console.log(id);
  //   console.log(product_id);
  const response = await db.query(
    "DELETE FROM cart WHERE product_id = $1 and user_id = $2 RETURNING *;",
    [product_id, id]
  );
  if (response.rowCount > 0) {
    res.json({ success: true });
  }
});

//search products by name
router.get("/products", async (req, res) => {
  const { search } = req.query;
  console.log(search);
  const response = await db.query("SELECT * FROM product WHERE name LIKE $1;", [
    `${search}%`,
  ]);
  const searchProducts = response.rows;
  //   console.log(searchProducts);
  res.json(searchProducts);
});

//get the filter products
router.get("/filter_products", async (req, res) => {
  console.log(req.body);
});

//rating the product
router.post("/rating/:id", async (req, res) => {
  //   console.log(req.body);
  const { id } = req.params;
  const { rating, data } = req.body;
  //   console.log(id);
  const response = await db.query(
    "INSERT INTO reviews (product_id,rating,comment,name) VALUES ($1, $2, $3,$4) RETURNING*;",
    [id, rating, data.message, data.name]
  );
  const newRating = response.rows[0];
  res.json({ success: true, newRating });
});

//fetch all the ratings
router.get("/ratings", async (req, res) => {
  const response = await db.query("SELECT * FROM reviews");
  const allRatings = response.rows;
  //   console.log(allRatings);
  res.json(allRatings);
});

//get all categories
router.get("/allcategories", async (req, res) => {
  const response = await db.query("SELECT * FROM category");
  const allCategories = response.rows;
  res.json(allCategories);
});
module.exports = router;
