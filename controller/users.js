const { getDatabase } = require("../mongodb/connect");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res, next) => {
  const db = getDatabase();
  db.collection("users")
    .find()
    .toArray()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.getUser = (req, res, next) => {
  const user = { userId: Number(req.params.id) };
  const db = getDatabase();
  db.collection("users")
    .find(user)
    .toArray()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
let user_id = 2;
exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password,
    status: "active",
    role: "user",
    userId: user_id,
  };
  user_id++;
  const db = getDatabase();
  db.collection("users")
    .insertOne(newUser)
    .then((result) => console.log(result))
    .catch((err) => next(err));
  res.json({ status: "success" });
};

exports.updateUser = (req, res, next) => {
  const user = {
    userId: Number(req.params.id),
  };
  console.log(user);
  const db = getDatabase();
  db.collection("users")
    .updateOne(user, { $set: { password: "newPassword" } })
    .then((result) => console.log(result))
    .catch((err) => next(err));
  res.json({ status: "success" });
};

exports.deleteUser = (req, res, next) => {
  const user = { userId: Number(req.params.id) };
  console.log(user);
  const db = getDatabase();
  db.collection("users")
    .deleteOne(user)
    .then((result) => console.log(result))
    .catch((err) => next(err));
  res.json({ status: "success" });
};

exports.login = (req, res, next) => {
  const userCred = {
    userName: req.body.userName,
    password: req.body.password,
  };
  const db = getDatabase();

  db.collection("users")
    .find(userCred)
    .toArray()
    .then((user) => {
      if (
        user[0].userName === req.body.userName &&
        user[0].password === req.body.password
      ) {
        userSig = { userName: user[0].userName, role: user[0].role };
        const token = jwt.sign(userSig, "ThIs-iS-sEcrEt-kEY");
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.authorizeUsers = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401).json();
  }
  jwt.verify(token, "ThIs-iS-sEcrEt-kEY", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.authorizeSuperUsers = (req, res, next) => {
  if (req.user.role == "superUser") {
    next();
  } else {
    res.sendStatus(403);
  }
};
