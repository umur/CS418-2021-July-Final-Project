const express = require("express");
const app = express();
const logger = require("./logger");
const expressWinston = require("express-winston");
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const logsRoute = require("./routes/logs");

const { mongoConnect } = require("./mongodb/connect");
mongoConnect();
app.use(express.json());
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/logs", logsRoute);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong!" });
});
app.listen(4000, () => {
  logger.log("info", "server is listening...");
});
