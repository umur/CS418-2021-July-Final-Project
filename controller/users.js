const { getDatabase } = require("../mongodb/connect");

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
  console.log(user);
  const db = getDatabase();
  db.collection("users")
    .find(user)
    .toArray()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const newUser = {
    name: req.body.name,
    userName: req.body.name,
    password: req.body.password,
    status: "active",
    userId: 5,
  };
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
