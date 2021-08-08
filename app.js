const express = require("express");
const app = express();
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");

const { mongoConnect } = require("./mongodb/connect");
mongoConnect();
app.use(express.json());
app.use("/users", usersRoute);
app.use("/products", productsRoute);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong!" });
});
app.listen(4000, () => {
  console.log("server is listening...");
});
