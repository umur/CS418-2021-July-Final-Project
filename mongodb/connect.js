const MongoClient = require("mongodb").MongoClient;
let database;
const uri =
  "mongodb+srv://meron:lQqkCFgttO0nJ4Bs@cluster0.x2l7l.mongodb.net/finalProject?retryWrites=true&w=majority";
const mongoConnect = (callback) => {
  MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {
      database = client.db("finalProject");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Unable to connect to database");
    });
};

const getDatabase = () => {
  if (database) {
    return database;
  } else {
    throw new Error("Unable to connect to database");
  }
};
exports.mongoConnect = mongoConnect;
exports.getDatabase = getDatabase;
