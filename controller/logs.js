const { getDatabase } = require("../mongodb/connect");
exports.getAllLogs = (req, res, next) => {
  const db = getDatabase();
  db.collection("logs")
    .find()
    .toArray()
    .then((logs) => res.json(logs))
    .catch((err) => next(err));
};
