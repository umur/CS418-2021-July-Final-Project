var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const MongoClient = require("mongodb").MongoClient;

const JWTManager = require("./jwt");

var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const reviewRouter = require("./routes/review");
const signupRouter = require("./routes/signup");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let conn;
app.use((req, res, next) => {
  if (!conn) {
    console.log("connecting ...");
    MongoClient.connect(
      "mongodb+srv://fekade:123@cluster0.0l2zb.mongodb.net/cs418?retryWrites=true&w=majority",
      { useUnifiedTopology: true }
    )
      .then((client) => {
        conn = client.db("cs418");
        req.db = conn;
        next();
      })
      .catch((err) => console.log("Error: ", err));
  } else {
    req.db = conn;
    next();
  }
});

app.use("/", (req, res, next) => {
  const log = {
    method: req.method,
    url: req.url,
    status: res.statusCode,
    date: new Date(),
  };
  req.db.collection("log").insertOne(log, (err, data) => {
    if (err) throw err;
    next();
  });
});
app.use("/", (req, res, next) => {
  if (req.url === "/signin" || req.url === "/signup") {
    next();
    return;
  }
  const header = req.headers.authorization; //Bearer token

  if (!header) {
    return res.json({ status: "auth_error" });
  } else {
    const data = JWTManager.verify(header.split(" ")[1]);

    if (!data) {
      return res.json({ status: "auth_error" });
    }
    if (req.method == "DELETE" || req.method == "PUT" || req.url == "/users") {
      console.log("are you here?");
      if (data.role == "superUser") {
        next();
      } else {
        res.status(401).send("Error: Access Denied");
        return;
      }
    } else {
      next();
    }
  }
});

app.use("/", usersRouter);
app.use("/", authRouter);
app.use("/", productsRouter);
app.use("/", reviewRouter);
app.use("/", signupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000);
