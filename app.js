const express = require("express");
const app = express();
const logger = require("./logger");
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const logsRoute = require("./routes/logs");
const loginRoute = require("./routes/login");
const usersController = require("./controller/users");

const { mongoConnect } = require("./mongodb/connect");
mongoConnect();
app.use(express.json());
app.use(logger.requestLog);
app.use("/login", loginRoute);

app.use(usersController.authorizeUsers);
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/logs", logsRoute);

app.listen(4000);
