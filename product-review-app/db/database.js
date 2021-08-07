const MongoClient = require("mongodb").MongoClient;

let connect; //'_' private

const mongoConnect = function (callback) {

    console.log("connected...")
    MongoClient.connect('mongodb+srv://Asgedom:Asgedom@cluster0.dg7cy.mongodb.net/shopDB?retryWrites=true&w=majority', { useUnifiedTopology: true })
         .then(client => {
            connect = client.db('shopDB');
      callback();
        })
        .catch(err => console.log('Error: ', err));
 
};

const getDB = () => {
  if (connect) {
    return connect;
  } else {
    throw new Error("DB connect failed");
  }
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
