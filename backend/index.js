const express = require("express");
const app = express();
const user = require("./routes/User");
const produt = require("./routes/Product");
const env = require("dotenv");
env.config();
const PORT = process.env.PORT || process.env.SERVER_PORT;

app.use(express.json());

app.use("/user", user);
app.use("/product", produt);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
