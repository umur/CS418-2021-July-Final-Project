const getDB = require("../db/database").getDB;
const ObjectId = require('mongodb').ObjectId;

class User {
  constructor(username,password) {
    this.username = username;
    this.password = password;
  }


  static deleteUser(id) {
    const db = getDB();
    return db.collection('user')
        .remove({ _id: new ObjectId(id) });
}

  static findAll() {
    const db = getDB();
    return db.collection("user").find().toArray();
  }

  save() {
    const db = getDB();
    db.collection('user')
    .insertOne(this)
    .then(result => {
    console.log(result);
    })
    .catch(err => console.log(err));
  }




}

module.exports = User;
